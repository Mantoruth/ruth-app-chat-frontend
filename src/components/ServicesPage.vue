<template>
  <div class="services-container">
    <h1>Our Services</h1>
    <div class="service-card" v-for="service in services" :key="service.id">
      <h3>{{ service.title }}</h3>
      <p>{{ service.description }}</p>
      <button @click="learnMore(service.id)">Learn More</button>
    </div>
    <button @click="goToRegister" class="next-button">Register</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      services: [
        {
          id: 1,
          title: 'Video Conferencing',
          description:
            'Our advanced video conferencing solution allows you to connect with your team or clients from anywhere.',
        },
        {
          id: 2,
          title: 'Chat and Messaging',
          description:
            'Stay connected with your team and clients through our secure and reliable chat and messaging platform.',
        },
        {
          id: 3,
          title: 'File Sharing',
          description:
            'Easily share files and documents with your team or clients through our user-friendly file sharing feature.',
        },
      ],
    };
  },
  methods: {
    learnMore(serviceId) {
      console.log(`Learn more about service with ID: ${serviceId}`);
    },
    goToRegister() {
      this.$router.push('/register');
    },
  },
};
</script>

<style scoped>
.services-container {
  height: 100vh; /* Set container height to 100% of viewport height */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-image: url('@/assets/images/services.jpg'); /* Background image for the entire container */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: black; /* Change text color to black */
}

.service-card {
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent background for each card */
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  padding: 1rem;
  margin-bottom: 1rem;
  color: black; /* Change text color to black */
}

.service-card h3 {
  margin-top: 0;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.next-button {
  background-color: #2196F3;
  margin-top: 2rem;
}
</style>
