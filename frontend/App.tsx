
import React, { useState } from 'react';
import MascotSide from './components/MascotSide';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  return (
    <div className="container mx-auto min-h-screen px-4 py-6 md:py-12 flex flex-col lg:flex-row gap-8 items-center justify-center">
      {/* Left Side: Mascot */}
      <div className="w-full lg:w-5/12 h-auto lg:h-[80vh] flex items-center justify-center">
        <MascotSide isThinking={isThinking} isSpeaking={isSpeaking} />
      </div>

      {/* Right Side: Chat */}
      <div className="w-full lg:w-7/12 h-[60vh] lg:h-[80vh]">
        <ChatInterface 
          onThinkingChange={setIsThinking} 
          onSpeakingChange={setIsSpeaking}
          isSpeaking={isSpeaking}
        />
      </div>

      {/* Background decoration elements */}
      <div className="fixed -top-10 -left-10 w-64 h-64 bg-red-400 rounded-full blur-3xl opacity-10 pointer-events-none"></div>
      <div className="fixed -bottom-10 -right-10 w-96 h-96 bg-yellow-400 rounded-full blur-3xl opacity-10 pointer-events-none"></div>
    </div>
  );
};

export default App;
