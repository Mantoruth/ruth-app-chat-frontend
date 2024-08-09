
<template>
  <div class="contacts-container">
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
      // Implement your message sending logic here
      // You can make an API call to your server and handle the response
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
  },
};
</script>

<style scoped>
.contacts-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1rem;
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
  height: 120px;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.success-message {
  color: green;
  margin-top: 1rem;
}

.error-message {
  color: red;
  margin-top: 1rem;
}
</style>