<template>
  <div class="login-container">
    <div class="form-wrapper">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <div class="error-message" v-if="error">{{ error }}</div>
      <div class="success-message" v-if="successMessage">{{ successMessage }}</div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '', // Initialize as empty string
      password: '', // Initialize as empty string
      error: '', // Initialize as empty string
      successMessage: '', // Initialize as empty string
    };
  },

  methods: {
    async login() {
      console.log('Login button clicked');
      console.log('Email:', this.email);
      console.log('Password:', this.password);

      try {
        const response = await axios.post('http://localhost:3000/api/login', {
          email: this.email,
          password: this.password,
        });

        console.log('Login response:', response.data); // Add this line

        if (response.data.success) {
          this.successMessage = 'Login successful!';
          console.log('Navigating to dashboard');
          this.$router.push('/AppDashboard').catch(err => console.error('Navigation error:', err));
        } else {
          this.error = response.data.message || 'Invalid email or password';
        }
      } catch (error) {
        console.error('Login error:', error); // Add this line
        this.error = 'An error occurred. Please try again.';
      }
    },
  },
};
</script>
<style scoped>
.login-container {
  height: 100vh;
  width: 100%;
  background-image: url('@/assets/images/login.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-wrapper {
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.9);
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.error-message {
  color: red;
  margin-top: 1rem;
}

.success-message {
  color: green;
  font-size: 1em;
  margin-top: 10px;
}
</style>
