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
        <button type="submit">Submit</button>
      </form>
      <div class="error-message" v-if="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    register() {
      // Implement your registration logic here
      // You can make an API call to your server and handle the response
      if (this.name && this.email && this.password) {
        // Successful registration, redirect to the login page or store the user data
        this.$router.push('/login');
      } else {
        this.error = 'Please fill in all the required fields.';
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  height: 100vh; /* Full height of the viewport */
  width: 100%; /* Full width of the viewport */
  background-image: url('@/assets/images/register.jpg'); /* Path to your background image */
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
  background: rgba(255, 255, 255, 0.8); /* Semi-transparent background for form readability */
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
