export function getUsersCommunities(id) {
    return fetch(`http://localhost:8080/users/${id}/communities`).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    })
}

export function getUserInfo(id) {
    return fetch(`http://localhost:8080/users/${id}`).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    })
}