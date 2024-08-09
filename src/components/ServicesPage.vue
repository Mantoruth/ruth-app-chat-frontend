<template>
  <div class="services-container">
    <h1>Our Services</h1>
    <div class="service-card" v-for="service in services" :key="service.id">
      <h3>{{ service.title }}</h3>
      <p>{{ service.description }}</p>
      <button @click="learnMore(service.id)">Learn More</button>
    </div>
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
      // Implement the logic to navigate to a service-specific page or modal
      console.log(`Learn more about service with ID: ${serviceId}`);
    },
  },
};
</script>

<style scoped>
.services-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.service-card {
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  padding: 1rem;
  margin-bottom: 1rem;
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
</style>
  