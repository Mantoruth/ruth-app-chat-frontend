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
      email: '',
      password: '',
      error: '',
      successMessage: '',
    };
  },

  methods: {
    async login() {
      this.error = ''; // Reset error message
      this.successMessage = ''; // Reset success message

      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          email: this.email,
          password: this.password,
        });

        console.log('Login response:', response.data);

        if (response.data.success) {
          // Store user data in local storage
          localStorage.setItem('user', JSON.stringify(response.data.user));
          this.successMessage = 'Login successful! Redirecting...';
          setTimeout(() => {
            // Navigate to the dashboard
            this.$router.push('/AppDashboard').catch(err => console.error('Navigation error:', err));
          }, 1000); // Delay for user feedback
        } else {
          this.error = response.data.message || 'Invalid email or password';
        }
      } catch (error) {
        console.error('Login error:', error);
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
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049; /* Darker shade on hover */
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