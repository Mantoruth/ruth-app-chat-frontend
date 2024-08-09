<template>
  <div class="chat-container">
    <div class="message-list">
      <div class="message" v-for="message in messages" :key="message.id">
        <div class="message-content">{{ message.content }}</div>
        <div class="message-sender">{{ message.sender }}</div>
      </div>
    </div>
    <div class="message-input">
      <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message..." />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        { id: 1, content: 'Hello!', sender: 'User A' },
        { id: 2, content: 'How are you?', sender: 'User B' },
        { id: 3, content: 'I\'m doing great, thanks for asking!', sender: 'User A' },
      ],
      newMessage: '',
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.messages.push({
          id: this.messages.length + 1,
          content: this.newMessage,
          sender: 'You',
        });
        this.newMessage = '';
      }
    },
  },
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.message-list {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
}

.message {
  margin-bottom: 0.5rem;
}

.message-content {
  background-color: #f1f1f1;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  display: inline-block;
}

.message-sender {
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.25rem;
}

.message-input {
  display: flex;
  padding: 1rem;
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
}
</style>