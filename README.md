# Company Status Lookup

A React application to determine if a company is TML Listed, NTML Good Listed, or Not Listed.

## Features
- **Instant Search**: Checks embedded TML/NTML data.
- **Smart Matching**: Handles typos and normalizes terms like "Pvt", "Ltd", "Adnoc".
- **AI Fallback**: Uses Google Gemini to find semantically matching companies if local search fails (requires API Key).
- **Mobile First**: Optimized for all devices.

## Setup

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. (Optional) Add your Gemini API Key:
   - Copy \`.env.example\` to \`.env\`
   - Add your key: \`VITE_GEMINI_API_KEY=your_key_here\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Build for production:
   \`\`\`bash
   npm run build
   \`\`\`
