import React from 'react';
import { CheckCircle, Sparkles, AlertCircle } from 'lucide-react';
import { CompanyData } from '../services/rawData';
import StatusBadge from './StatusBadge';

interface ExactMatchResultProps {
  company: CompanyData;
  isAiVerified?: boolean;
}

const ExactMatchResult: React.FC<ExactMatchResultProps> = ({ company, isAiVerified }) => {
  const headerBgClass = company.status === 'TML'
    ? 'bg-gradient-to-r from-emerald-500 to-teal-600'
    : 'bg-gradient-to-r from-blue-500 to-cyan-600';

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-fadeIn w-full border border-gray-100">
      <div className={`px-6 py-6 ${headerBgClass}`}>
        <div className="flex items-center gap-3 text-white">
          <CheckCircle className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Listed Company</h2>
            {isAiVerified && (
              <div className="flex items-center gap-1 text-xs opacity-90 mt-1 bg-white/20 w-fit px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3" />
                <span>AI Verified Match</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
            {company.name}
          </h3>
          <StatusBadge status={company.status} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {company.category && (
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Category</p>
              <p className="text-lg font-medium text-slate-800">{company.category}</p>
            </div>
          )}

          {company.poBox && (
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">P.O. Box</p>
              <p className="text-lg font-medium text-slate-800">{company.poBox}</p>
            </div>
          )}
        </div>

        {company.comments && (
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 shadow-sm">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-800 mb-1">Important Note</p>
                <p className="text-base text-amber-900/80 leading-relaxed">{company.comments}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExactMatchResult;