import axios from 'axios'

const BACKEND_URL = 'http://localhost:8000'


export async function authorizeUser() {
    const queryParams = document.location.search
    await axios.post(`${BACKEND_URL}/user/auth/`, {"url": queryParams}).then((resp) => {
        if (resp.status === 201) {
            return resp.data
        }
        return null
    });
}










