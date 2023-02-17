import axios from "axios"

const gymApi = axios.create(
    {
        // baseURL: "https://basegym.onrender.com/v1/api/",
        baseURL: "http://localhost:3001/v1/api/",
    }
)
export default gymApi