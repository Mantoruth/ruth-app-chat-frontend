<template>
  <div id="app">
    <header v-if="!hideHeaderFooter">
      <nav aria-label="Main Navigation">
        <div class="nav-wrapper">
          <img src="@/assets/images/logo.png" alt="Logo" class="logo" />
          <ul class="nav-list">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/about">About Us</router-link></li>
            <li><router-link to="/contacts">Contacts</router-link></li>
            <li><router-link to="/services">Services</router-link></li>
          </ul>
        </div>
      </nav>
    </header>

    <main>
      <router-view />
      <div class="messages-container">
        <ul>
          <li v-for="message in messages" :key="message.id">
            <strong>User {{ message.userId }}:</strong> {{ message.text }}
          </li>
        </ul>
      </div>
    </main>

    <footer v-if="!hideHeaderFooter">
      <div class="footer-content">
        <p>&copy; 2024 RUTH-APP. All rights reserved.</p>
        <nav aria-label="Footer Navigation">
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Our Contacts</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  </div>
</template>

<script>
import { io } from 'socket.io-client'; // Import Socket.io client

export default {
  computed: {
    hideHeaderFooter() {
      return this.$route.meta.hideHeaderFooter;
    },
  },
  data() {
    return {
      socket: null,
      messages: [], // To hold received messages
    };
  },
  mounted() {
    this.initSocket();
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.off('newMessage'); // Clean up specific event
      this.socket.disconnect();
    }
  },
  methods: {
    initSocket() {
      const serverUrl = process.env.VUE_APP_SOCKET_URL || 'http://localhost:3000';
      this.socket = io(serverUrl, {
        transports: ['websocket', 'polling'], // Prefer WebSocket, fallback to polling
      });

      this.socket.on('connect', () => {
        console.log('Socket.io connection established.');
      });

      this.socket.on('newMessage', (message) => {
        console.log('New message received:', message);
        this.messages.push(message);
      });

      this.socket.on('disconnect', () => {
        console.log('Socket.io connection closed.');
      });

      this.socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        // Consider using a notification library instead of alert
        alert('Connection error! Please check your network or server status.'); 
      });
    },
  },
};
</script>

<style>
/* Global styles */
:root {
  --main-bg-color: #333;
  --text-color: #fff;
  --link-hover-color: #ddd;
  --spacing: 1rem;
}
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: var(--main-bg-color);
  color: var(--text-color);
  padding: var(--spacing);
}

.nav-wrapper {
  display: flex;
  align-items: center;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

nav li {
  margin-right: var(--spacing);
}

nav a {
  color: var(--text-color);
  text-decoration: none;
}
nav a:hover {
  color: var(--link-hover-color);
}

.logo {
  height: 40px;
  margin-right: 2rem;
}

main {
  flex-grow: 1;
  padding: 2rem;
}

.messages-container {
  margin-top: 2rem;
}

footer {
  background-color:var(--main-bg-color);
  color: var(--text-color);
  padding:var(--spacing);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-content nav ul {
  display: flex;
}

.footer-content nav li {
  margin-left: var(--spacing);
}

.footer-content a {
  color:var(--text-color);
  text-decoration: none;
}
.footer-content a:hover {
  color: var(--link-hover-color);
}

/* Responsive styles */
@media (max-width: 600px) {
  .nav-list {
    flex-direction: column;
  }
  .footer-content {
    flex-direction: column;
    align-items: center;
  }
}
</style>