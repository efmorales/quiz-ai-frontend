import axios from "axios"

// require('dotenv').config();

const Axios = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
        "Content-type": "application/json"
    }
});

export default Axios;


// // require('dotenv').config();

// export const Axios = axios.create({
//     baseURL: process.env.REACT_APP_BASE_URL
// })

// export default Axios;