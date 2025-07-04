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

    struct Company {
        uint256 id;
        string name;
        address owner;
        uint256 totalSupply;
        uint256 tokenReserve; // DSTK tokens
        uint256 shareReserve; // Share tokens
    }

    mapping(uint256 => Company) public companies;

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
            shareReserve: totalSupply
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

        destockToken.transferFrom(msg.sender, company.owner, cost);
        _safeTransferFrom(company.owner, msg.sender, companyId, amount, "");

        company.tokenReserve += cost;
        company.shareReserve -= amount;

        emit SharesPurchased(companyId, msg.sender, amount, cost);
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

        destockToken.transferFrom(company.owner, msg.sender, proceeds);
        _safeTransferFrom(msg.sender, company.owner, companyId, amount, "");

        company.tokenReserve -= proceeds;
        company.shareReserve += amount;

        emit SharesSold(companyId, msg.sender, amount, proceeds);
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
}
