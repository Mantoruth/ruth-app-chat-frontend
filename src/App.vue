<template>
  <div id="app">
    <header>
      <nav aria-label="Main Navigation">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/chat">Chat</router-link></li>
          <li><router-link to="/login">Login</router-link></li>
          <li><router-link to="/register">Register</router-link></li>
          <li><router-link to="/about">About Us</router-link></li>
          <li><router-link to="/contacts">Contacts</router-link></li>
          <li><router-link to="/services">Services</router-link></li>
          <li><router-link to="/profile">Profile</router-link></li>
          <li><router-link to="/stories">Stories</router-link></li>
          <li><router-link to="/video-call">Video Call</router-link></li>
        </ul>
      </nav>
    </header>

    <main>
      <router-view @error="handleRouterError" />
    </main>

    <footer>
      <div class="footer-content">
        <p>&copy; 2024 My App. All rights reserved.</p>
        <nav aria-label="Footer Navigation">
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  </div>
</template>
<script>
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Define your routes here
  ]
})

const app = createApp({
  name: 'App',
  methods: {
    handleRouterError(error) {
      console.error('Router error:', error)
      // Display a meaningful error message or a fallback component
    }
  },
  created() {
    router.onError(this.handleRouterError)
  },
  mounted() {
    router.push('/')
  }
})

app.use(router)
app.mount('#app')
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