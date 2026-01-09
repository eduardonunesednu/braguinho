
import React from 'react';

interface MascotSideProps {
  isThinking: boolean;
  isSpeaking: boolean;
}

const MascotSide: React.FC<MascotSideProps> = ({ isThinking, isSpeaking }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 lg:p-8 space-y-6">
      <div className={`relative transition-all duration-700 ${isThinking || isSpeaking ? 'scale-110' : 'scale-100'}`}>
        {/* Dynamic Aura/Glow reflecting the mascot's colors */}
        <div className={`absolute inset-0 blur-[80px] opacity-40 rounded-full transition-all duration-1000 ${
          isSpeaking 
            ? 'bg-red-500 scale-125 animate-pulse' 
            : isThinking 
              ? 'bg-yellow-300 animate-pulse' 
              : 'bg-yellow-400 opacity-20'
        }`}></div>
        
        {/* Briguinho Image Container */}
        <div className={`relative z-10 ${isSpeaking ? 'animate-[bounce_2s_ease-in-out_infinite]' : 'floating'}`}>
          <div className="w-64 h-64 md:w-96 md:h-96 flex items-center justify-center relative drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
             <img 
               src="https://raw.githubusercontent.com/google-gemini/generative-ai-js/main/samples/web/img/castle_mascot.png" 
               alt="Briguinho - O Mascote de Bragança" 
               className={`w-full h-full object-contain transition-all duration-300 ${isSpeaking ? 'brightness-110 contrast-110' : ''}`}
               onError={(e) => {
                 // Fallback icon that resembles a castle if the specific image path isn't resolved
                 e.currentTarget.src = "https://github.com/eduardonunesednu/braguinho/blob/main/assets/mascote_braguinho.png";
               }}
             />
             
             {/* Visual Speech Pulse - centered on the character's body */}
             {isSpeaking && (
               <div className="absolute top-[65%] left-1/2 -translate-x-1/2 w-16 h-16 bg-red-400/30 rounded-full blur-xl animate-ping"></div>
             )}
          </div>
          
          {/* Thinking Visualizer */}
          {isThinking && (
            <div className="absolute -top-10 -right-4 flex flex-col space-y-2 items-end">
              <div className="flex space-x-1 bg-white px-3 py-1.5 rounded-full shadow-lg border-2 border-yellow-400">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
              <div className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-xl shadow-md font-bold text-xs uppercase tracking-tighter mr-2">
                A preparar uma surpresa...
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-center z-20">
        <h1 className="text-5xl md:text-7xl font-black text-red-600 drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)] transition-all duration-300">
          {isSpeaking ? 'O Briguinho diz:' : 'Olá! Sou o Briguinho'}
        </h1>
        <p className="text-2xl md:text-3xl text-yellow-800 mt-3 font-bold bg-white/40 px-6 py-1 rounded-full backdrop-blur-sm inline-block">
          O teu amiguinho de Bragança 🏰✨
        </p>
      </div>

      {/* Interactive Speech Bubble */}
      <div className={`relative bg-white p-6 rounded-[2.5rem] rounded-tl-none shadow-2xl border-4 transition-all duration-500 ${
        isSpeaking ? 'border-red-500 ring-4 ring-red-100' : 'border-yellow-400'
      } max-w-sm text-center transform hover:scale-105 active:scale-95 cursor-default`}>
        <div className={`absolute -left-5 top-0 w-10 h-10 bg-white border-l-4 border-t-4 ${
          isSpeaking ? 'border-red-500' : 'border-yellow-400'
        } -rotate-45`}></div>
        <p className="text-yellow-950 text-xl font-bold leading-tight">
          {isSpeaking 
            ? "Escuta bem, estou a contar-te algo espetacular!" 
            : "Olá amiguinho! Queres saber algum segredo sobre o meu castelo?"}
        </p>
      </div>
    </div>
  );
};

export default MascotSide;
