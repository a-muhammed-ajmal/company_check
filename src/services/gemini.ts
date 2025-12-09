import { GoogleGenerativeAI } from "@google/generative-ai";
import { CompanyData } from "./rawData";

// This will fail silently if no key is provided, as per requirements (graceful fallback)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" }) : null;

export const checkWithAI = async (searchTerm: string, database: CompanyData[]): Promise<CompanyData | null> => {
  if (!model) return null;

  try {
    // Create a simplified list of company names for context to keep token count low
    // In a real large DB, we wouldn't dump everything, but for this specific embedded list it's fine.
    const companyNames = database.map(c => c.name).join('\\n');

    const prompt = \`
      I have a database of company names:
      \${companyNames}

      The user searched for: "\${searchTerm}".

      Is this company present in the list above?
      Consider typos, abbreviations (like ADNOC vs Abu Dhabi National Oil Co), and common variations.

      If found, return the EXACT name from the list.
      If not found, return "NOT_FOUND".
      Return ONLY the name or "NOT_FOUND". Do not add any explanation.
    \`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    if (text === "NOT_FOUND") return null;

    // Find the company object that matches the AI returned name
    const found = database.find(c => c.name.toUpperCase() === text.toUpperCase());
    return found || null;
  } catch (error) {
    console.warn("AI Search failed:", error);
    return null;
  }
};
