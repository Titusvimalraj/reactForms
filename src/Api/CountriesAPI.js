import axios from 'axios';

const CountriesAPI = axios.create({
    baseURL: `https://www.universal-tutorial.com/api`
});

CountriesAPI.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJ0aXR1c3ZpbWFscmFqQGdtYWlsLmNvbSIsImFwaV90b2tlbiI6IlNpbGVoYUtEa2poWVFqRjg1VlJFbG1oMnV3NV91SGV1c0s0TU1KYUdUYjZZNzlESjRyd3hma3hOU1V4WnBxdXVhcU0ifSwiZXhwIjoxNjAyOTgxMTIwfQ.ynn5GdalQSf-TSfR2AVS0fpONZnqGkAQhVhHV4EWdMs';

export default CountriesAPI;