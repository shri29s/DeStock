import companiesData from '../constants/companies.json';
import logosData from '../constants/logos.json';
import { Company, LogoMapping, CompanyList, FilterOptions } from '../types/company';

// Get all companies as an array
export const getAllCompanies = (): CompanyList => {
  const companies = companiesData.companies as { [key: string]: Company };
  return Object.values(companies);
};

// Get all company IDs as an array (for consistent ordering)
export const getAllCompanyIds = (): string[] => {
  const companies = companiesData.companies as { [key: string]: Company };
  return Object.keys(companies);
};

// Convert string company ID to numeric ID for blockchain operations
export const getNumericCompanyId = (stringId: string): number => {
  const companyIds = getAllCompanyIds();
  const index = companyIds.indexOf(stringId);
  return index === -1 ? -1 : index;
};

// Convert numeric company ID back to string ID
export const getStringCompanyId = (numericId: number): string | undefined => {
  const companyIds = getAllCompanyIds();
  return companyIds[numericId];
};

// Get company by numeric ID (for blockchain operations)
export const getCompanyByNumericId = (numericId: number): Company | undefined => {
  const stringId = getStringCompanyId(numericId);
  return stringId ? getCompanyById(stringId) : undefined;
};

// Get company by ID
export const getCompanyById = (id: string): Company | undefined => {
  const companies = companiesData.companies as { [key: string]: Company };
  return companies[id];
};

// Get company logo URL
export const getCompanyLogo = (companyId: string): string | undefined => {
  const logos = logosData as LogoMapping;
  return logos[companyId];
};

// Get companies by sector
export const getCompaniesBySector = (sector: string): CompanyList => {
  return getAllCompanies().filter(company => company.sector === sector);
};

// Get companies by category  
export const getCompaniesByCategory = (category: string): CompanyList => {
  return getAllCompanies().filter(company => company.category === category);
};

// Search companies
export const searchCompanies = (searchTerm: string): CompanyList => {
  const term = searchTerm.toLowerCase();
  return getAllCompanies().filter(company => 
    company.name.toLowerCase().includes(term) ||
    company.symbol.toLowerCase().includes(term) ||
    company.tokenName.toLowerCase().includes(term) ||
    company.description.toLowerCase().includes(term) ||
    company.category.toLowerCase().includes(term) ||
    company.sector.toLowerCase().includes(term)
  );
};

// Filter and sort companies
export const filterAndSortCompanies = (options: FilterOptions): CompanyList => {
  let companies = getAllCompanies();

  // Apply search filter
  if (options.searchTerm) {
    companies = searchCompanies(options.searchTerm);
  }

  // Apply sector filter
  if (options.selectedSector) {
    companies = companies.filter(company => company.sector === options.selectedSector);
  }

  // Apply category filter
  if (options.selectedCategory) {
    companies = companies.filter(company => company.category === options.selectedCategory);
  }

  // Apply sorting
  if (options.sortField && options.sortDirection) {
    companies.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (options.sortField) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'price':
          // Extract numeric value from price string (e.g., "$1.00" -> 1.00)
          aValue = parseFloat(a.price.replace('$', ''));
          bValue = parseFloat(b.price.replace('$', ''));
          break;
        case 'marketCap':
          // Extract numeric value from market cap string (e.g., "$1B" -> 1000000000)
          aValue = parseMarketCap(a.marketCap);
          bValue = parseMarketCap(b.marketCap);
          break;
        default:
          return 0;
      }

      if (typeof aValue === 'string') {
        return options.sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return options.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });
  }

  return companies;
};

// Parse market cap string to number for sorting
const parseMarketCap = (marketCap: string): number => {
  const value = parseFloat(marketCap.replace(/[$,]/g, ''));
  if (marketCap.includes('B')) {
    return value * 1e9;
  } else if (marketCap.includes('M')) {
    return value * 1e6;
  } else if (marketCap.includes('K')) {
    return value * 1e3;
  }
  return value;
};

// Get all available sectors
export const getAllSectors = (): string[] => {
  return companiesData.sectors;
};

// Get all available categories
export const getAllCategories = (): string[] => {
  return companiesData.categories;
};

// Get random companies for featured section
export const getRandomCompanies = (count: number): CompanyList => {
  const companies = getAllCompanies();
  const shuffled = [...companies].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Get trending companies (high market cap)
export const getTrendingCompanies = (): CompanyList => {
  return getAllCompanies()
    .filter(company => {
      const marketCapValue = parseFloat(company.marketCap.replace(/[$BM]/g, ''));
      const marketCapInNumber = company.marketCap.includes('B') ? marketCapValue * 1000 : marketCapValue;
      return marketCapInNumber > 500; // Companies with market cap over 500M
    })
    .sort((a, b) => {
      const aValue = parseFloat(a.marketCap.replace(/[$BM]/g, '')) * (a.marketCap.includes('B') ? 1000 : 1);
      const bValue = parseFloat(b.marketCap.replace(/[$BM]/g, '')) * (b.marketCap.includes('B') ? 1000 : 1);
      return bValue - aValue;
    });
};

// Get top companies by market cap
export const getTopCompaniesByMarketCap = (count: number = 10): CompanyList => {
  return getAllCompanies()
    .sort((a, b) => parseMarketCap(b.marketCap) - parseMarketCap(a.marketCap))
    .slice(0, count);
};

// Format market cap for display
export const formatMarketCap = (marketCapString: string): string => {
  const value = parseMarketCap(marketCapString);
  
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(1)}B`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(1)}M`;
  } else if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(1)}K`;
  }
  
  return `$${value.toFixed(2)}`;
};

// Format price for display
export const formatPrice = (priceString: string): string => {
  const value = parseFloat(priceString.replace('$', ''));
  return `$${value.toFixed(2)}`;
};

// Get company statistics
export const getCompanyStats = () => {
  const companies = getAllCompanies();
  const totalMarketCap = companies.reduce((sum, company) => 
    sum + parseMarketCap(company.marketCap), 0
  );
  
  return {
    totalCompanies: companies.length,
    totalMarketCap: formatMarketCap(`$${totalMarketCap}`),
    sectors: getAllSectors().length,
    categories: getAllCategories().length,
    averagePrice: companies.reduce((sum, company) => 
      sum + parseFloat(company.price.replace('$', '')), 0
    ) / companies.length
  };
};
