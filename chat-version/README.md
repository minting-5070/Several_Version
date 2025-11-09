# 🎯 Top Journal Paper Scanner - Academic AI Assistant

A sophisticated AI assistant specialized in academic research, leveraging top-tier journals and high-impact papers to provide credible, peer-reviewed information. Now with integrated SerpAPI for real-time academic paper search!

## 🔬 Features

- **🎯 Top Journal Scanner**: Automatically searches and filters top-tier academic papers
- **📚 SerpAPI Integration**: Real-time Google Scholar search with academic paper analysis
- **🤖 AI-Powered Analysis**: GPT-4o-mini analyzes papers for relevance and usefulness
- **⭐ Journal Tier Classification**: Automatic classification of papers by journal quality
- **🔍 Smart Search**: Detects research queries and automatically searches academic databases
- **📖 Academic Excellence**: Prioritizes top-tier journals (Nature, Science, Cell, UTD 24, etc.)
- **🎓 Research Assistant**: Specialized for academic research and literature review

## 🚀 Quick Start

### 1. Backend Server Setup

First, start the backend server:

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Edit .env file with your API keys
# OPENAI_API_KEY=your_openai_api_key_here
# SERPAPI_KEY=your_serpapi_key_here

# Start backend server
npm start
```

### 2. Frontend Setup

Create a `.env.local` file in the chat-version root:

```bash
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Backend API Configuration (optional, defaults to localhost:5000)
BACKEND_API_URL=http://localhost:5000
```

**Get your API keys from**:
- [OpenAI Platform](https://platform.openai.com/api-keys)
- [SerpAPI](https://serpapi.com/) for Google Scholar search

### 3. Installation & Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the application.

## 🔧 System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   External APIs │
│   (Next.js)     │◄──►│   (Express.js)  │◄──►│   SerpAPI       │
│   Port: 3000    │    │   Port: 5000     │    │   OpenAI API    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

- **Frontend**: Next.js chat interface with AI integration
- **Backend**: Express.js server with SerpAPI and OpenAI integration
- **API Flow**: Frontend → Backend → SerpAPI (Google Scholar) → OpenAI (Analysis)

## 📚 Academic Sources

### Top Science Journals
- **Nature** (IF: 69.5) - World's premier science journal
- **Science** (IF: 63.8) - AAAS flagship publication
- **Cell** (IF: 66.9) - Leading cell biology journal
- **NEJM** (IF: 158.5) - Top medical journal
- **The Lancet** (IF: 202.7) - Premier medical publication

### Business & Management (UTD 24)
- **Academy of Management Journal** - Top management journal
- **Strategic Management Journal** - Strategy research leader
- **Management Science** - Analytics and operations
- **Journal of Marketing** - Marketing research authority
- **American Economic Review** - Premier economics journal

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **AI Model**: OpenAI GPT-4o
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Markdown**: React Markdown with GFM support
- **TypeScript**: Full type safety

## 🌐 Deployment

### Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Research Assistant"
   git branch -M main
   git remote add origin https://github.com/yourusername/research-assistant.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variable: `OPENAI_API_KEY`
   - Deploy!

### Environment Variables for Production

In Vercel dashboard, add:
- `OPENAI_API_KEY`: Your OpenAI API key

## 📖 Usage

Simply ask any research question or request academic analysis:

- "What are the latest developments in AI creativity?"
- "Analyze the impact of ESG on corporate performance"
- "Review literature on quantum computing applications"
- "Find recent papers on sustainable supply chain management"

The assistant will automatically:
- Search top-tier academic sources
- Prioritize high-impact publications
- Provide credible citations
- Format responses with proper academic structure

## 🔍 Quality Standards

- **Impact Factor Priority**: Prefers journals with IF > 3.0
- **Citation Requirements**: Substantial citation counts required
- **Recency Preference**: Prioritizes papers from last 10 years
- **Peer Review Verification**: Only peer-reviewed publications
- **Predatory Journal Exclusion**: Filters out questionable venues

## 📄 License

MIT License - feel free to use for academic and research purposes.

## 🤝 Contributing

Contributions welcome! Please feel free to submit pull requests or open issues for improvements.