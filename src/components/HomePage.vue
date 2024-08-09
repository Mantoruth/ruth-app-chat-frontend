<template>
  <div class="home-container">
    <h1>Welcome to our App</h1>
    <p>This is the home page of our application.</p>
    <button @click="navigateToChat">Go to Chat</button>
  </div>
</template>

<script>
export default {
  methods: {
    navigateToChat() {
      this.$router.push('/chat');
    },
  },
};
</script>

<style scoped>
.home-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
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