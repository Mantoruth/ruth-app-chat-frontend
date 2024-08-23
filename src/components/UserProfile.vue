<template>
  <div class="profile-container">
    <div class="profile-header">
      <img :src="user.profilePicture" alt="Profile Picture" class="profile-picture" />
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
    </div>

    <div class="profile-edit-section">
      <h3>Edit Profile</h3>
      <form @submit.prevent="updateProfile">
        <!-- Form fields for editing profile information -->
        <button type="submit">Save Changes</button>
      </form>
    </div>

    <div class="account-settings-section">
      <h3>Account Settings</h3>
      <!-- Account settings options -->
    </div>

    <div class="activity-history-section">
      <h3>Activity History</h3>
      <!-- Display user's recent activities -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        profilePicture: 'https://via.placeholder.com/150',
        name: 'John Doe',
        email: 'johndoe@example.com',
        bio: '',
      },
    };
  },
  methods: {
    updateProfile() {
      // Implement logic to update the user's profile
      // For example, you could make an API call to your server to save the changes
      const updatedProfile = {
        name: this.name,
        email: this.email,
        bio: this.bio,
      };

      // Make the API call to update the user's profile
      this.$axios.put('/api/users/profile', updatedProfile)
        .then((response) => {
          console.log('Profile updated successfully!', response.data);
          // You can also display a success message to the user
        })
        .catch((error) => {
          console.error('Error updating profile:', error);
          // You can also display an error message to the user
        });
    },
  },
};
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
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
  border-radius: 4px;
  font-size: 1rem;
}

.btn {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.btn:hover {
  background-color: #45a049;
}
</style>