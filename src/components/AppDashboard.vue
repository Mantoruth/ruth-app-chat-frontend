<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="dashboard-container">
    <div class="dashboard-content">
      <h1>WELCOME</h1>
      <p>You are successfully logged in!</p>
      <button @click="navigateToChat">Start Chatting</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppDashboard',
  methods: {
    navigateToChat() {
      this.$router.push('/chat'); 
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/images/dashboard.jpg"); /* Replace with your image path */
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white; /* Optional: Set text color for contrast */
}

.dashboard-content {
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
</style>