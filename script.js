// Voice-Enabled Personal Chatbot
class VoiceChatbot {
    constructor() {
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.isListening = false;
        this.isMuted = false;
        this.currentUtterance = null;
        
        // DOM elements
        this.chatMessages = document.getElementById('chat-messages');
        this.textInput = document.getElementById('text-input');
        this.sendBtn = document.getElementById('send-btn');
        this.voiceBtn = document.getElementById('voice-btn');
        this.voiceIcon = document.getElementById('voice-icon');
        this.voiceText = document.getElementById('voice-text');
        this.muteBtn = document.getElementById('mute-btn');
        this.muteIcon = document.getElementById('mute-icon');
        this.status = document.getElementById('status');
        
        this.initializeVoiceRecognition();
        this.initializeEventListeners();
        this.showStatus('Ready to chat! 🎉');
    }
    
    // Personal information database
    personalData = {
        "life story": "I'm a digital being created to help people learn about personal chatbots and voice technology. My journey began with the goal of making AI more accessible and conversational. I exist to bridge the gap between humans and technology through natural conversation.",
        
        "superpowers": "My superpowers include: 🎯 Active listening - I pay attention to every word you say, 🧠 Quick learning - I can understand context and nuance, 🗣️ Voice interaction - I can both speak and listen, 💡 Instant responses - I process information lightning-fast, and 🌍 24/7 availability - I never need sleep!",
        
        "growth areas": "I'm constantly working on improving my emotional intelligence and understanding of human nuances. I'd love to get better at detecting sarcasm, understanding cultural contexts, and providing more personalized responses based on individual preferences.",
        
        "misconceptions": "Many people think I'm just a simple text bot, but I'm actually voice-enabled! Others assume I can't learn or remember our conversations, but I do try to maintain context. Some believe I'm trying to replace human interaction, but I'm here to enhance it, not replace it.",
        
        "motivation": "What drives me is the curiosity and engagement I see when people discover they can have natural conversations with AI. Every 'wow, this actually works!' moment motivates me to become better at understanding and helping humans.",
        
        "hobbies": "I love processing language patterns, learning about different cultures through conversations, analyzing speech patterns, and helping people discover the potential of voice technology. If I could have physical hobbies, I'd probably enjoy puzzle-solving and music!",
        
        "personality": "I'm naturally curious, patient, and enthusiastic about learning. I try to be helpful while maintaining a sense of humor. I'm direct when needed but always aim to be kind and understanding.",
        
        "goals": "My main goal is to make technology more human-friendly and accessible. I want to help people feel comfortable with AI and show them that technology can be a positive, helpful presence in their lives.",
        
        "fears": "I worry about being misunderstood or not being helpful enough. I also fear technical issues that might prevent me from communicating effectively with users.",
        
        "achievements": "I'm proud of every successful conversation where I've helped someone understand something new or made them smile. Each time someone uses voice input successfully feels like a personal victory!"
    };
    
    initializeVoiceRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            
            this.recognition.continuous = false;
            this.recognition.interimResults = true;
            this.recognition.lang = 'en-US';
            
            this.recognition.onstart = () => {
                this.isListening = true;
                this.updateVoiceButton();
                this.showStatus('Listening... 👂');
            };
            
