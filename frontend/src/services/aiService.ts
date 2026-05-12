import { GoogleGenAI, Type } from "@google/genai";
import { mockProducts } from "./api";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const aiService = {
  getSearchSuggestions: async (query: string): Promise<string[]> => {
    if (!query || query.length < 2) return [];
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Basado en esta lista de productos de moda: ${mockProducts.map(p => p.name).join(', ')}. Sugiere 3 términos de búsqueda cortos para la consulta: "${query}". Responde solo con un array JSON de strings.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      });
      
      return JSON.parse(response.text || '[]');
    } catch (error) {
      console.error("AI Search Error:", error);
      return mockProducts
        .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
        .map(p => p.name)
        .slice(0, 3);
    }
  },

  getRecommendations: async (userInterests?: string): Promise<string[]> => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Eres un estilista de lujo. Sugiere 3 IDs de productos de esta lista [${mockProducts.map(p => `ID:${p.id}, Nombre:${p.name}`).join('; ')}] basándote en un estilo sofisticado${userInterests ? ` y el interés: ${userInterests}` : ''}. Responde solo con un array JSON de IDs (strings).`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      });
      
      return JSON.parse(response.text || '[]');
    } catch (error) {
      console.error("AI Recommendation Error:", error);
      return mockProducts.slice(0, 3).map(p => p.id);
    }
  }
};
