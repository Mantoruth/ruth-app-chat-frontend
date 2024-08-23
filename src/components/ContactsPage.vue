<template>
  <div class="contact-container">
    <div class="background">
      <div class="content">
        <h1>Contact Us</h1>
        <form @submit.prevent="sendMessage">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="name" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" v-model="message" required></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
        <div class="success-message" v-if="success">Your message has been sent successfully!</div>
        <div class="error-message" v-if="error">{{ error }}</div>
        <button @click="goToServices" class="services-button">Go to Services</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      message: '',
      success: false,
      error: '',
    };
  },
  methods: {
    sendMessage() {
      if (this.name && this.email && this.message) {
        this.success = true;
        this.error = '';
        // Reset the form fields
        this.name = '';
        this.email = '';
        this.message = '';
      } else {
        this.success = false;
        this.error = 'Please fill in all the required fields.';
      }
    },
    goToServices() {
      this.$router.push('/services');
    },
  },
};
</script>

<style scoped>
.contacts-container {
  height: 100vh; /* Full height of the viewport */
  width: 100%; /* Full width of the viewport */
  display: flex;
  justify-content: center;
  align-items: center;
}

.background {
  background-image: url('../assets/images/contactus.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh; /* Full height of the viewport */
  width: 100%; /* Full width of the viewport */
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  max-width: 1000px;
  padding: 5rem;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background to improve text readability */
  border-radius: 100px; /* Rounded corners */
  color: white; /* Ensure text is readable on background */
}

.form-group {
  margin-bottom: 2rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

textarea {
  height: 60px;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-top: 1rem;
}

.success-message {
  color: green;
  margin-top: 1rem;
}

.error-message {
  color: red;
  margin-top: 1rem;
}

.services-button {
  background-color: #2196F3;
  color: white;
  margin-top: 2rem;
  border-radius: 0.25rem;
}
</style>

