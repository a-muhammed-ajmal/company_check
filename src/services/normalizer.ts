export const normalizeCompanyName = (name: string): string => {
  if (!name) return '';

  return name
    .toUpperCase()
    .replace(/\\s+/g, ' ')
    .replace(/[.,\\-()]/g, '')
    .replace(/\\bPVT\\.?\\b/gi, 'PRIVATE')
    .replace(/\\bPRIVATE\\b/g, 'PRIVATE')
    .replace(/\\bLTD\\.?\\b/gi, 'LIMITED')
    .replace(/\\bCO\\.?\\b/gi, 'COMPANY')
    .replace(/\\bL\\.L\\.C\\.?\\b/gi, 'LLC')
    .replace(/\\bL\\s*L\\s*C\\b/gi, 'LLC')
    .replace(/\\bFZ\\b/gi, 'FREEZONE')
    .replace(/\\bPLLC\\b/gi, 'PRIVATE LIMITED LIABILITY COMPANY')
    .replace(/\\bADNOC\\b/gi, 'ADNOC')
    .trim();
};

export const calculateSimilarity = (str1: string, str2: string): number => {
  const s1 = normalizeCompanyName(str1);
  const s2 = normalizeCompanyName(str2);

  if (s1 === s2) return 1;
  if (s1.includes(s2) || s2.includes(s1)) return 0.9;

  // Basic Jaccard-like index on words
  const words1 = s1.split(' ');
  const words2 = s2.split(' ');
  const commonWords = words1.filter(w => words2.includes(w)).length;
  // Weight it slightly to favor containment
  const similarity = (commonWords * 2) / (words1.length + words2.length);

  return similarity;
};
