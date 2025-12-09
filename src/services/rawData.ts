export interface CompanyData {
  name: string;
  comments?: string;
  category?: string;
  poBox?: string;
  status: 'TML' | 'NTML';
}

// Using a structured array is more robust than parsing a multi-line string.
const tmlData: Omit<CompanyData, 'status'>[] = [
  { name: '1001 EVENTS FZ LLC', comments: 'Hold on all Retail Credit facilities', category: 'B', poBox: '502373' },
  { name: '1001 EVENTS TOURISM (LLC)', comments: 'Hold on all Retail Credit facilities', category: 'B', poBox: '119616' },
  { name: '24 MEDIA STUDIES FZ LLC', category: 'A', poBox: '77972' },
  { name: '25HOURS HOTEL DUBAI ONE CENTRAL L.L.C', category: 'A', poBox: '9895' },
  { name: '3D DESIGN & DECORATION & DISPLAY LLC', comments: 'Hold on all retail credit facilities', category: 'B', poBox: '60943' },
  { name: '3I INFOTECH LIMITED - SHARJAH', category: 'A', poBox: '8089' },
  { name: '3M GULF LTD', category: 'A', poBox: '20191' },
  { name: 'AAMAL', comments: 'Hold on all retail credit facilities', category: 'A', poBox: '500224' },
  { name: 'AAL GROUP LIMITED', comments: 'Staff ID card copy is mandatory', category: 'B', poBox: '8231' },
  { name: 'ABBOTT LABORATORIES GMBH - DUBAI BRANCH', comments: 'Can also accept applications from Dafza', category: 'A', poBox: '53518' },
  { name: 'ABU DHABI AGRICULTURE AND FOOD SAFETY AUTHORITY (ADAFSA)', comments: 'Visas can also be accepted', category: 'A', poBox: '52150' },
  { name: 'ABU DHABI AIRPORTS COMPANY', category: 'C', poBox: '94449' },
  { name: 'ABU DHABI AVIATION', category: 'A', poBox: '2723' },
  { name: 'ABU DHABI DISTRIBUTION CO.', category: 'A', poBox: '219' },
  { name: 'ADNOC - ABU DHABI NATIONAL OIL CO', category: 'A', poBox: '898' },
  { name: 'ADNOC DISTRIBUTION', category: 'A', poBox: '4188' },
  { name: 'ADNOC DRILLING', category: 'A', poBox: '4017' },
];

const ntmlData: Omit<CompanyData, 'status' | 'category'>[] = [
  { name: '(ARAB GULF HEALTH SERVICES LLC' },
  { name: '1 BOXOFFICE DMCC' },
  { name: '1000 HEADS CONSULTING' },
  { name: '1001 APP SOFTWARE SOLUTIONS FZ LLC' },
  { name: '3I INFOTECH LIMITED' },
  { name: '3M GULF' },
  { name: '3M GULF FZE' },
  { name: '3M GULF LIMITED' },
  { name: 'A T KEARNEY' },
  { name: 'AAL GROUP LTD' },
  { name: 'ABBOTT LABORATORIES' },
  { name: 'ABBOTT LABORATORIES GMBH' },
  { name: 'ABU DHABI AGRICULTURE AND FOOD SAFETY AUTHORITY ADAFSA' },
  { name: 'ABU DHABI AIRPORTS COMPANY' },
  { name: 'ABU DHABI AVIATION' },
  { name: 'ABU DHABI DISTRIBUTION CO' },
  { name: 'ADNOC' },
  { name: 'ADNOC DISTRIBUTION' },
  { name: 'ADNOC DRILLING' },
];

export const parseData = (): CompanyData[] => {
  const tmlCompanies: CompanyData[] = tmlData.map(c => ({ ...c, status: 'TML' }));
  const ntmlCompanies: CompanyData[] = ntmlData.map(c => ({ ...c, status: 'NTML', category: 'GOOD' }));

  return [...tmlCompanies, ...ntmlCompanies];
};
