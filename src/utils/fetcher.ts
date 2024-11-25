import axios from 'axios';

const api = axios.create({
  baseURL: '/',
});

const fetcher = (url: string) => api.get(url).then((res) => res.data);
export default fetcher;
