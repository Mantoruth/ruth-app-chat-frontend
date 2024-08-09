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
      <button @click="toggleMute">
        {{ isMuted ? 'Unmute' : 'Mute' }}
      </button>
      <button @click="endCall">End Call</button>
      <button @click="shareScreen">Share Screen</button>
    </div>

    <div class="chat-container">
      <div class="chat-messages">
        <div v-for="message in chatMessages" :key="message.id">
          <strong>{{ message.sender }}:</strong> {{ message.content }}
        </div>
      </div>
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message..." />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rtcClient: null,
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
    this.rtcClient.disconnect();
  },
  methods: {
    initializeVideoCall() {
      this.rtcClient = new RtcClient();
      this.rtcClient.on('remoteStream', this.handleRemoteStream);
      this.rtcClient.on('participantJoined', this.handleParticipantJoined);
      this.rtcClient.on('participantLeft', this.handleParticipantLeft);
      this.rtcClient.on('chatMessage', this.handleChatMessage);
      this.rtcClient.initialize(this.$refs.localVideo);
    },
    toggleMute() {
      this.isMuted = !this.isMuted;
      this.rtcClient.toggleMute(this.isMuted);
    },
    endCall() {
      this.rtcClient.disconnect();
      // Navigate away from the video call component
    },
    shareScreen() {
      this.rtcClient.shareScreen();
    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.rtcClient.sendChatMessage(this.newMessage);
        this.chatMessages.push({
          id: Date.now(),
          sender: 'You',
          content: this.newMessage,
        });
        this.newMessage = '';
      }
    },
    handleRemoteStream(stream) {
      this.$refs.remoteVideo.srcObject = stream;
    },
    handleParticipantJoined(participantName) {
      this.remoteParticipantName = participantName;
    },
    handleParticipantLeft() {
      this.remoteParticipantName = 'Remote User';
    },
    handleChatMessage(sender, message) {
      this.chatMessages.push({
        id: Date.now(),
        sender,
        content: message,
      });
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
}

.chat-container input {
  background-color: #3a3a3c;
  color: #f5f5f7;
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
}
</style>