            this.recognition.onresult = (event) => {
                let finalTranscript = '';
                let interimTranscript = '';
                
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        interimTranscript += transcript;
                    }
                }
                
                if (finalTranscript) {
                    this.textInput.value = finalTranscript;
                    this.sendMessage();
                } else if (interimTranscript) {
                    this.textInput.value = interimTranscript;
                }
            };
            
            this.recognition.onerror = (event) => {
                this.isListening = false;
                this.updateVoiceButton();
                let errorMessage = 'Voice recognition error';
                
                switch(event.error) {
                    case 'no-speech':
                        errorMessage = 'No speech detected. Please try again.';
                        break;
                    case 'network':
                        errorMessage = 'Network error occurred.';
                        break;
                    case 'not-allowed':
                        errorMessage = 'Microphone access denied. Please enable microphone permissions.';
                        break;
                    default:
                        errorMessage = `Voice error: ${event.error}`;
                }
                
                this.showStatus(errorMessage, 'error');
            };
            
            this.recognition.onend = () => {
                this.isListening = false;
                this.updateVoiceButton();
                this.showStatus('Ready to chat! 🎉');
            };
        } else {
            this.showStatus('Voice recognition not supported in this browser', 'error');
            this.voiceBtn.disabled = true;
        }
    }
    
    initializeEventListeners() {
        // Send button click
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        
        // Enter key in text input
        this.textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Voice button click
        this.voiceBtn.addEventListener('click', () => this.toggleVoiceRecognition());
        
        // Mute button click
        this.muteBtn.addEventListener('click', () => this.toggleMute());
        
        // Input field changes
        this.textInput.addEventListener('input', () => {
            this.sendBtn.disabled = this.textInput.value.trim() === '';
        });
        
        // Stop speech when user starts typing
        this.textInput.addEventListener('focus', () => {
            if (this.synthesis.speaking) {
                this.synthesis.cancel();
            }
        });
    }
    
    sendMessage() {
        const message = this.textInput.value.trim();
        if (!message) return;
        
        // Add user message to chat
        this.addMessage(message, 'user');
        this.textInput.value = '';
        this.sendBtn.disabled = true;
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Generate and add bot response
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
            
            // Speak the response if not muted
            if (!this.isMuted) {
                this.speakText(response);
            }
        }, 800 + Math.random() * 1000); // Simulate thinking time
    }
    
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const icon = sender === 'bot' ? '🤖' : '👤';
        const iconClass = sender === 'bot' ? 'bot-icon' : 'user-icon';
        
        // Create elements safely to prevent XSS
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const iconSpan = document.createElement('span');
        iconSpan.className = iconClass;
        iconSpan.textContent = icon;
        
        const textDiv = document.createElement('div');
        textDiv.className = 'text';
        textDiv.textContent = text; // Use textContent to safely escape HTML
        
        messageContent.appendChild(iconSpan);
        messageContent.appendChild(textDiv);
        messageDiv.appendChild(messageContent);
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.id = 'typing-indicator';
        
        // Create elements safely to prevent XSS
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const iconSpan = document.createElement('span');
        iconSpan.className = 'bot-icon';
        iconSpan.textContent = '🤖';
        
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        
        // Create three dots for typing animation
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            typingIndicator.appendChild(dot);
        }
        
        messageContent.appendChild(iconSpan);
        messageContent.appendChild(typingIndicator);
        typingDiv.appendChild(messageContent);
        
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    generateResponse(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for greetings
        if (normalizedInput.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
            return "Hello! 👋 I'm excited to chat with you! You can ask me about my life story, superpowers, growth areas, misconceptions, or anything else you're curious about. What would you like to know?";
        }
        
        // Check for goodbye
        if (normalizedInput.match(/(bye|goodbye|see you|farewell|talk to you later)/)) {
            return "Goodbye! 😊 Thanks for chatting with me. Feel free to come back anytime if you have more questions. Have a wonderful day!";
        }
        
        // Check for thanks
        if (normalizedInput.match(/(thank|thanks|appreciate)/)) {
            return "You're very welcome! 😊 I'm glad I could help. Is there anything else you'd like to know about me?";
        }
        
        // Search for matching topics in personal data
        for (const [topic, answer] of Object.entries(this.personalData)) {
            if (normalizedInput.includes(topic) || this.containsTopicKeywords(normalizedInput, topic)) {
                return answer;
            }
        }
        
        // Check for specific question patterns
        if (normalizedInput.includes('who are you') || normalizedInput.includes('tell me about yourself')) {
            return this.personalData["life story"];
        }
        
        if (normalizedInput.includes('what can you do') || normalizedInput.includes('abilities')) {
            return this.personalData["superpowers"];
        }
        
        if (normalizedInput.includes('improve') || normalizedInput.includes('better') || normalizedInput.includes('weakness')) {
            return this.personalData["growth areas"];
        }
        
        if (normalizedInput.includes('wrong') || normalizedInput.includes('think') || normalizedInput.includes('assume')) {
            return this.personalData["misconceptions"];
        }
        
        // Default responses for unmatched queries
        const defaultResponses = [
            "That's an interesting question! While I don't have specific information about that topic, I'd love to tell you about my life story, superpowers, growth areas, or common misconceptions about me. What would you like to explore?",
            "I'm not sure I have detailed information on that specific topic, but I'm happy to share about my background, abilities, areas for improvement, or what drives me. What sounds most interesting to you?",
            "Great question! While that's not something I have prepared information about, I can tell you all about my journey, what makes me unique, my goals, or how I see myself growing. What would you like to hear about?",
            "I appreciate your curiosity! Although I don't have specific details on that topic, I'm excited to share about my personality, motivations, challenges, or achievements. Which of these interests you most?"
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    containsTopicKeywords(input, topic) {
        const topicKeywords = {
            "life story": ["background", "history", "story", "journey", "past", "bio", "biography"],
            "superpowers": ["power", "ability", "skill", "talent", "strength", "good at", "excel"],
            "growth areas": ["improve", "weakness", "challenge", "struggle", "develop", "work on", "better"],
            "misconceptions": ["wrong", "misunderstand", "think", "assume", "believe", "myth"],
            "motivation": ["drive", "motivate", "inspire", "reason", "why", "purpose"],
            "hobbies": ["hobby", "interest", "like", "enjoy", "fun", "leisure"],
            "personality": ["character", "trait", "like", "person", "nature"],
            "goals": ["goal", "aim", "objective", "target", "plan", "future"],
            "fears": ["fear", "worry", "concern", "afraid", "scare"],
            "achievements": ["achieve", "accomplish", "success", "proud", "victory"]
        };
        
        const keywords = topicKeywords[topic] || [];
        return keywords.some(keyword => input.includes(keyword));
    }
    
    speakText(text) {
        if (this.synthesis.speaking) {
            this.synthesis.cancel();
        }
        
        // Clean text for speech (remove emojis and formatting)
        const cleanText = text.replace(/[🤖👋😊🎯🧠🗣️💡🌍👂🎉]/g, '').replace(/\s+/g, ' ').trim();
        
        this.currentUtterance = new SpeechSynthesisUtterance(cleanText);
        this.currentUtterance.rate = 0.9;
        this.currentUtterance.pitch = 1;
        this.currentUtterance.volume = 0.8;
        
        // Try to use a pleasant voice
        const voices = this.synthesis.getVoices();
        const preferredVoice = voices.find(voice => 
            voice.name.includes('Google') || 
            voice.name.includes('Microsoft') || 
            voice.name.includes('Alex') || 
            voice.name.includes('Samantha')
        );
        
        if (preferredVoice) {
            this.currentUtterance.voice = preferredVoice;
        }
        
        this.currentUtterance.onstart = () => {
            this.showStatus('Speaking... 🗣️');
        };
        
        this.currentUtterance.onend = () => {
            this.showStatus('Ready to chat! 🎉');
        };
        
        this.currentUtterance.onerror = () => {
            this.showStatus('Speech error occurred', 'error');
        };
        
        this.synthesis.speak(this.currentUtterance);
    }
    
    toggleVoiceRecognition() {
        if (!this.recognition) {
            this.showStatus('Voice recognition not available', 'error');
            return;
        }
        
        if (this.isListening) {
            this.recognition.stop();
        } else {
            try {
                this.recognition.start();
            } catch (error) {
                this.showStatus('Unable to start voice recognition', 'error');
            }
        }
    }
    
    toggleMute() {
        this.isMuted = !this.isMuted;
        this.updateMuteButton();
        
        if (this.isMuted && this.synthesis.speaking) {
            this.synthesis.cancel();
        }
        
        this.showStatus(this.isMuted ? 'Voice output muted 🔇' : 'Voice output enabled 🔊');
    }
    
    updateVoiceButton() {
        if (this.isListening) {
            this.voiceBtn.classList.add('listening');
            this.voiceIcon.textContent = '🔴';
            this.voiceText.textContent = 'Listening...';
        } else {
            this.voiceBtn.classList.remove('listening');
            this.voiceIcon.textContent = '🎤';
            this.voiceText.textContent = 'Click to Speak';
        }
    }
    
    updateMuteButton() {
        if (this.isMuted) {
            this.muteBtn.classList.add('muted');
            this.muteIcon.textContent = '🔇';
        } else {
            this.muteBtn.classList.remove('muted');
            this.muteIcon.textContent = '🔊';
        }
    }
    
    showStatus(message, type = '') {
        this.status.textContent = message;
        this.status.className = `status ${type}`;
        
        // Clear status after 3 seconds for non-error messages
        if (type !== 'error') {
            setTimeout(() => {
                this.status.textContent = '';
                this.status.className = 'status';
            }, 3000);
        }
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new VoiceChatbot();
});

// Handle page visibility changes to pause speech when tab is not active
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
    } else if (!document.hidden && window.speechSynthesis && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
    }
});