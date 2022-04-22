export function getUsersCommunities(id) {
    return fetch(`http://localhost:8080/users/${id}/communities`).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    })
}

export function getNotUsersCommunities(id) {
    return fetch(`http://localhost:8080/users/${id}/communities?joined=false`).then((response) => {
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

export function login(body) {
    return fetch(`http://localhost:8080/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    })
}

export function signup(body) {
    return fetch(`http://localhost:8080/users`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    })
}

export function joinCommunity(userid, body) {
    return fetch(`http://localhost:8080/users/${userid}/communities`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    })
}

export function fetchProduct(productID, setProduct) {
    return fetch(`http://localhost:8080/products/${productID}`).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then((data) => {
        if (data[0] === 200) {
            setProduct(data[1])
        }
    })
}