import axios from "axios"

const gymApi = axios.create(
    {
        baseURL: "http://localhost:3001/v1/api/",
    }
)
export default gymApi