
export function setSession(which,data) {
    localStorage.setItem(which,JSON.stringify(data))
}

export function getSession(which) {
    return JSON.parse(localStorage.getItem(which))
}