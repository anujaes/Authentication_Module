
export function setSession(which, data) {

    if (data.rememberSession)
        localStorage.setItem(which, JSON.stringify(data))

    setCurrentSession(which,data)
}

export function setCurrentSession(which, data) {
    sessionStorage.setItem(which, JSON.stringify(data))
}

export function getLocalSession(which) {
    return JSON.parse(localStorage.getItem(which))
}

export function getSession(which) {
    return JSON.parse(sessionStorage.getItem(which))
}

export function deleteSession(which) {
    localStorage.removeItem(which);
    sessionStorage.removeItem(which)
}