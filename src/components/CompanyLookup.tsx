import React, { useState } from 'react';
import { Search, Building2, CheckCircle, XCircle, AlertCircle, ChevronDown, Sparkles } from 'lucide-react';
import { searchCompany, SearchResult } from '../services/searchService';
import { CompanyData } from '../services/rawData';
import StatusBadge from './StatusBadge';
import ExactMatchResult from './ExactMatchResult';

const CompanyLookup: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (termOverride?: string) => {
    const term = termOverride || searchTerm.trim();
    if (!term) return;

    setIsSearching(true);
    // Ensure the "Searching..." state is visible for at least 400ms for a smooth UI feel,
    // but don't delay showing the result if the search itself takes longer.
    const searchPromise = searchCompany(term);
    const minDelayPromise = new Promise(resolve => setTimeout(resolve, 400));

    const [result] = await Promise.all([searchPromise, minDelayPromise]);

    setSearchResults(result);
    setIsSearching(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const selectSuggestion = (company: CompanyData) => {
    setSearchTerm(company.name);
    setSearchResults({
      type: 'exact',
      company: company
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-inter">
      {/* Background decoration */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10" />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-10 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-md">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
                Company Status
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8 pb-32">

        {/* Search Section */}
        <div className="relative z-0 mb-8 sm:mb-12">
           <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur opacity-25"></div>
           <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-2 sm:p-4">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-6 h-6 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Search name (e.g. ADNOC, 3M Gulf)..."
                className="w-full pl-12 pr-4 py-4 text-lg bg-transparent border-none rounded-xl focus:ring-0 placeholder:text-gray-400 text-gray-900"
              />
              <button
                onClick={() => handleSearch()}
                disabled={!searchTerm.trim() || isSearching}
                className="absolute right-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-blue-500/30 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="space-y-6">

          {/* Exact Match Found */}
          {searchResults?.type === 'exact' && searchResults.company && (
            <ExactMatchResult
              company={searchResults.company}
              isAiVerified={searchResults.isAiVerified}
            />
          )}

          {/* Suggestions Found */}
          {searchResults?.type === 'similar' && searchResults.suggestions && (
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 animate-fadeIn border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-100 rounded-full">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Did you mean?</h2>
              </div>
              <p className="text-gray-600 mb-6 font-medium">We found similar names locally. Select the correct one:</p>
              <div className="space-y-3">
                {searchResults.suggestions.map((company, index) => (
                  <button
                    key={index}
                    onClick={() => selectSuggestion(company)}
                    className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all group duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 group-hover:text-blue-700 text-lg">
                          {company.name}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className={\`text-xs px-2.5 py-1 rounded-full font-medium \${
                            company.status === 'TML'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-blue-100 text-blue-700'
                          }\`}>
                            {company.status}
                          </span>
                          <span className="text-xs text-gray-400 font-medium">
                            {Math.round(company.similarity * 100)}% Match
                          </span>
                        </div>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-300 transform -rotate-90 group-hover:text-blue-500 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Not Found */}
          {searchResults?.type === 'not-found' && (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-fadeIn border border-gray-100">
              <div className="px-6 py-6 bg-gradient-to-r from-red-500 to-pink-600">
                <div className="flex items-center gap-3 text-white">
                  <XCircle className="w-8 h-8" />
                  <h2 className="text-2xl font-bold">Unlisted Company</h2>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Search Term</p>
                  <h3 className="text-2xl font-bold text-gray-900">"{searchResults.searchTerm}"</h3>
                </div>

                <div className="bg-red-50 border border-red-100 rounded-xl p-5 mb-6">
                  <p className="text-red-800 font-bold text-lg mb-2">Status: NTML - Not Listed</p>
                  <p className="text-red-700/80 leading-relaxed">
                    This company does not appear in the TML or NTML Good Listed databases.
                    Please proceed with the standard Non-Listed Entity verification process.
                  </p>
                </div>

                <div className="text-sm text-gray-500 flex gap-2 items-start">
                   <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
                   <p>
                    Tip: Ensure you are using the official trade license name. The system handles abbreviations (e.g. "Pvt Ltd") automatically.
                    </p>
                </div>
              </div>
            </div>
          )}

          {/* Initial State / Promo */}
          {!searchResults && (
            <div className="text-center py-12 px-4 opacity-60">
               <Building2 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
               <p className="text-gray-500 text-lg font-medium">Enter a company name above to begin</p>
               <p className="text-gray-400 text-sm mt-2">Checks TML & NTML databases instantly</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default CompanyLookup;
