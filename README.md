# 🤖 Voice-Enabled Personal Chatbot

A modern, interactive voice-enabled chatbot web application that responds to questions about personal information like life story, superpowers, growth areas, misconceptions, and more. The bot is designed to be user-friendly for non-technical users and works entirely in a web browser.

![Voice Chatbot Interface](https://github.com/user-attachments/assets/a925f163-f30a-4be7-a999-5a30bfd685ff)

## ✨ Features

- **🎤 Voice Recognition**: Click-to-speak functionality using Web Speech API
- **🔊 Text-to-Speech**: Bot responses are spoken aloud (can be muted)
- **💬 Interactive Chat**: Clean, modern chat interface with typing indicators
- **📱 Responsive Design**: Works on desktop, tablet, and mobile devices
- **🎯 Personal Information**: Responds to questions about:
  - Life story and background
  - Superpowers and abilities
  - Growth areas and challenges
  - Common misconceptions
  - Motivations and goals
  - Hobbies and interests
  - Personality traits
  - Achievements and fears

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Running the Application

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sark465/voice-bot-chat.git
   cd voice-bot-chat
   ```

2. **Start a local web server:**
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Or using Python 2
   python -m SimpleHTTPServer 8000
   
   # Or using Node.js
   npx http-server
   ```

3. **Open your browser:**
   Navigate to `http://localhost:8000`

## 💡 How to Use

### Text Input
1. Type your question in the text input field
2. Click the send button (📤) or press Enter
3. The bot will respond with relevant personal information

### Voice Input
1. Click the "🎤 Click to Speak" button
2. Allow microphone permissions when prompted
3. Speak your question clearly
4. The bot will transcribe your speech and respond

### Sample Questions
Click on "💡 Sample Questions" to see examples like:
- "Tell me about your life story"
- "What are your superpowers?"
- "What are your growth areas?"
- "What misconceptions do people have about you?"
- "What motivates you?"
- "What are your hobbies?"

### Voice Controls
- **🎤 Voice Button**: Start/stop voice recognition
- **🔊 Mute Button**: Toggle text-to-speech on/off

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **Vanilla JavaScript**: No external dependencies
- **Web Speech API**: For voice recognition and synthesis
- **CSS Grid/Flexbox**: Responsive layout

### Browser Compatibility
- **Voice Recognition**: Chrome, Edge (best support)
- **Text-to-Speech**: All modern browsers
- **Chat Interface**: All modern browsers

### Security Features
- XSS protection through proper DOM manipulation
- Input sanitization and escaping
- No external API dependencies
- Client-side only operation

## 📁 File Structure

```
voice-bot-chat/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality
└── README.md           # Documentation
```

## 🎨 Customization

### Adding New Topics
Edit the `personalData` object in `script.js` to add new topics and responses:

```javascript
personalData = {
    "new topic": "Your response here...",
    // Add more topics as needed
};
```

### Styling Changes
Modify `styles.css` to customize:
- Color scheme (gradient backgrounds)
- Typography and fonts
- Layout and spacing
- Animation effects

### Voice Settings
Adjust voice parameters in `script.js`:

```javascript
this.currentUtterance.rate = 0.9;    // Speech rate
this.currentUtterance.pitch = 1;      // Voice pitch
this.currentUtterance.volume = 0.8;   // Volume level
```

## 🌐 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select source branch (main/master)
4. Your app will be available at `https://yourusername.github.io/voice-bot-chat`

### Netlify
1. Connect your GitHub repository to Netlify
2. Deploy automatically on every commit
3. Get a custom domain

### Vercel
1. Import your GitHub repository
2. Deploy with zero configuration
3. Automatic HTTPS and global CDN

## 🔧 Troubleshooting

### Voice Recognition Not Working
- Ensure you're using HTTPS or localhost
- Check microphone permissions
- Try Chrome or Edge browsers
- Check for microphone hardware issues

### Text-to-Speech Not Working
- Check browser compatibility
- Ensure volume is not muted
- Try refreshing the page
- Check system audio settings

### Mobile Issues
- Test microphone permissions on mobile
- Ensure stable internet connection
- Try different mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Web Speech API for voice capabilities
- Modern CSS features for styling
- Responsive design principles
- Accessibility best practices

---

**Built with ❤️ for making AI more accessible and conversational**
