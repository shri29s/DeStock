// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract DeStock is ERC1155, Ownable, ReentrancyGuard {
    // State variables
    IERC20 public immutable destockToken;
    uint256 public nextCompanyId;
    uint256 public constant MINIMUM_LIQUIDITY = 10 * 10**18;
    uint256 public constant TRADING_FEE_BASIS_POINTS = 25; // 0.25%
    uint256 public constant LP_TOKEN_ID_OFFSET = 1000000; // LP tokens start at ID 1000000

    struct Company {
        uint256 id;
        string name;
        address owner;
        uint256 totalSupply;
        uint256 tokenReserve; // DSTK tokens
        uint256 shareReserve; // Share tokens
        uint256 lpTokenSupply; // Liquidity provider token supply
        uint256 collectedFees; // Trading fees collected
    }

    struct Order {
        uint256 id;
        uint256 companyId;
        address trader;
        bool isBuy;
        uint256 amount;
        uint256 price;
        uint256 timestamp;
        bool isActive;
    }

    mapping(uint256 => Company) public companies;
    mapping(uint256 => Order) public orders;
    mapping(address => uint256[]) public userOrders;
    uint256 public nextOrderId;

    // Events
    event CompanyRegistered(
        uint256 indexed companyId,
        string name,
        address indexed owner,
        uint256 initialShares,
        uint256 initialLiquidity
    );

    event SharesPurchased(
        uint256 indexed companyId,
        address indexed buyer,
        uint256 amount,
        uint256 cost
    );
    
    event SharesSold(
        uint256 indexed companyId,
        address indexed seller,
        uint256 amount,
        uint256 proceeds
    );

    event LiquidityAdded(
        uint256 indexed companyId,
        address indexed provider,
        uint256 tokenAmount,
        uint256 shareAmount,
        uint256 lpTokens
    );

    event LiquidityRemoved(
        uint256 indexed companyId,
        address indexed provider,
        uint256 lpTokens,
        uint256 tokenAmount,
        uint256 shareAmount
    );

    event OrderPlaced(
        uint256 indexed orderId,
        uint256 indexed companyId,
        address indexed trader,
        bool isBuy,
        uint256 amount,
        uint256 price
    );

    event OrderCancelled(
        uint256 indexed orderId,
        address indexed trader
    );

    event OrderMatched(
        uint256 indexed buyOrderId,
        uint256 indexed sellOrderId,
        uint256 amount,
        uint256 price
    );

    // Constructor
    constructor(address _destockTokenAddress) ERC1155("") Ownable(msg.sender) {
        destockToken = IERC20(_destockTokenAddress);
    }

    // Register company
    function registerCompany(
        string calldata name,
        uint256 totalSupply,
        uint256 initialLiquidity // In unit like wei
    ) external {
        require(totalSupply > 0, "DeStock: total supply must be > 0");
        require(
            initialLiquidity >= MINIMUM_LIQUIDITY,
            "DeStock: insufficient liquidity"
        );

        destockToken.transferFrom(msg.sender, address(this), initialLiquidity);

        uint256 companyId = nextCompanyId++;
        companies[companyId] = Company({
            id: companyId,
            name: name,
            owner: msg.sender,
            totalSupply: totalSupply,
            tokenReserve: initialLiquidity,
            shareReserve: totalSupply,
            lpTokenSupply: 0,
            collectedFees: 0
        });

        _mint(msg.sender, companyId, totalSupply, "");

        emit CompanyRegistered(
            companyId,
            name,
            msg.sender,
            totalSupply,
            initialLiquidity
        );
    }

    // AMM logic
    function getSharePrice(uint256 companyId) public view returns (uint256) {
        Company storage company = companies[companyId];
        if (company.shareReserve == 0) {
            return company.tokenReserve / company.totalSupply;
        }
        return company.tokenReserve / company.shareReserve;
    }

    function getBuyPrice(
        uint256 companyId,
        uint256 amount
    ) public view returns (uint256) {
        Company storage company = companies[companyId];
        uint256 k = company.tokenReserve * company.shareReserve;
        uint256 newShareReserve = company.shareReserve - amount;
        uint256 newTokenReserve = k / newShareReserve;
        return newTokenReserve - company.tokenReserve;
    }

    function getSellPrice(
        uint256 companyId,
        uint256 amount
    ) public view returns (uint256) {
        Company storage company = companies[companyId];
        uint256 k = company.tokenReserve * company.shareReserve;
        uint256 newShareReserve = company.shareReserve + amount;
        uint256 newTokenReserve = k / newShareReserve;
        return company.tokenReserve - newTokenReserve;
    }

    function buyShares(uint256 companyId, uint256 amount) external nonReentrant {
        require(amount > 0, "DeStock: amount must be > 0");
        Company storage company = companies[companyId];
        require(company.owner != address(0), "DeStock: company does not exist");

        uint256 cost = getBuyPrice(companyId, amount);
        uint256 fee = (cost * TRADING_FEE_BASIS_POINTS) / 10000;
        uint256 totalCost = cost + fee;

        destockToken.transferFrom(msg.sender, address(this), totalCost);
        _safeTransferFrom(company.owner, msg.sender, companyId, amount, "");

        company.tokenReserve += cost;
        company.shareReserve -= amount;
        company.collectedFees += fee;

        emit SharesPurchased(companyId, msg.sender, amount, totalCost);
    }

    function sellShares(uint256 companyId, uint256 amount) external nonReentrant {
        require(amount > 0, "DeStock: amount must be > 0");
        Company storage company = companies[companyId];
        require(company.owner != address(0), "DeStock: company does not exist");
        require(
            balanceOf(msg.sender, companyId) >= amount,
            "DeStock: insufficient share balance"
        );

        uint256 proceeds = getSellPrice(companyId, amount);
        uint256 fee = (proceeds * TRADING_FEE_BASIS_POINTS) / 10000;
        uint256 netProceeds = proceeds - fee;

        destockToken.transfer(msg.sender, netProceeds);
        _safeTransferFrom(msg.sender, company.owner, companyId, amount, "");

        company.tokenReserve -= proceeds;
        company.shareReserve += amount;
        company.collectedFees += fee;

        emit SharesSold(companyId, msg.sender, amount, netProceeds);
    }

    // Liquidity Provider Functions
    function addLiquidity(
        uint256 companyId,
        uint256 tokenAmount,
        uint256 shareAmount
    ) external nonReentrant returns (uint256 lpTokens) {
        require(tokenAmount > 0 && shareAmount > 0, "DeStock: amounts must be > 0");
        Company storage company = companies[companyId];
        require(company.owner != address(0), "DeStock: company does not exist");

        // Calculate LP tokens to mint
        if (company.lpTokenSupply == 0) {
            lpTokens = sqrt(tokenAmount * shareAmount);
        } else {
            uint256 tokenRatio = (tokenAmount * company.lpTokenSupply) / company.tokenReserve;
            uint256 shareRatio = (shareAmount * company.lpTokenSupply) / company.shareReserve;
            lpTokens = tokenRatio < shareRatio ? tokenRatio : shareRatio;
        }

        require(lpTokens > 0, "DeStock: insufficient liquidity provided");

        // Transfer tokens
        destockToken.transferFrom(msg.sender, address(this), tokenAmount);
        _safeTransferFrom(msg.sender, address(this), companyId, shareAmount, "");

        // Update reserves
        company.tokenReserve += tokenAmount;
        company.shareReserve += shareAmount;
        company.lpTokenSupply += lpTokens;

        // Mint LP tokens
        uint256 lpTokenId = LP_TOKEN_ID_OFFSET + companyId;
        _mint(msg.sender, lpTokenId, lpTokens, "");

        emit LiquidityAdded(companyId, msg.sender, tokenAmount, shareAmount, lpTokens);
    }

    function removeLiquidity(
        uint256 companyId,
        uint256 lpTokens
    ) external nonReentrant returns (uint256 tokenAmount, uint256 shareAmount) {
        require(lpTokens > 0, "DeStock: LP tokens must be > 0");
        Company storage company = companies[companyId];
        require(company.owner != address(0), "DeStock: company does not exist");

        uint256 lpTokenId = LP_TOKEN_ID_OFFSET + companyId;
        require(
            balanceOf(msg.sender, lpTokenId) >= lpTokens,
            "DeStock: insufficient LP tokens"
        );

        // Calculate withdrawal amounts
        tokenAmount = (lpTokens * company.tokenReserve) / company.lpTokenSupply;
        shareAmount = (lpTokens * company.shareReserve) / company.lpTokenSupply;

        require(tokenAmount > 0 && shareAmount > 0, "DeStock: insufficient liquidity");

        // Burn LP tokens
        _burn(msg.sender, lpTokenId, lpTokens);

        // Update reserves
        company.tokenReserve -= tokenAmount;
        company.shareReserve -= shareAmount;
        company.lpTokenSupply -= lpTokens;

        // Transfer tokens back
        destockToken.transfer(msg.sender, tokenAmount);
        _safeTransferFrom(address(this), msg.sender, companyId, shareAmount, "");

        emit LiquidityRemoved(companyId, msg.sender, lpTokens, tokenAmount, shareAmount);
    }

    // Order Book Functions
    function placeOrder(
        uint256 companyId,
        bool isBuy,
        uint256 amount,
        uint256 price
    ) external returns (uint256 orderId) {
        require(amount > 0 && price > 0, "DeStock: invalid order parameters");
        Company storage company = companies[companyId];
        require(company.owner != address(0), "DeStock: company does not exist");

        if (isBuy) {
            uint256 totalCost = amount * price;
            destockToken.transferFrom(msg.sender, address(this), totalCost);
        } else {
            require(
                balanceOf(msg.sender, companyId) >= amount,
                "DeStock: insufficient shares"
            );
            _safeTransferFrom(msg.sender, address(this), companyId, amount, "");
        }

        orderId = nextOrderId++;
        orders[orderId] = Order({
            id: orderId,
            companyId: companyId,
            trader: msg.sender,
            isBuy: isBuy,
            amount: amount,
            price: price,
            timestamp: block.timestamp,
            isActive: true
        });

        userOrders[msg.sender].push(orderId);

        emit OrderPlaced(orderId, companyId, msg.sender, isBuy, amount, price);
    }

    function cancelOrder(uint256 orderId) external {
        Order storage order = orders[orderId];
        require(order.trader == msg.sender, "DeStock: not order owner");
        require(order.isActive, "DeStock: order not active");

        order.isActive = false;

        // Refund escrowed tokens
        if (order.isBuy) {
            uint256 totalCost = order.amount * order.price;
            destockToken.transfer(msg.sender, totalCost);
        } else {
            _safeTransferFrom(address(this), msg.sender, order.companyId, order.amount, "");
        }

        emit OrderCancelled(orderId, msg.sender);
    }

    // Helper function for square root calculation
    function sqrt(uint256 x) internal pure returns (uint256) {
        if (x == 0) return 0;
        uint256 z = (x + 1) / 2;
        uint256 y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
        return y;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC1155) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // Utility functions
    function getCompanyDetails(uint256 companyId) public view returns (Company memory) {
        Company memory company = companies[companyId];
        require(company.owner != address(0), "Company does not exist");
        return company;
    }   

    function totalCompanies() public view returns (uint256) {
        return nextCompanyId;
    }

    function getUserOrders(address user) external view returns (uint256[] memory) {
        return userOrders[user];
    }

    function getOrderDetails(uint256 orderId) external view returns (Order memory) {
        return orders[orderId];
    }

    function getLPTokenBalance(address user, uint256 companyId) external view returns (uint256) {
        uint256 lpTokenId = LP_TOKEN_ID_OFFSET + companyId;
        return balanceOf(user, lpTokenId);
    }

    function getReserveRatio(uint256 companyId) external view returns (uint256) {
        Company storage company = companies[companyId];
        if (company.shareReserve == 0) return 0;
        return (company.tokenReserve * 1e18) / company.shareReserve;
    }

    function getTradingVolume(uint256 companyId) external view returns (uint256) {
        return companies[companyId].collectedFees * 10000 / TRADING_FEE_BASIS_POINTS;
    }
}
