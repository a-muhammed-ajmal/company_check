import { parseData, CompanyData } from "./rawData";
import { normalizeCompanyName, calculateSimilarity } from "./normalizer";
import { checkWithAI } from "./gemini";

// Cache the data with pre-normalized names for performance
type CachedCompany = CompanyData & { normalizedName: string };
let cachedData: CachedCompany[] | null = null;

const getData = () => {
  if (!cachedData) {
    // Normalize all company names once and cache them
    cachedData = parseData().map(company => ({
      ...company,
      normalizedName: normalizeCompanyName(company.name),
    }));
  }
  return cachedData;
};

export interface SearchResult {
  type: 'exact' | 'similar' | 'not-found';
  company?: CompanyData;
  suggestions?: (CompanyData & { similarity: number })[];
  searchTerm?: string;
  isAiVerified?: boolean;
}

export const searchCompany = async (term: string): Promise<SearchResult> => {
  const data = getData();
  const normalizedSearch = normalizeCompanyName(term);

  // Layer 1: Exact Match
  const exactMatch = data.find(company => company.normalizedName === normalizedSearch);

  if (exactMatch) {
    return { type: 'exact', company: exactMatch };
  }

  // Layer 2: Fuzzy / Local Similarity
  const SIMILARITY_THRESHOLD = 0.5;
  const HIGH_CONFIDENCE_THRESHOLD = 0.95;

  const similarCompanies = data
    .map(company => ({
      ...company,
      similarity: calculateSimilarity(normalizedSearch, company.normalizedName)
    }))
    .filter(company => company.similarity > SIMILARITY_THRESHOLD)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5);

  if (similarCompanies.length > 0) {
    // If the top suggestion is a very high-confidence match, treat it as exact.
    if (similarCompanies[0].similarity > HIGH_CONFIDENCE_THRESHOLD) {
      return { type: 'exact', company: similarCompanies[0] };
    }
    return { type: 'similar', suggestions: similarCompanies };
  }

  // Layer 3: AI Fallback
  // If local search yielded nothing useful, try AI.
  const aiMatch = await checkWithAI(term, data);
  if (aiMatch) {
    return { type: 'exact', company: aiMatch, isAiVerified: true };
  }

  // Not Found
  return { type: 'not-found', searchTerm: term };
};
