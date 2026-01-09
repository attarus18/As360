import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateAssistantResponse = async (
  userMessage: string,
  context: string
): Promise<string> => {
  if (!apiKey) {
    return "Mi dispiace, il servizio di assistenza non è momentaneamente disponibile (API Key mancante).";
  }

  try {
    const model = 'gemini-3-flash-preview';
    const response = await ai.models.generateContent({
      model,
      contents: userMessage,
      config: {
        systemInstruction: `Sei l'assistente virtuale dello studio 'Assoimpresa360'.
        Il tuo compito è aiutare i clienti a capire concetti base di contabilità o rispondere a domande generiche.
        Il cliente attuale è: ${context}.
        Sii professionale, cortese e conciso. Rispondi sempre in italiano.
        Non dare consigli legali o finanziari vincolanti, rimanda sempre al contatto diretto con lo studio per questioni delicate.`,
      },
    });

    return response.text || "Mi dispiace, non ho potuto elaborare una risposta.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Si è verificato un errore nel comunicare con l'assistente.";
  }
};