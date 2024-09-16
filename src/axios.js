import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
});

api.get('/socket.io/?EIO=4&transport=polling')
   .then(response => console.log(response))
   .catch(error => console.error(error));
