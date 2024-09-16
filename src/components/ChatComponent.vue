<template>
  <div class="chat-container">
    <!-- Contacts Button Area -->
    <div class="contacts-button">
      <button @click="navigateToContacts1" class="btn btn-contacts">Contacts</button>
    </div>

    <!-- Chat Area -->
    <div class="chat-area">
      <div v-if="isScreenSharing" class="shared-screen">
        <img :src="screenShareContent" alt="Shared Screen">
      </div>
      <div class="message-list">
        <div 
          class="message" 
          v-for="message in filteredMessages" 
          :key="message.id" 
          :class="{ 'message-right': message.sender === currentUser }"
        >
          <div :class="['message-content', message.sender === currentUser ? 'sent' : 'received']">
            <div v-if="message.type === 'text'">{{ message.content }}</div>
            <div v-if="message.type === 'audio'">
              <audio controls>
                <source :src="message.content" type="audio/wav">
                Your browser does not support the audio element.
              </audio>
            </div>
            <div v-if="message.type === 'video'">
              <video controls>
                <source :src="message.content" type="video/mp4">
                Your browser does not support the video element.
              </video>
            </div>
            <div v-if="message.type === 'screen'">
              <img :src="message.content" alt="Shared Screen">
            </div>
            <div v-if="message.type === 'sticker'">
              <img :src="message.content" alt="Sticker" class="sticker">
            </div>
          </div>
          <div class="message-sender">{{ message.sender }}</div>
        </div>
      </div>
      <div class="message-input">
        <input 
          type="text" 
          v-model="newMessage" 
          @keyup.enter="sendMessage" 
          placeholder="Type your message here..." 
        />
        <button @click="sendMessage" class="btn btn-send">Send</button>
        <button @click="toggleEmojiPicker" class="btn btn-emoji">😀</button>
        <button @click="startRecording" :disabled="isRecording" class="btn btn-record">🎤</button>
        <button @click="stopRecording" :disabled="!isRecording" class="btn btn-stop">Stop</button>
        <button @click="toggleVideoCall" class="btn btn-video">{{ isVideoCall ? 'End Video Call' : 'Start Video Call' }}</button>
        <button @click="toggleScreenShare" class="btn btn-screen">{{ isScreenSharing ? 'Stop Sharing' : 'Start Sharing' }}</button>
        <button @click="showStickerPicker" class="btn btn-sticker">Stickers</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      messages: [],
      newMessage: '',
      isRecording: false,
      mediaRecorder: null,
      audioChunks: [],
      showEmojiPicker: false,
      showStickerPicker: false,
      emojis: ['😀', '😂', '😍', '😢', '😡', '😎', '😉', '🤔', '🙄', '🤫', '🥳', '🤩', '🥰', '😭', '😠', '😈', '😇', '💔', '❤️', '👍', '👎', '🎨', '📹', '📺',
                '😃', '😄', '😁', '😆', '😅', '😂', '☺️', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓',
                '😎', '🤩', '🥳', '😏', '😒', '😞', '😟', '😔', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱',
                '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷',
                '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🤲', '👐', '🙌', '👏', '🤝', '👍', '👎', '👊'],
      allEmojis: ['😀', '😃', '😄', /* and so on, up to 300 emojis */],
      currentUser: 'bella',
      isVideoCall: false,
      isScreenSharing: false,
      screenShareContent: '', 
    };
  },
  computed: {
    filteredMessages() {
      // Filter messages to show only those sent by the current user
      return this.messages.filter(message =>
       message.sender === this.currentUser || message.reciever === this.currentUser);
    }
  },
  methods: {
  async fetchMessages() {
    try {
      const response = await axios.get('http://localhost:3000/messages'); 
      this.messages = response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  },

  async sendMessage() {
    const messageData = {
      text: this.newMessage.trim(), // Use actual input and trim whitespace
      content: "Your message content here" // Replace with actual content if needed
    };

    try {
      const response = await axios.post('http://localhost:3000/messages', messageData, {
        params: { sender: this.currentUser },
      });
      
      // Add the message to the local messages array
      this.messages.push({
        id: response.data.newMessage.id, // Assuming the server returns the new message ID
        text: messageData.text,
        content: messageData.content,
        createdAt: new Date().toISOString(),
        sender: this.currentUser,
      });
      
      // Clear the input field
      this.newMessage = '';
    } catch (error) {
      console.error('Error sending message:', error.response ? error.response.data : error.message);
    }
  },
  async startRecording() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = []; // Initialize audio chunks

            this.mediaRecorder.ondataavailable = (event) => {
                this.audioChunks.push(event.data);
            };

            this.mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                this.audioChunks = []; // Reset audio chunks after recording

                await this.sendAudio(audioBlob); // Send audio after recording stops
            };

            this.mediaRecorder.start();
            this.isRecording = true;
        } catch (err) {
            console.error('Error accessing microphone:', err);
        }
    } else {
        console.error('getUserMedia not supported in this browser.');
    }
},
async stopRecording() {
      if (this.mediaRecorder && this.isRecording) {
        this.mediaRecorder.stop();
        this.isRecording = false;
      }
    },
