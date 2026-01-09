
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { briguinhoService, decodeBase64, decodeAudioData } from '../services/gemini';

interface ChatInterfaceProps {
  onThinkingChange: (thinking: boolean) => void;
  onSpeakingChange: (speaking: boolean) => void;
  isSpeaking: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onThinkingChange, onSpeakingChange, isSpeaking }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: 'Olá amiguinho! Bem-vindo a Bragança! Estou muito contente por estares aqui. Sobre o que queres conversar hoje? ✨',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const playVoiceResponse = async (text: string) => {
    initAudioContext();
    const ctx = audioContextRef.current!;
    
    try {
      onSpeakingChange(true);
      const base64Audio = await briguinhoService.generateVoice(text);
      if (!base64Audio) {
        onSpeakingChange(false);
        return;
      }

      const audioBytes = decodeBase64(base64Audio);
      const audioBuffer = await decodeAudioData(audioBytes, ctx, 24000, 1);
      
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      
      source.onended = () => {
        onSpeakingChange(false);
      };
      
      source.start();
    } catch (error) {
      console.error("Erro ao reproduzir voz:", error);
      onSpeakingChange(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isSpeaking) return;

    // First interaction resumes context
    initAudioContext();

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    onThinkingChange(true);

    try {
      const responseText = await briguinhoService.sendMessage(input);
      const modelMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, modelMessage]);
      
      // Start TTS automatically
      await playVoiceResponse(responseText);
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      onThinkingChange(false);
    }
  };

  const QuickButton = ({ text, onClick }: { text: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      disabled={isSpeaking}
      className="bg-red-50 hover:bg-red-100 disabled:opacity-50 text-red-600 px-4 py-2 rounded-full border border-red-200 text-sm font-semibold transition-colors whitespace-nowrap"
    >
      {text}
    </button>
  );

  return (
    <div className="flex flex-col h-full bg-white/60 backdrop-blur-md rounded-3xl shadow-xl border-4 border-yellow-400/50 overflow-hidden">
      {/* Header */}
      <div className="bg-yellow-400 p-4 text-center border-b-4 border-yellow-500 relative">
        <span className="text-yellow-900 font-bold text-lg uppercase tracking-wider">Conversa com o Briguinho</span>
        {isSpeaking && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-end space-x-1 h-4">
            <div className="w-1 bg-yellow-900 animate-bounce h-2"></div>
            <div className="w-1 bg-yellow-900 animate-bounce h-4" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1 bg-yellow-900 animate-bounce h-3" style={{ animationDelay: '0.2s' }}></div>
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] px-5 py-3 rounded-2xl shadow-sm text-lg ${
                msg.role === 'user'
                  ? 'bg-red-500 text-white rounded-br-none'
                  : 'bg-white text-gray-800 border-2 border-yellow-200 rounded-bl-none'
              }`}
            >
              {msg.text}
              <div className={`text-[10px] mt-1 opacity-60 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="p-2 flex space-x-2 overflow-x-auto bg-white/40 border-t border-yellow-100 no-scrollbar">
        <QuickButton 
          text="🏰 Conta-me uma história" 
          onClick={() => { setInput('Conta-me uma história curta sobre o Castelo de Bragança'); }}
        />
        <QuickButton 
          text="🍦 O que posso comer?" 
          onClick={() => { setInput('Quais são as comidas mais saborosas de Bragança?'); }}
        />
        <QuickButton 
          text="🦉 Animais do Montesinho" 
          onClick={() => { setInput('Que animais vivem no Parque Natural de Montesinho?'); }}
        />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 bg-white border-t-2 border-yellow-200 flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isSpeaking}
          placeholder={isSpeaking ? "Ouve o Briguinho..." : "Escreve aqui ao Briguinho..."}
          className="flex-1 px-6 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-yellow-400/50 text-gray-800 text-lg transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || isSpeaking}
          className="bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-yellow-900 p-3 rounded-full shadow-lg transition-transform active:scale-95 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
