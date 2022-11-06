import axios from "axios";

export const login = async (data) => {
    try {
        const response = await axios.post(`http://localhost:5000/user/login`, data)

        if (response.status === 201)
            return { reply: 'success', status: true, userData: response.data.userData }
    }
    catch (error) {
        if (error.response.status === 401)
            return { reply: 'invalid', status: true }

        if (error.response.status === 500)
            return { reply: 'server_error', status: false }
    }
}