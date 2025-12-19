import React from 'react';
import mascote from './assets/mascote_braguinho.jpg';

function App() {
  const [isSpeaking, setIsSpeaking] = React.useState(false);

  // Simular o mascote a falar periodicamente
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 2000); // Fala por 2 segundos
    }, 5000); // A cada 5 segundos
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-100 to-green-50">

      {/* Container Principal */}
      <main className="max-w-4xl w-full flex flex-col items-center space-y-8 animate-fade-in-up">

        {/* Mascote e Boas-vindas */}
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">

          {/* Imagem do Mascote */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-braguinho-yellow to-braguinho-orange rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <img
              src={mascote}
              alt="Mascote Braguinho"
              className={`relative w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300 ${isSpeaking ? 'animate-speak' : 'animate-float'}`}
            />
          </div>

          {/* Balão de Fala */}
          <div className="bg-white p-6 rounded-3xl rounded-tl-none shadow-lg border-b-4 border-braguinho-blue relative max-w-sm">
            <h1 className="text-2xl font-bold text-braguinho-blue mb-2">Olá! Sou o Braguinho!</h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              O que queres descobrir hoje em Bragança?
            </p>
          </div>
        </div>

        {/* Galeria de Habilidades */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-10">

          <button className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md border-b-8 border-purple-400 hover:border-purple-500 hover:translate-y-1 transition-all group">
            <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">🏰</span>
            <span className="text-xl font-bold text-purple-600">Histórias do Castelo</span>
          </button>

          <button className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md border-b-8 border-yellow-400 hover:border-yellow-500 hover:translate-y-1 transition-all group">
            <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">☀️</span>
            <span className="text-xl font-bold text-yellow-600">O Tempo Hoje</span>
          </button>

          <button className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md border-b-8 border-green-400 hover:border-green-500 hover:translate-y-1 transition-all group">
            <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">🌳</span>
            <span className="text-xl font-bold text-green-600">Animais do Parque</span>
          </button>

        </div>

      </main>

      {/* Footer simples */}
      <footer className="mt-12 text-gray-500 text-sm">
        Braguinho © {new Date().getFullYear()} - Aprende e diverte-te!
      </footer>
    </div>
  );
}

export default App;
