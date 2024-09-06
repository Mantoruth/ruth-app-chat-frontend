<template>
  <div class="register-container">
    <div class="form-wrapper">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" :disabled="isSubmitting">Submit</button><br><br>
      </form>
      <div class="error-message" v-if="error">{{ error }}</div>
      <button @click="goToLogin">Go to Login</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: '',
      isSubmitting: false,
    };
  },
  methods: {
    async register() {
      if (this.name && this.email && this.password) {
        this.isSubmitting = true;
        try {
          const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/auth/register`, {
            name: this.name,
            email: this.email,
            password: this.password,
          });

          if (response.data.success) {
            this.$router.push('/login');
          } else {
            this.error = response.data.message || 'Registration failed.';
          }
        } catch (error) {
          console.error('Registration error:', error);
          this.error = 'An error occurred while registering. Please try again.';
        }
      } else {
        this.error = 'Please fill in all the required fields.';
      }
    },
    goToLogin() {
      this.$router.push('/login');
    }
  },
};
</script>

<style scoped>
.register-container {
  height: 100vh; /* Full height of the viewport */
  width: 100%; /* Full width of the viewport */
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
  background: rgba(255, 255, 255, 0.8); /* Semi-transparent background */
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
</style>
