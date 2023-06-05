import axios from "axios";

// Exemplo:  https://viacep.com.br/ws/88113478/json

const api = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
});

export default api;