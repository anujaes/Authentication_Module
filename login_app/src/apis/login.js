export const login = async (username, password) => {
    try {
        const response = await fetch(`http://localhost:5000/user/login`, {
            method  : "POST",
            headers : { "Content-Type": "application/json" },
            body    : JSON.stringify({
                                        username: username,
                                        password: password
                                    })
        })

        const res = await response.json();

        if (res.message === "success")
            return { reply: 'succcess', status: true }
        else
            return { reply: 'invalid', status: true }
    }
    catch (error) {
        return { reply: error, status: false }
    }
}