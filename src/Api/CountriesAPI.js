import axios from 'axios';

const CountriesAPI = axios.create({
    baseURL: `https://www.universal-tutorial.com/api`
});

CountriesAPI.defaults.headers.common['Authorization'] = `Bearer ${process.env.AUTH_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJ0aXR1c3ZpbWFscmFqQGdtYWlsLmNvbSIsImFwaV90b2tlbiI6IlNpbGVoYUtEa2poWVFqRjg1VlJFbG1oMnV3NV91SGV1c0s0TU1KYUdUYjZZNzlESjRyd3hma3hOU1V4WnBxdXVhcU0ifSwiZXhwIjoxNjAzMTg5ODU3fQ.pnuZU-C5WeXWalCAPjMX6T80aRQ3bXeJcba5pqJcll0'}`;

export default CountriesAPI;
