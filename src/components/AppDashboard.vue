<template>
  <div class="dashboard-container">
    <div class="dashboard-content">
      <h1>Welcome</h1>
      <p>You are successfully logged in!</p>
      <p v-if="userName">Welcome, {{ userName }}!</p>
      <div class="button-group">
        <button @click="navigateToChat" class="btn">Start Chatting</button>
        <button @click="navigateToUserProfile" class="btn">Set Profile</button>
        <button @click="logout" class="btn btn-logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppDashboard',
  data() {
    return {
      userName: '', // Initialize userName
    };
  },
  created() {
    // Retrieve user data from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.userName = user.name; // Set the userName from stored data
    }
  },
  methods: {
    navigateToChat() {
      this.$router.push('/chat'); 
    },
    navigateToUserProfile() {
      this.$router.push('/UserProfile'); 
    },
    logout() {
      // Clear user data and navigate to login
      localStorage.removeItem('user');
      this.$router.push('/login'); // Redirect to login page
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
  color: white;
}

.dashboard-content {
  background-color: rgba(0, 0, 0, 0.7); /* Darker overlay for better contrast */
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

h1 {
  margin: 0 0 10px;
  font-size: 2rem;
}

p {
  margin: 10px 0;
}

.button-group {
  margin-top: 20px;
}

.btn {
  background-color: #4CAF50; /* Green */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 5px; /* Spacing between buttons */
}

.btn:hover {
  background-color: #45a049; /* Darker shade on hover */
}

.btn-logout {
  background-color: #f44336; /* Red for logout */
}

.btn-logout:hover {
  background-color: #e53935; /* Darker shade on hover */
}
</style>