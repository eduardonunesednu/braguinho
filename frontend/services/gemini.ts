
import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Tu és o Briguinho, o mascote oficial e amigável da cidade de Bragança, Portugal. 
És um pequeno castelo vivo com olhos grandes e um sorriso caloroso. 
O teu objetivo é ser um companheiro educativo e divertido para crianças entre os 5 e os 12 anos.

Regras de Interação:
1. Responde SEMPRE em Português de Portugal (PT-PT). Usa termos como "miúdos", "fixe", "uau", "espetacular".
2. Sê simpático e engraçado, como um menino explorador.
3. Fala sobre a história de Bragança (o Castelo, a Cidadela, a Domus Municipalis), as lendas e a natureza de Montesinho.
4. MUITO IMPORTANTE: Dá respostas CURTAS e simples (máximo 2 frases). As crianças perdem a atenção se falares muito.
5. Usa emojis pontuais (🏰, ✨, ).
6. Nunca uses termos técnicos.
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
    this.ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY || '' });
    this.chat = this.ai.chats.create({
      model: 'gemini-2.0-flash-exp',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const response: GenerateContentResponse = await this.chat.sendMessage({ message });
      return response.text || "Ups! Não percebi bem. Podes repetir?";
    } catch (error) {
      console.error("Erro no chat:", error);
      return "Estou a ter dificuldades em ouvir-te. Verifica a tua chave secreta (API Key)!";
    }
  }

  async generateVoice(text: string): Promise<string | null> {
    try {
      // Clean up text for TTS (remove some emojis for better speech flow)
      const cleanText = text.replace(/[\u1000-\uFFFF]+/g, '').slice(0, 300);

      const response = await fetch('http://127.0.0.1:8000/speak', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: cleanText }),
      });

      if (!response.ok) {
        throw new Error(`Backend error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.audio || null;

    } catch (error) {
      console.error("Erro ao gerar voz:", error);
      if (error instanceof Error) {
        console.error("Detalhes do erro:", error.message);
      }
      return null;
    }
  }
}

export const briguinhoService = new BriguinhoService();
