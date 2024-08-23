<template>
    <div>
      <button @click="startRecording" :disabled="isRecording">Start Recording</button>
      <button @click="stopRecording" :disabled="!isRecording">Stop Recording</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isRecording: false,
        mediaRecorder: null,
        audioChunks: [],
      };
    },
    methods: {
      async startRecording() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.ondataavailable = (event) => {
              this.audioChunks.push(event.data);
            };
            this.mediaRecorder.onstop = () => {
              const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
              const audioUrl = URL.createObjectURL(audioBlob);
              this.audioChunks = [];
              this.sendAudio(audioBlob);
            };
            this.mediaRecorder.start();
            this.isRecording = true;
          } catch (err) {
            console.error('Error accessing microphone:', err);
          }
        }
      },
      stopRecording() {
        if (this.mediaRecorder) {
          this.mediaRecorder.stop();
          this.isRecording = false;
        }
      },
      async sendAudio(audioBlob) {
        // Implement sending audio to the server
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.wav');
  
        try {
          await axios.post('http://localhost:3000/api/messages', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } catch (error) {
          console.error('Error sending audio:', error);
        }
      }
    }
  };
  </script>
  