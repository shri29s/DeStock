// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DeStock is ERC1155, Ownable {
    // State variables
    IERC20 public immutable destockToken;
    uint256 public nextCompanyId;
    uint256 public constant REGISTRATION_FEE = 100 ether;

    struct Company {
        uint256 id;
        string name;
        address owner;
        uint256 initialPrice; // In DSTK
        uint256 totalSupply;
    }

    struct LiquidityPool {
        uint256 tokenReserve; // DSTK tokens
        uint256 shareReserve; // Share tokens
    }

    mapping(uint256 => Company) public companies;
    mapping(uint256 => LiquidityPool) public liquidityPools;

    // Events
    event CompanyRegistered(
        uint256 indexed companyId,
        string name,
        address indexed owner,
        uint256 initialPrice,
        uint256 totalSupply
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

    // Constructor
    constructor(
        address _destockTokenAddress,
        address initialOwner
    ) ERC1155("") Ownable(initialOwner) {
        destockToken = IERC20(_destockTokenAddress);
    }

    // Register company
    function registerCompany(
        string calldata name,
        uint256 initialPrice,
        uint256 totalSupply
    ) external {
        require(totalSupply > 0, "DeStock: total supply must be > 0");
        require(initialPrice > 0, "DeStock: initial price must be > 0");

        destockToken.transferFrom(msg.sender, address(this), REGISTRATION_FEE);

        uint256 companyId = nextCompanyId++;
        companies[companyId] = Company({
            id: companyId,
            name: name,
            owner: msg.sender,
            initialPrice: initialPrice,
            totalSupply: totalSupply
        });

        _mint(msg.sender, companyId, totalSupply, "");

        // Initialize the liquidity pool
        liquidityPools[companyId] = LiquidityPool({
            tokenReserve: initialPrice * totalSupply, // A simplified initial liquidity
            shareReserve: totalSupply
        });

        emit CompanyRegistered(
            companyId,
            name,
            msg.sender,
            initialPrice,
            totalSupply
        );
    }

    // AMM logic
    function getSharePrice(uint256 companyId) public view returns (uint256) {
        LiquidityPool storage pool = liquidityPools[companyId];
        if (pool.shareReserve == 0) {
            return companies[companyId].initialPrice;
        }
        return pool.tokenReserve / pool.shareReserve;
    }

    function buyShares(uint256 companyId, uint256 amount) external {
        require(amount > 0, "DeStock: amount must be > 0");
        Company storage company = companies[companyId];
        require(company.owner != address(0), "DeStock: company does not exist");

        uint256 cost = getSharePrice(companyId) * amount;

        destockToken.transferFrom(msg.sender, address(this), cost);
        _safeTransferFrom(company.owner, msg.sender, companyId, amount, "");

        LiquidityPool storage pool = liquidityPools[companyId];
        pool.tokenReserve += cost;
        pool.shareReserve -= amount;

        emit SharesPurchased(companyId, msg.sender, amount, cost);
    }

    function sellShares(uint256 companyId, uint256 amount) external {
        require(amount > 0, "DeStock: amount must be > 0");
        Company storage company = companies[companyId];
        require(company.owner != address(0), "DeStock: company does not exist");
        require(
            balanceOf(msg.sender, companyId) >= amount,
            "DeStock: insufficient share balance"
        );

        uint256 proceeds = getSharePrice(companyId) * amount;

        _safeTransferFrom(msg.sender, company.owner, companyId, amount, "");
        destockToken.transfer(msg.sender, proceeds);

        LiquidityPool storage pool = liquidityPools[companyId];
        pool.tokenReserve -= proceeds;
        pool.shareReserve += amount;

        emit SharesSold(companyId, msg.sender, amount, proceeds);
    }   

    // Admin functions
    function withdrawFees() external onlyOwner {
        uint256 balance = destockToken.balanceOf(address(this));
        require(balance > 0, "DeStock: no fees to withdraw");
        destockToken.transfer(owner(), balance);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC1155) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}