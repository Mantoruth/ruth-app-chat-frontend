<template>
  <div class="profile-container">
    <div class="profile-header">
      <img :src="user.profilePicture" alt="Profile Picture" class="profile-picture" />
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
      <p v-if="user.bio">{{ user.bio }}</p>
    </div>

    <div class="profile-edit-section">
      <h3>Edit Profile</h3>
      <form @submit.prevent="updateProfile">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="user.name" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="user.email" required />
        </div>
        <div class="form-group">
          <label for="bio">Bio</label>
          <textarea id="bio" v-model="user.bio" rows="3"></textarea>
        </div>
        <button type="submit" class="btn">Save Changes</button>
        <div class="error-message" v-if="error">{{ error }}</div>
        <div class="success-message" v-if="successMessage">{{ successMessage }}</div>
      </form>
    </div>

    <div class="account-settings-section">
      <h3>Account Settings</h3>
      <!-- Account settings options can go here -->
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
      error: '',
      successMessage: '',
    };
  },
  methods: {
    async updateProfile() {
      this.error = ''; // Reset error message
      this.successMessage = ''; // Reset success message

      try {
        const updatedProfile = {
          name: this.user.name,
          email: this.user.email,
          bio: this.user.bio,
        };

        const response = await this.$axios.put('/api/users/profile', updatedProfile);
        console.log('Profile updated successfully!', response.data);
        this.successMessage = 'Profile updated successfully!';
      } catch (error) {
        console.error('Error updating profile:', error);
        this.error = 'An error occurred while updating your profile. Please try again.';
      }
    },
  },
};
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.profile-header {
  text-align: center;
  margin-bottom: 2rem;
}

.profile-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

h2 {
  margin: 0.5rem 0;
  font-size: 1.5rem;
}

h3 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  color: #333;
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
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  resize: none; /* Prevent resizing */
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
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #45a049;
}

.error-message {
  color: red;
  margin-top: 1rem;
}

.success-message {
  color: green;
  margin-top: 1rem;
}
</style>