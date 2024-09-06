<template>
  <div id="app">
    <header>
      <nav aria-label="Main Navigation">
        <ul>
          <li><img src="@/assets/images/logo.png" alt="Logo" class="logo" /></li>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About Us</router-link></li>
          <li><router-link to="/contacts">Contacts</router-link></li>
          <li><router-link to="/services">Services</router-link></li>
          <li><router-link to="/chat">Chat</router-link></li>
        </ul>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer>
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
  data() {
    return {
      socket: null,
    };
  },
  mounted() {
    this.initSocket();
  },
  methods: {
    initSocket() {
      // Connect to the Socket.io server
      this.socket = io('http://localhost:3000'); // Adjust the port if needed

      this.socket.on('connect', () => {
        console.log('Socket.io connection established.');
      });

      this.socket.on('newMessage', (message) => {
        console.log('New message received:', message);
        // Here you can update your UI with the new message
      });

      this.socket.on('disconnect', () => {
        console.log('Socket.io connection closed.');
      });
    },
  },
};
</script>
<style>
/* Global styles */
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
  background-color: #333;
  color: #fff;
  padding: 1rem;
}

nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

nav li {
  margin-right: 1rem;
}

nav a {
  color: #fff;
  text-decoration: none;
}

.logo {
  height: 40px;
  margin-right: 2rem;
}

main {
  flex-grow: 1;
  padding: 2rem;
}

footer {
  background-color: #333;
  color: #fff;
  padding: 1rem;
  text-align: center;
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
  margin-left: 1rem;
}

.footer-content a {
  color: #fff;
  text-decoration: none;
}
</style>
