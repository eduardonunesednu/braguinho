import os
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI(
    title="Briguinho API",
    description="API para a aplicação educativa Briguinho",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, deve ser mais restrito
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SpeakRequest(BaseModel):
    text: str

@app.get("/")
async def root():
    return {"message": "Olá! O backend do Briguinho está a funcionar! 🏰"}

@app.get("/status")
async def status():
    return {"status": "ok", "mascote": "Briguinho"}

@app.post("/speak")
async def speak(request: SpeakRequest):
    try:
        model = genai.GenerativeModel("gemini-2.0-flash-exp")
        
        propmt = f"Lê isto com uma voz de menino jovem, enérgico e em Português de Portugal: {request.text}"
        
        response = model.generate_content(
            propmt,
            generation_config=genai.types.GenerationConfig(
                response_modalities=["AUDIO"],
                speech_config=genai.types.SpeechConfig(
                    voice_config=genai.types.VoiceConfig(
                        prebuilt_voice_config=genai.types.PrebuiltVoiceConfig(
                            voice_name="Puck"
                        )
                    )
                )
            )
        )
        
        # Extract base64 audio data
        if response.candidates and response.candidates[0].content.parts:
            # The structure might vary slightly, usually it's inline_data
            for part in response.candidates[0].content.parts:
                if part.inline_data:
                    return {"audio": part.inline_data.data}
        
        raise HTTPException(status_code=500, detail="Não foi possível gerar áudio.")
        
    except Exception as e:
        print(f"Erro no TTS: {e}")
        raise HTTPException(status_code=500, detail=str(e))
