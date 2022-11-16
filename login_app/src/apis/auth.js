import axios from "axios";

export const authentication = async (data) => {
    try {
        const response = await axios.post('http://localhost:5000/user/auth',data)
        if (response.status === 201)
            return { reply: 'success', status: true, userData: response.data.userData }
    }
    catch (error) {
        if (error.response.status === 400)
            return { reply: 'unautherised_user', status: true }

        if (error.response.status === 500)
            return { reply: 'server_error', status: false }
    }
}