async sendAudio(audioBlob) {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');

    // Use current newMessage or default text
    const text = this.newMessage.trim(); // Trimmed user input
    const content = "Audio message content"; // Customize as needed

    // Log the values to the console
    console.log('Current newMessage:', this.newMessage);
    console.log('Sending audio with text:', text);
    console.log('Sending audio with content:', content);
   
    if (!content) {
    // Optional: Use default text or handle missing text case
    console.error('content is required but empty');
    return; // Prevent sending if content is missing
  }
    
    // Append text and content to the form data
    formData.append('text', text);
    formData.append('content', content);

    try {
        const response = await axios.post('http://localhost:3000/messages', formData, { 
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            params: { sender: this.currentUser },
        });
        
        const audioUrl = URL.createObjectURL(audioBlob);
        this.messages.push({
            id: response.data.newMessage.id, // Assuming the server returns the new message ID
            text: text,
            content: audioUrl,
            type: 'audio',
            createdAt: new Date().toISOString(),
            sender: this.currentUser,
        });

        // Optionally refetch messages to sync with server
        this.fetchMessages(); 
    } catch (error) {
        console.error('Error sending audio:', error.response ? error.response.data : error.message);
    }
},
 
toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  },

  addEmoji(emoji) {
    this.newMessage += emoji;
    this.showEmojiPicker = false;
  },

  toggleVideoCall() {
    this.isVideoCall = !this.isVideoCall;
    if (this.isVideoCall) {
      this.$router.push('/video-call');
    } else {
      this.$router.push('/'); // Navigate when ending the call
    }
  },

  toggleScreenShare() {
    this.isScreenSharing = !this.isScreenSharing;
    if (this.isScreenSharing) {
      this.screenShareContent = 'path/to/screen-share-content.png'; // Update with actual content
    } else {
      this.screenShareContent = '';
    }
  },

  showAllEmojis() {
    console.log('Showing all emojis');
  },

  sendSticker(stickerUrl) {
    this.messages.push({
      id: this.messages.length + 1,
      content: stickerUrl,
      type: 'sticker',
      sender: this.currentUser,
    });
    this.showStickerPicker = false;
  },
  navigateToContacts1() {
    this.$router.push('/contacts1'); 
  }
},

  created() {
    this.fetchMessages();
  }
};
</script>
<style scoped>
.video-call-container {
  display: flex;
  height: 100vh;
  background-color: #1c1c1e;
  color: #f5f5f7;
  font-family: 'Roboto', sans-serif;
}

.video-streams {
  display: flex;
  flex: 1; /* Takes half of the width */
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.local-stream,
.remote-stream {
  position: relative;
  width: 50%; /* Each stream takes half of the video area */
  height: 100%;
  background-color: #2c2c2e;
  border-radius: 8px;
  overflow: hidden;
}

.local-stream video,
.remote-stream video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.local-stream p,
.remote-stream p {
  position: absolute;
  bottom: 10px;
  left: 10px;
  margin: 0;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  font-size: 14px;
}

.call-controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

.call-controls button {
  background-color: #3a3a3c;
  color: #f5f5f7;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.call-controls button:hover {
  background-color: #48484a;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin-left: 220px; /* Leave space for contacts button */
  overflow-y: auto; /* Allows scrolling if content exceeds height */
}

.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.shared-screen {
  position: relative;
  width: 100%;
  max-height: 300px;
  margin-bottom: 10px;
}

.shared-screen img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.message-list {
  flex: 1;
  display: flex;
  overflow-y: auto;
  flex-direction: column-reverse; /* Display latest messages at the bottom */
  padding: 10px;
  margin-top: 10px;
}

.message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  justify-content: flex-end; /* Align messages to the right by default */
}
.message.user {
    background-color: #f0f0f0;
    text-align: right; /* Align user messages to the right */
}
.message.other {
    background-color: #e0e0e0;
    text-align: left; /* Align other messages to the left */
}

.message.received {
  justify-content: flex-start; /* Align received messages to the left */
}

.message-content {
  max-width: 70%;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  word-break: break-word;
}

.message-content.sent {
  background-color: #0084ff;
  color: #fff;
}

.message-content.received {
  background-color: #e5e5ea;
  color: #000;
}

.message-sender {
  font-size: 12px;
  color: #888;
  text-align: right;
}

.message-input {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #ddd;
}

.message-input input {
  flex: 1;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ddd;
  margin-right: 10px;
}

.message-input button {
  margin-left: 5px;
}

.btn {
  background: #0084ff;
  border: none;
  color: white;
  padding: 10px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
}

.btn:hover {
  background: #0073e6;
}

.btn-send { background: #007bff; }
.btn-send:hover { background: #0056b3; }
.btn-emoji, .btn-record, .btn-stop, .btn-video, .btn-screen, .btn-sticker, .btn-contacts {
  background: #17a2b8;
}
.btn-emoji:hover, .btn-record:hover, .btn-stop:hover, .btn-video:hover, .btn-screen:hover, .btn-sticker:hover, .btn-contacts:hover {
  background: #138496;
}

.contacts-button {
  width: 100px; /* Set a fixed width for the contacts area */
  background-color: #f5f5f5; /* Match background with chat area */
  display: flex;
  justify-content: center;
  align-items: center;
}

.contacts-button .btn {
  position: absolute; /* Position it absolutely */
  top: 10px; /* Distance from the top */
  left: 10px; /* Distance from the left */
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.emoji-picker, .sticker-picker {
  position: absolute;
  bottom: 60px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 10;
}

.emoji-picker span {
  font-size: 20px;
  cursor: pointer;
  margin: 5px;
}

.sticker-picker .sticker-image {
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin: 5px;
}

.sticker-picker .sticker-image:hover {
  opacity: 0.8;
}

</style>