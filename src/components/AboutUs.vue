<template>
  <div class="about-us-container">
    <div class="background">
      <div class="content">
        <h1>About Us</h1>
        <p>Firstly i like to say I am a  passionate developer who created this amazing application.</p>
        <p>My goal is to provide a user-friendly and feature-rich platform for my users.</p>
        <p>Feel free to contact us if you have any questions or feedback Thankyou.</p>
        
        <button @click="goToContacts">Contact Us</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToContacts() {
      this.$router.push('/contacts');
    },
  },
};
</script>

<style scoped>
.about-us-container {
  height: 100vh; /* Full height of the viewport */
  width: 100%; /* Full width of the viewport */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
}

.background {
  height: 100vh; /* Full height of the viewport */
  width: 100%; /* Full width of the viewport */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white; /* Ensure text is readable on background */
}

.content {
  padding: 1rem;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background to improve text readability */
  border-radius: 8px; /* Rounded corners */
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
</style>
