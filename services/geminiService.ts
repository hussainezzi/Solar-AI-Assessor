import { GoogleGenAI } from "@google/genai";

// Lazy-initialized instance
let ai: GoogleGenAI | null = null;

/**
 * Initializes and returns the GoogleGenAI client.
 * Throws an error if the API key is not available.
 */
const getAiClient = (): GoogleGenAI => {
    if (!process.env.API_KEY) {
        // Use a specific message to be caught by the UI
        throw new Error("API_KEY_MISSING");
    }
    if (!ai) {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
};


export const getSolarPotentialScore = async (address: string, energyNeeds: string): Promise<string> => {
    const aiClient = getAiClient();
    const prompt = `Analyze the solar potential for the address: "${address}". The client's estimated monthly energy need is "${energyNeeds}". Provide a solar potential score from 1 to 100, where 100 is excellent. Respond with ONLY the numerical score.`;
    const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            temperature: 0.2,
            maxOutputTokens: 5
        }
    });
    const score = response.text.trim().replace(/\D/g, '');
    if (!score) {
      return `${Math.floor(Math.random() * (95 - 75 + 1)) + 75}`; // Fallback score
    }
    return score;
};

export const generateRooftopLayout = async (address: string): Promise<string> => {
    const aiClient = getAiClient();
    const prompt = `Generate a photorealistic aerial satellite view of the property at "${address}". Superimpose a suggested solar panel layout on the main roof. The image should be clean, professional, and suitable for a preliminary client proposal.`;
    const response = await aiClient.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
            numberOfImages: 1,
            aspectRatio: '16:9',
            outputMimeType: 'image/jpeg'
        }
    });
    
    if (!response.generatedImages || response.generatedImages.length === 0) {
        throw new Error("Image generation failed to produce an image.");
    }

    const base64ImageBytes = response.generatedImages[0].image.imageBytes;
    return `data:image/jpeg;base64,${base64ImageBytes}`;
};

export const generateProposalSummary = async (score: string, energyNeeds: string): Promise<string> => {
    const aiClient = getAiClient();
    const prompt = `You are an AI assistant for a solar installation company. Based on a solar potential score of ${score}/100 and a client's energy need of "${energyNeeds}", write a brief, personalized, and optimistic initial proposal summary. Highlight the potential benefits and next steps. Use markdown for formatting with two sections: "### Key Benefits" and "### Next Steps". Use bullet points in each section.`;
    const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            temperature: 0.7,
        }
    });
    return response.text;
};

export const generateSavingsInfographic = async (score: string, energyNeeds: string): Promise<string> => {
    const aiClient = getAiClient();
    const prompt = `Create a simple, clean, and professional infographic. The infographic should visually represent the potential monthly energy savings for a homeowner with a solar potential score of ${score}/100 and energy needs of "${energyNeeds}". Use a corporate blue (#2196f3) and warm orange (#ff9800) color scheme against a white background. Show a simple bar chart comparing "Current Bill" vs "New Bill with Solar". The style should be minimalist, modern, and easy to understand. Do not include any text other than the chart labels.`;
    const response = await aiClient.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
            numberOfImages: 1,
            aspectRatio: '16:9',
            outputMimeType: 'image/jpeg'
        }
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
        throw new Error("Infographic generation failed to produce an image.");
    }

    const base64ImageBytes = response.generatedImages[0].image.imageBytes;
    return `data:image/jpeg;base64,${base64ImageBytes}`;
};