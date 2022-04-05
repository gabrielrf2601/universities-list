import axios from "axios";

const api = axios.create({
    baseURL: "https://api.meuguru.dev",
});

export default api;
