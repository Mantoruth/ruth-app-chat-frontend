<template>
  <div class="chat-container">
    <div class="background">
      <div class="message-list">
        <div class="message" v-for="message in messages" :key="message.id" :class="{ 'message-right': message.sender === currentUser }">
          <div :class="['message-content', message.sender === currentUser ? 'sent' : 'received']">
            <div v-if="message.type === 'text'">{{ message.content }}</div>
            <div v-if="message.type === 'audio'">
              <audio controls>
                <source :src="message.content" type="audio/wav">
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
          <div class="message-sender">{{ message.sender }}</div>
        </div>
      </div>
      <div class="message-input">
        <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message..." />
        <button @click="sendMessage">Send</button>
        <button @click="toggleEmojiPicker">😀</button>
        <button @click="startRecording" :disabled="isRecording">🎤</button>
        <button @click="stopRecording" :disabled="!isRecording">Stop</button>
      </div>
      <div v-if="showEmojiPicker" class="emoji-picker">
        <span v-for="emoji in emojis" :key="emoji" @click="addEmoji(emoji)">
          {{ emoji }}
        </span>
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
      emojis: ['😀', '😂', '😍', '😢', '😡', '😎', '😉', '🤔', '🙄', '🤫', '🥳', '🤩', '🥰', '😭', '😠', '😈', '😇', '💔', '❤️', '👍', '👎'],
      currentUser: 'User1',
    };
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
      if (this.newMessage.trim() === '') return;

      try {
        await axios.post('http://localhost:3000/messages', { 
          content: this.newMessage,
          type: 'text',
          sender: this.currentUser,
        });
        this.messages.push({
          id: this.messages.length + 1,
          content: this.newMessage,
          type: 'text',
          sender: this.currentUser,
        });
        this.newMessage = '';
        //this.fetchMessages(); // You might want to fetch again to update the list if needed
      } catch (error) {
        console.error('Error sending message:', error);
      }
    },
    async startRecording() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.ondataavailable = (event) => {
            this.audioChunks.push(event.data);
          };
          this.mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
            this.audioChunks = [];
            const audioUrl = URL.createObjectURL(audioBlob);
            await this.sendAudio(audioBlob);
            this.messages.push({
              id: this.messages.length + 1,
              content: audioUrl,
              type: 'audio',
              sender: this.currentUser,
            });
          };
          this.mediaRecorder.start();
          this.isRecording = true;
        } catch (err) {
          console.error('Error accessing microphone:', err);
        }
      }
    },
    stopRecording() {
      if (this.mediaRecorder) {
        this.mediaRecorder.stop();
        this.isRecording = false;
      }
    },
    async sendAudio(audioBlob) {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.wav');
      try {
        await axios.post('http://localhost:3000/messages', formData, { 
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          params: { sender: this.currentUser },
        });
        this.fetchMessages();
      } catch (error) {
        console.error('Error sending audio:', error);
      }
    },
    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
    },
    addEmoji(emoji) {
      this.newMessage += emoji;
      this.showEmojiPicker = false;
    }
  },
  created() {
    this.fetchMessages();
  }
};
</script>

<style scoped>
.chat-container {
  height: 100vh; /* Full height of the viewport */
  width: 100%; /* Full width of the viewport */
  background-image: url('@/assets/images/img1.jpg'); /* Path to your background image */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
}

.background {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.message-list {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.8); /* Semi-transparent background to improve readability */
}

.message {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: flex-start; /* Align items to the top */
}

.message-content {
  background-color: #f1f1f1;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  display: inline-block;
  max-width: 70%;
  word-wrap: break-word; /* Break long words */
  margin-right: 1rem; /* Add margin to the right for spacing */
}

.message-content.sent {
  background-color: #4CAF50; /* Different background color for sent messages */
  color: white;
  align-self: flex-end; /* Align to the right for sent messages */
}

.message-content.received {
  background-color: #e1e1e1; /* Different background color for received messages */
  align-self: flex-start; /* Align to the left for received messages */
}

.message-sender {
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.25rem;
}

.message-input {
  display: flex;
  padding: 1rem;
  align-items: center;
  background: rgba(255, 255, 255, 0.9); /* Semi-transparent background for input area */
}

.message-input input {
  flex-grow: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  margin-right: 1rem;
}

.message-input button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
  margin-right: 0.5rem;
}

.emoji-picker {
  position: absolute;
  border: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  margin-top: 5px;
}

.emoji-picker span {
  cursor: pointer;
  padding: 5px;
}

/* New Style for Right Alignment */
.message-right {
  flex-direction: row-reverse; /* Reverse the flex direction for right alignment */
}

.message-right .message-content {
  margin-left: 1rem; /* Add margin to the left for spacing */
  margin-right: 0; /* Remove right margin */
}
</style>