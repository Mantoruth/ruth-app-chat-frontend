<template>
  <div class="video-call-container">
    <div class="video-streams">
      <div class="local-stream">
        <video ref="localVideo" autoplay muted></video>
        <p>You</p>
      </div>
      <div class="remote-stream">
        <video ref="remoteVideo" autoplay></video>
        <p>{{ remoteParticipantName }}</p>
      </div>
    </div>

    <div class="call-controls">
      <button @click="toggleMute">{{ isMuted ? 'Unmute' : 'Mute' }}</button>
      <button @click="endCall">End Call</button>
      <button @click="shareScreen">Share Screen</button>
    </div>

    <div class="chat-container">
      <div class="chat-messages">
        <div v-for="message in chatMessages" :key="message.id" :class="{'received': message.sender !== 'You', 'sent': message.sender === 'You'}">
          <strong>{{ message.sender }}:</strong> {{ message.content }}
        </div>
      </div>
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message..." />
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client';
import SimpleWebRTC from 'simplewebrtc';

export default {
  data() {
    return {
      webrtc: null,
      socket: null,
      remoteParticipantName: 'Remote User',
      isMuted: false,
      chatMessages: [],
      newMessage: '',
    };
  },
  mounted() {
    this.initializeVideoCall();
  },
  beforeUnmount() {
    this.cleanup();
  },
  methods: {
    async initializeVideoCall() {
      try {
        this.webrtc = new SimpleWebRTC({
          localVideoEl: this.$refs.localVideo,
          remoteVideosEl: this.$refs.remoteVideo,
          autoRequestMedia: true,
        });

        this.socket = io('http://localhost:3000'); // Adjust the server URL as needed

        this.webrtc.on('readyToCall', () => {
          console.log('WebRTC is ready to call');
          this.webrtc.joinRoom('default-room');
        });

        this.webrtc.on('localStream', (stream) => {
          console.log('Local stream added');
          this.$refs.localVideo.srcObject = stream;
        });

        this.webrtc.on('videoAdded', (video) => {
          console.log('Remote video added');
          if (video && video.srcObject) {
            this.$refs.remoteVideo.srcObject = video.srcObject;
          }
        });

        this.webrtc.on('videoRemoved', () => {
          console.log('Remote video removed');
          this.remoteParticipantName = 'Remote User';
        });

        this.socket.on('chatMessage', (sender, message) => {
          this.handleChatMessage(sender, message);
        });

      } catch (error) {
        console.error('Error initializing video call:', error);
        alert(`Error: ${error.message}`);
      }
    },
    toggleMute() {
      this.isMuted = !this.isMuted;
      if (this.webrtc) {
        this.webrtc.toggleMute(this.isMuted);
      }
    },
    endCall() {
      if (this.webrtc) {
        this.webrtc.leaveRoom();
        this.webrtc = null;
      }
      if (this.socket) {
        this.socket.disconnect();
        this.socket = null;
      }
      this.$router.push('/chat');
    },
    async shareScreen() {
      if (this.webrtc) {
        try {
          await this.webrtc.startScreenShare();
        } catch (error) {
          console.error('Error sharing screen:', error);
        }
      }
    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        if (this.socket) {
          this.socket.emit('chatMessage', 'You', this.newMessage);
          this.chatMessages.push({
            id: Date.now(),
            sender: 'You',
            content: this.newMessage,
          });
          this.newMessage = '';
        }
      }
    },
    handleChatMessage(sender, message) {
      this.chatMessages.push({
        id: Date.now(),
        sender,
        content: message,
      });
    },
    cleanup() {
      if (this.webrtc) {
        this.webrtc.leaveRoom();
        this.webrtc = null;
      }
      if (this.socket) {
        this.socket.disconnect();
        this.socket = null;
      }
    },
  },
};
</script>

<style scoped>
.video-call-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #1c1c1e;
  color: #f5f5f7;
  font-family: 'Roboto', sans-serif;
}

.video-streams {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.local-stream,
.remote-stream {
  position: relative;
  width: 50%;
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
  background-color: #2c2c2e;
  border-top: 1px solid #3a3a3c;
  padding: 20px;
}

.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 10px;
}

.chat-messages > div {
  margin-bottom: 5px;
  color: #f5f5f7;
}

.chat-messages .sent {
  text-align: right;
}

.chat-messages .received {
  text-align: left;
}

.chat-container input {
  background-color: #3a3a3c;
  color: #f5f5f7;
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  width: 100%;
}
</style>