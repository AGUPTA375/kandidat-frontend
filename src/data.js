import { Alert } from 'react-native'

const url = 'http://13.51.193.82:5000'

export function getUsersCommunities (id) {
  return fetch(`${url}/users/${id}/communities`).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  })
}

export function getNotUsersCommunities (id) {
  return fetch(`${url}/users/${id}/communities?joined=false`).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  })
}

export function getUsersProducts (id, setProducts) {
  return fetch(`${url}/users/${id}/products`).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  }).then((data) => {
    data[0] === 200 ? setProducts(data[1]) : setProducts(null)
  })
}

export function getFollowingUsersProducts (user_id, setProducts) {
  return fetch(`${url}/users/${user_id}/following/products`).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  }).then((data) => {
    data[0] === 200 ? setProducts(data[1]) : setProducts(null)
  })
}

export function getNotUsersProducts (id, setProducts) {
  return fetch(`${url}/users/${id}/products?owned=false`).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  }).then((data) => {
    data[0] === 200 ? setProducts(data[1]) : setProducts(null)
  })
}

export function getUserInfo (id) {
  return fetch(`${url}/users/${id}`).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  })
}

export function fetchUserInfo (userID, setUser) {
  return fetch(`${url}/users/${userID}`).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  }).then((data) => {
    if (data[0] === 200) {
      setUser(data[1])
    }
  })
}

export function login (body) {
  return fetch(`${url}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  })
}

export function signup (body) {
  return fetch(`${url}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  })
}

export function joinCommunity (userid, body) {
  return fetch(`${url}/users/${userid}/communities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  })
}

export function fetchProduct (productID, setProduct) {
  return fetch(`${url}/products/${productID}`).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  }).then((data) => {
    if (data[0] === 200) {
      setProduct(data[1])
    }
  })
}

export function fetchAllProducts (setProducts) {
  return fetch(`${url}/products`).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  }).then((data) => {
    if (data[0] === 200) {
      setProducts(data[1])
    }
  })
}

export function postProduct (userID, body) {
  return fetch(`${url}/users/${userID}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  })
}

export function pinProduct (body, user_id) {
  return fetch(`${url}/users/${user_id}/pinned`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  })
}

export function postReview (user_id, body) {
  return fetch(`${url}/users/${user_id}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  })
}

export function unpinProduct (product_id, user_id) {
  return fetch(`${url}/users/${user_id}/pinned/${product_id}`, {
    method: 'DELETE'
  }).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  })
}

export function getPinnedProducts (user_id, setPinnedProducts) {
  return fetch(`${url}/users/${user_id}/pinned`).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  }).then((data) => {
    if (data[0] === 200) {
      setPinnedProducts(data[1])
    }
  })
}

export function getUsersReviews (user_id, setReviews) {
  return fetch(`${url}/users/${user_id}/reviews`).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  }).then((data) => {
    if (data[0] === 200) {
      setReviews(data[1])
    }
  })
}

export function getUserIsFollowing (user_id, setFollowing) {
  return fetch(`${url}/users/${user_id}/following`).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  }).then((data) => {
    if (data[0] === 200) {
      data[1] === null ? setFollowing([]) : setFollowing(data[1])
    }
  })
}

export function getUserFollowers (user_id, setFollowers) {
  return fetch(`${url}/users/${user_id}/followers`).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  }).then((data) => {
    if (data[0] === 200) {
      data[1] === null ? setFollowers([]) : setFollowers(data[1])
    }
  })
}

export function createFollow (user_id, body) {
  return fetch(`${url}/users/${user_id}/followers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  })
}

export function updateUser (user_id, body) {
  return fetch(`${url}/users/${user_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  })
}

export function updateProduct (product_id, body, setUpdatedProduct) {
  return fetch(`${url}/products/${product_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  }).then((data) => {
    if (data[0] === 201) {
      setUpdatedProduct(data[1])
    } else {
      Alert.alert('Error', data[1], [{ text: 'OK' }])
    }
  })
}

export function getAllUsers (setUsers) {
  return fetch(`${url}/users`).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  }).then((data) => {
    if (data[0] === 200) {
      setUsers(data[1])
    }
  })
}

export function getChattingUsers (user_id, setUsers) {
  return fetch(`${url}/users/${user_id}/chats`).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  }).then((data) => {
    if (data[0] === 200) {
      if (data[1] === null) {
        setUsers([])
      } else {
        setUsers(data[1])
      }
    }
  })
}

export function makeChatRelation (user_id, body) {
  return fetch(`${url}/users/${user_id}/chats`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => {
    const statusCode = response.status
    const data = response.json()
    return Promise.all([statusCode, data])
  })
}

export function deleteProduct (user_id, product_id, setRefreshing) {
  return fetch(`${url}/users/${user_id}/products/${product_id}`, {
    method: 'DELETE'
  }).then((response) => {
    const statusCode = response.status
    return Promise.all([statusCode])
  }).then((data) => {
    if (data[0] === 204) {
      setRefreshing(true)
    }
  })
}
