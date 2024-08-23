<template>
  <div class="home-container">
    <h1>Welcome to our App</h1>
    <p>Welcome to the home page of our application.</p>
    <button @click="goToAboutUs">Get Started</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToAboutUs() {
      this.$router.push('/about');
    },
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh; /* Full height of the viewport */
  width: 100%; /* Full width of the viewport */
  background-image: url('@/assets/images/img3.jpg'); /* Adjust the path to your background image */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
