export type Tool = { 
    name: string; 
    slug: string; 
    color: string; 
    description: string; 
    icon?: string; 
    category: "Web Stack" | "Mobile Stack" | "AI Engineer";
    isLucide?: boolean;
};

export const tools: Tool[] = [
    // === WEB STACK ===
    { name: "Python", slug: "python", color: "3776AB", description: "Programming Languages", category: "Web Stack" },
    { name: "TypeScript", slug: "typescript", color: "3178C6", description: "Programming Languages", category: "Web Stack" },
    { name: "JavaScript", slug: "javascript", color: "F7DF1E", description: "Programming Languages", category: "Web Stack" },
    { name: "SQL", slug: "mysql", color: "4479A1", description: "Programming Languages", category: "Web Stack" },
    { name: "React 19", slug: "react", color: "61DAFB", description: "Frontend Development", category: "Web Stack" },
    { name: "Next.js", slug: "nextdotjs", color: "000000", description: "Frontend Development", category: "Web Stack" },
    { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4", description: "Frontend Development", category: "Web Stack" },
    { name: "Framer Motion", slug: "framer", color: "0055FF", description: "Frontend Development", category: "Web Stack" },
    { name: "Zustand", slug: "react", color: "61DAFB", description: "Frontend Development", category: "Web Stack" },
    { name: "Vite", slug: "vite", color: "646CFF", description: "Frontend Development", category: "Web Stack" },
    { name: "Node.js", slug: "nodedotjs", color: "339933", description: "Backend Development", category: "Web Stack" },
    { name: "Express.js", slug: "express", color: "000000", description: "Backend Development", category: "Web Stack" },
    { name: "REST APIs", slug: "json", color: "000000", description: "Backend Development", category: "Web Stack" },
    { name: "PostgreSQL", slug: "postgresql", color: "4169E1", description: "Databases", category: "Web Stack" },
    { name: "MongoDB", slug: "mongodb", color: "47A248", description: "Databases", category: "Web Stack" },
    { name: "Supabase", slug: "supabase", color: "3ECF8E", description: "Databases", category: "Web Stack" },
    { name: "JWT Authentication", slug: "jsonwebtokens", color: "000000", description: "Security", category: "Web Stack" },
    { name: "Role-Based Access Control", slug: "auth0", color: "EB5424", description: "Security", category: "Web Stack" },
    { name: "Bcrypt", slug: "nodedotjs", color: "339933", description: "Security", category: "Web Stack" },
    { name: "Vercel", slug: "vercel", color: "000000", description: "Cloud & DevOps", category: "Web Stack" },
    { name: "Render", slug: "render", color: "46E3B7", description: "Cloud & DevOps", category: "Web Stack" },
    { name: "Docker", slug: "docker", color: "2496ED", description: "Cloud & DevOps", category: "Web Stack" },
    { name: "Git", slug: "git", color: "F05032", description: "Developer Tools", category: "Web Stack" },
    { name: "GitHub", slug: "github", color: "181717", description: "Developer Tools", category: "Web Stack" },
    { name: "Axios", slug: "axios", color: "5A29E4", description: "Developer Tools", category: "Web Stack" },
    { name: "React Router", slug: "reactrouter", color: "CA4245", description: "Developer Tools", category: "Web Stack" },
    { name: "VS Code", slug: "visualstudiocode", color: "007ACC", description: "Developer Tools", category: "Web Stack" },

    // === MOBILE STACK ===
    { name: "React Native", slug: "react", color: "61DAFB", description: "Cross-Platform Mobile", category: "Mobile Stack" },
    { name: "Expo", slug: "expo", color: "000020", description: "Mobile Framework", category: "Mobile Stack" },
    { name: "Mobile UI/UX", slug: "Figma", color: "F24E1E", description: "Mobile Design", category: "Mobile Stack", isLucide: true },
    { name: "GPS Geofencing", slug: "googlemaps", color: "4285F4", description: "Location Services", category: "Mobile Stack" },
    
    // === AI ENGINEER ===
    // LLM Engineering
    { name: "OpenAI", slug: "openai", color: "000000", description: "LLM Engineering", category: "AI Engineer" },
    { name: "Gemini", slug: "google", color: "4285F4", description: "LLM Engineering", category: "AI Engineer" },
    { name: "Groq", slug: "groq", color: "000000", description: "LLM Engineering", category: "AI Engineer" },
    { name: "OpenRouter", slug: "Network", color: "FFFFFF", description: "LLM Engineering", category: "AI Engineer", isLucide: true },
    { name: "Prompt Engineering", slug: "MessageSquareText", color: "FFFFFF", description: "LLM Engineering", category: "AI Engineer", isLucide: true },
    { name: "Structured Outputs", slug: "CodeXml", color: "FFFFFF", description: "LLM Engineering", category: "AI Engineer", isLucide: true },
    { name: "Function Calling", slug: "Braces", color: "FFFFFF", description: "LLM Engineering", category: "AI Engineer", isLucide: true },
    { name: "Streaming", slug: "Activity", color: "FFFFFF", description: "LLM Engineering", category: "AI Engineer", isLucide: true },
    
    // RAG
    { name: "LangChain", slug: "langchain", color: "121212", description: "RAG", category: "AI Engineer" },
    { name: "LlamaIndex", slug: "BookOpen", color: "FFFFFF", description: "RAG", category: "AI Engineer", isLucide: true },
    { name: "Qdrant", slug: "qdrant", color: "000000", description: "RAG", category: "AI Engineer" },
    { name: "pgvector", slug: "postgresql", color: "4169E1", description: "RAG", category: "AI Engineer" },
    { name: "Embeddings", slug: "Binary", color: "FFFFFF", description: "RAG", category: "AI Engineer", isLucide: true },
    { name: "Vector Search", slug: "Search", color: "FFFFFF", description: "RAG", category: "AI Engineer", isLucide: true },
    { name: "Hybrid Search", slug: "Blend", color: "FFFFFF", description: "RAG", category: "AI Engineer", isLucide: true },
    { name: "Reranking", slug: "ArrowUpDown", color: "FFFFFF", description: "RAG", category: "AI Engineer", isLucide: true },
    { name: "Query Rewriting", slug: "RefreshCcw", color: "FFFFFF", description: "RAG", category: "AI Engineer", isLucide: true },
    
    // AI Agents
    { name: "LangGraph", slug: "Network", color: "FFFFFF", description: "AI Agents", category: "AI Engineer", isLucide: true },
    { name: "Tool Calling", slug: "Wrench", color: "FFFFFF", description: "AI Agents", category: "AI Engineer", isLucide: true },
    { name: "Agent Workflows", slug: "Workflow", color: "FFFFFF", description: "AI Agents", category: "AI Engineer", isLucide: true },
    { name: "Memory", slug: "BrainCircuit", color: "FFFFFF", description: "AI Agents", category: "AI Engineer", isLucide: true },
    { name: "State Management", slug: "Database", color: "FFFFFF", description: "AI Agents", category: "AI Engineer", isLucide: true },
    { name: "MCP", slug: "Cpu", color: "FFFFFF", description: "AI Agents", category: "AI Engineer", isLucide: true },
    
    // AI Backend
    { name: "Python", slug: "python", color: "3776AB", description: "AI Backend", category: "AI Engineer" },
    { name: "FastAPI", slug: "fastapi", color: "009688", description: "AI Backend", category: "AI Engineer" },
    { name: "Redis", slug: "redis", color: "DC382D", description: "AI Backend", category: "AI Engineer" },
    { name: "Celery", slug: "celery", color: "37814A", description: "AI Backend", category: "AI Engineer" },
    { name: "REST APIs", slug: "json", color: "000000", description: "AI Backend", category: "AI Engineer" },
    { name: "WebSockets", slug: "ArrowRightLeft", color: "FFFFFF", description: "AI Backend", category: "AI Engineer", isLucide: true },
    { name: "Async Processing", slug: "Timer", color: "FFFFFF", description: "AI Backend", category: "AI Engineer", isLucide: true },
    
    // AI Evaluation
    { name: "RAG Evaluation", slug: "CheckCircle", color: "FFFFFF", description: "AI Evaluation", category: "AI Engineer", isLucide: true },
    { name: "LLM-as-a-Judge", slug: "Gavel", color: "FFFFFF", description: "AI Evaluation", category: "AI Engineer", isLucide: true },
    { name: "Hallucination Detection", slug: "ScanSearch", color: "FFFFFF", description: "AI Evaluation", category: "AI Engineer", isLucide: true },
    { name: "Groundedness", slug: "Anchor", color: "FFFFFF", description: "AI Evaluation", category: "AI Engineer", isLucide: true },
    { name: "Faithfulness", slug: "Scale", color: "FFFFFF", description: "AI Evaluation", category: "AI Engineer", isLucide: true },
    { name: "Regression Testing", slug: "TestTube", color: "FFFFFF", description: "AI Evaluation", category: "AI Engineer", isLucide: true },
    
    // Multimodal AI
    { name: "Vision LLMs", slug: "Eye", color: "FFFFFF", description: "Multimodal AI", category: "AI Engineer", isLucide: true },
    { name: "Speech-to-Text", slug: "Mic", color: "FFFFFF", description: "Multimodal AI", category: "AI Engineer", isLucide: true },
    { name: "Audio Processing", slug: "Waveform", color: "FFFFFF", description: "Multimodal AI", category: "AI Engineer", isLucide: true },
    { name: "Document AI", slug: "FileText", color: "FFFFFF", description: "Multimodal AI", category: "AI Engineer", isLucide: true },
    
    // AI Security
    { name: "Prompt Injection", slug: "ShieldAlert", color: "FFFFFF", description: "AI Security", category: "AI Engineer", isLucide: true },
    { name: "RAG Security", slug: "Lock", color: "FFFFFF", description: "AI Security", category: "AI Engineer", isLucide: true },
    { name: "Output Validation", slug: "ShieldCheck", color: "FFFFFF", description: "AI Security", category: "AI Engineer", isLucide: true },
    { name: "Tool Permissions", slug: "Key", color: "FFFFFF", description: "AI Security", category: "AI Engineer", isLucide: true },
    
    // AI Infrastructure
    { name: "PostgreSQL", slug: "postgresql", color: "4169E1", description: "AI Infrastructure", category: "AI Engineer" },
    { name: "Supabase", slug: "supabase", color: "3ECF8E", description: "AI Infrastructure", category: "AI Engineer" },
    { name: "Docker", slug: "docker", color: "2496ED", description: "AI Infrastructure", category: "AI Engineer" },
    { name: "GitHub Actions", slug: "githubactions", color: "2088FF", description: "AI Infrastructure", category: "AI Engineer" },
    { name: "Monitoring", slug: "ActivitySquare", color: "FFFFFF", description: "AI Infrastructure", category: "AI Engineer", isLucide: true },
    { name: "Caching", slug: "Zap", color: "FFFFFF", description: "AI Infrastructure", category: "AI Engineer", isLucide: true },
    { name: "Model Fallbacks", slug: "ArrowDownUp", color: "FFFFFF", description: "AI Infrastructure", category: "AI Engineer", isLucide: true }
];
