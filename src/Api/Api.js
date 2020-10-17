import axios from 'axios';

const Api = axios.create({
    baseURL: process.env.SERVER_URL || 'http://localhost:3000'
});


export default Api;