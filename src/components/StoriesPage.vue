<template>
    <div>
      <h2>Stories</h2>
      <form @submit.prevent="postStory">
        <textarea v-model="content" placeholder="What's on your mind?" required></textarea>
        <input type="file" @change="uploadStoryPicture" />
        <button type="submit">Post Story</button>
      </form>
      <div v-for="story in stories" :key="story.createdAt">
        <h3>{{ story.User.name }}</h3>
        <img :src="story.content" alt="Story" />
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        content: '',
        stories: []
      };
    },
    async created() {
      const response = await axios.get('http://localhost:3000/api/stories');
      this.stories = response.data;
    },
    methods: {
      async postStory() {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:3000/api/stories', {
          content: this.content
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.content = '';
        this.fetchStories();
      },
      async uploadStoryPicture(event) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:3000/api/upload/story-picture', formData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }
    }
  };
  </script>
  