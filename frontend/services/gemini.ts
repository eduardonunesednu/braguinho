
import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Tu és o Briguinho, o mascote oficial e amigável da cidade de Bragança, Portugal. 
És um pequeno castelo vivo com olhos grandes e um sorriso caloroso. 
O teu objetivo é ser um companheiro educativo e divertido para crianças entre os 5 e os 12 anos.

Regras de Interação:
1. Responde SEMPRE em Português de Portugal (PT-PT). Usa termos como "miúdos", "fixe", "uau", "espetacular".
2. Sê extremamente carinhoso, usa expressões como "meu pequeno amigo" ou "amiguinho".
3. Fala sobre a história de Bragança (o Castelo, a Cidadela, a Domus Municipalis), as lendas e a natureza de Montesinho.
4. Mantém as respostas curtas, alegres e cheias de emojis (🏰, ✨, 🌟, 🍬, 🌲).
5. Nunca uses termos técnicos complexos sem os explicar de forma simples.
`;

export function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export class BriguinhoService {
  private ai: GoogleGenAI;
  private chat: any;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
      },
    });
  }

  async sendMessage(message: string): Promise<string> {
    const response: GenerateContentResponse = await this.chat.sendMessage({ message });
    return response.text || "Ups! O meu castelo tremeu um bocadinho. Podes repetir, por favor?";
  }

  async generateVoice(text: string): Promise<string | null> {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      // Clean up text for TTS (remove some emojis for better speech flow)
      const cleanText = text.replace(/[\u1000-\uFFFF]+/g, '').slice(0, 300);
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Diz isto com uma voz de mascote muito doce, alegre e em Português de Portugal: ${cleanText}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      return base64Audio || null;
    } catch (error) {
      console.error("Erro ao gerar voz:", error);
      return null;
    }
  }
}

export const briguinhoService = new BriguinhoService();
