import axios from "axios";

const Axios = axios.create({
    baseURL: import.meta.env.VITE_AXIOS === 'development' ? 'http://localhost:4000/api' : '/api',
    headers: {
        "Content-type": "application/json"
    }
});

export default Axios;


// export const Axios = axios.create({
//     baseURL: import.meta.env.REACT_APP_AXIOS === 'development' ? 'htttp://localhost:4000/api' : '/api',
// })
