// Types for the company and token data
export interface Company {
  id: string;
  name: string;
  symbol: string;
  tokenName: string;
  category: string;
  description: string;
  price: string;
  marketCap: string;
  logo: string;
  sector: string;
  // Optional fields for trading data
  currentPrice?: number;
  change?: number;
  changePercent?: number;
  volume?: number;
  owner?: string;
  initialPrice?: string;
  totalSupply?: string;
}

export interface CompanyData {
  companies: { [key: string]: Company };
  sectors: string[];
  categories: string[];
}

export interface LogoMapping {
  [companyId: string]: string;
}

export interface TokenData {
  tech_companies?: { [key: string]: Company };
  finance_firms?: { [key: string]: Company };
  educational_institutions?: { [key: string]: Company };
  bonus_tokens?: { [key: string]: Company };
}

// Utility type for company lists
export type CompanyList = Company[];

// Trading related types
export interface TradingCompany extends Omit<Company, 'marketCap'> {
  currentPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number; // Override as number for trading calculations
}

// Filter options
export type SortField = 'name' | 'currentPrice' | 'change' | 'volume' | 'marketCap' | 'price';
export type SortDirection = 'asc' | 'desc';

export interface FilterOptions {
  searchTerm?: string;
  selectedSector?: string;
  selectedCategory?: string;
  sortField?: SortField;
  sortDirection?: SortDirection;
}
