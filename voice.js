// Voice functionality for speech recognition and synthesis

class VoiceAssistant {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.language = 'en-US';
    this.onResult = null;
    this.onError = null;
    
    this.initSpeechRecognition();
  }
  
  initSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = this.language;
      
      this.recognition.onstart = () => {
        this.isListening = true;
        console.log('Voice recognition started');
      };
      
      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('Recognized:', transcript);
        
        if (this.onResult) {
          this.onResult(transcript);
        }
      };
      
      this.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        
        if (this.onError) {
          this.onError(event.error);
        }
      };
      
      this.recognition.onend = () => {
        this.isListening = false;
        console.log('Voice recognition ended');
      };
    } else {
      console.warn('Speech recognition not supported in this browser');
    }
  }
  
  startListening() {
    if (this.recognition && !this.isListening) {
      try {
        this.recognition.start();
        return true;
      } catch (error) {
        console.error('Failed to start recognition:', error);
        return false;
      }
    }
    return false;
  }
  
  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
  }
  
  setLanguage(langCode) {
    this.language = langCode;
    if (this.recognition) {
      this.recognition.lang = langCode;
    }
  }
  
  speak(text, rate = 0.9) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.lang = this.language;
      
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      window.speechSynthesis.speak(utterance);
      return true;
    }
    return false;
  }
}

// Create global voice assistant instance
const voiceAssistant = new VoiceAssistant();
