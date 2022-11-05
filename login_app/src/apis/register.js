import axios from 'axios';

export const register = async function (userData) {
    try {
        const response = await axios.post(`http://localhost:5000/user/register`, userData)

        if (response.status === 201)
            return { reply: 'success', status: true };
    }
    catch (error) {
        if (error.response.status === 409)
            return { reply: 'exists', status: true };
        else if (error.response.status === 500)
            return { reply: 'server error', status: false };
        else
            return error;
    }
}