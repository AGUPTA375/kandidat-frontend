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

export function getUsersProducts(id, setProducts) {
    return fetch(`http://localhost:8080/users/${id}/products`).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then((data) => {
        data[0] === 200 ? setProducts(data[1]) : setProducts(null)
    })
}

export function getUsersProductsMulti(id, setProducts, products) {
    return fetch(`http://localhost:8080/users/${id}/products`).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then((data) => {
        data[0] === 200 ? setProducts() : setProducts(null)
    })
}

export function getFollowingUsersProducts(user_id, setProducts) {
    return fetch(`http://localhost:8080/users/${user_id}/followingProducts`).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then((data) => {
        data[0] === 200 ? setProducts(data[1]) : setProducts(null)
    })
}

export function getNotUsersProducts(id, setProducts) {
    return fetch(`http://localhost:8080/users/${id}/products?owned=false`).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then((data) => {
        data[0] === 200 ? setProducts(data[1]) : setProducts(null)
    })
}

export function getUserInfo(id) {
    return fetch(`http://localhost:8080/users/${id}`).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    })
}

export function fetchUserInfo(userID, setUser) {
    return fetch(`http://localhost:8080/users/${userID}`).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then((data) => {
        if (data[0] === 200) {
            setUser(data[1])
        }
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

export function fetchAllProducts(setProducts) {
    return fetch(`http://localhost:8080/products`).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then((data) => {
        if (data[0] === 200) {
            setProducts(data[1])
        }
    })
}

export function postProduct(userID, body) {
    return fetch(`http://localhost:8080/users/${userID}/products`, {
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

export function pinProduct(body, user_id) {
    return fetch(`http://localhost:8080/users/${user_id}/pinned`, {
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

export function postReview(user_id, body) {
    return fetch(`http://localhost:8080/users/${user_id}/reviews`, {
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

export function unpinProduct(product_id, user_id) {
    return fetch(`http://localhost:8080/users/${user_id}/pinned/${product_id}`, {
        method: "DELETE",
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    })
}

export function getPinnedProducts(user_id, setPinnedProducts) {
    return fetch(`http://localhost:8080/users/${user_id}/pinned`).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then((data) => {
        if (data[0] === 200) {
            setPinnedProducts(data[1])
        }
    })
}

export function getUsersReviews(user_id, setReviews) {
    return fetch(`http://localhost:8080/users/${user_id}/reviews`).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then((data) => {
        if (data[0] === 200) {
            setReviews(data[1])
        }
    })
}

export function getUserIsFollowing(user_id, setFollowing) {
    return fetch(`http://localhost:8080/users/${user_id}/following`).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then((data) => {
        if (data[0] === 200) {
            console.log(data)
            setFollowing(data[1])
        }
    })
}

export function getUserFollowers(user_id, setFollowers) {
    return fetch(`http://localhost:8080/users/${user_id}/followers`).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then((data) => {
        if (data[0] === 200) {
            setFollowers(data[1])
        }
    })
}

export function createFollow(user_id, body) {
    return fetch(`http://localhost:8080/users/${user_id}/followers`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then((data) =>
    console.log(data)
    )
}