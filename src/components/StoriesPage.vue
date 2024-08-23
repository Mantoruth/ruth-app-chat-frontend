<template>
  <div>
    <h2>Stories</h2>
    <form @submit.prevent="postStory">
      <textarea v-model="content" placeholder="What's on your mind?" required></textarea>
      <input type="file" @change="uploadStoryPicture" />
      <button type="submit">Post Story</button>
    </form>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    <div v-if="stories.length > 0">
      <div v-for="story in stories" :key="story.id">
        <h3>{{ story.User.name }}</h3>
        <img :src="story.content" alt="Story" />
      </div>
    </div>
    <div v-else>
      <p>No stories to display.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      content: '',
      stories: [],
      errorMessage: null,
      successMessage: null,
    };
  },
  mounted() {
    this.fetchStories();
  },
  methods: {
    async postStory() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3000/api/stories', {
          content: this.content,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Post story response:', response.data);
        this.content = '';
        this.successMessage = 'Story posted successfully!';
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
        await this.fetchStories();
      } catch (error) {
        console.error('Error posting story:', error);
        this.errorMessage = 'Error posting story. Please try again.';
        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
      }
    },
    async uploadStoryPicture(event) {
      try {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:3000/api/upload/story-picture', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        this.successMessage = 'Story picture uploaded successfully!';
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      } catch (error) {
        console.error('Error uploading story picture:', error);
        this.errorMessage = 'Error uploading story picture. Please try again.';
        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
      }
    },
    async fetchStories() {
      try {
        const response = await axios.get('http://localhost:3000/api/stories');
        this.stories = response.data;
      } catch (error) {
        console.error('Error fetching stories:', error);
        this.errorMessage = 'Error fetching stories. Please try again later.';
        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
      }
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  font-weight: bold;
  margin-top: 1rem;
}

.success-message {
  color: green;
  font-weight: bold;
  margin-top: 1rem;
}
</style>