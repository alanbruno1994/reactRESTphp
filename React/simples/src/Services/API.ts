import axios from 'axios';
const api = axios.create({ 
    baseURL: 'http://localhost/ProjetoSimplesReactPHP/PHP/back_end_simples/' 
  })
  
  export default api;