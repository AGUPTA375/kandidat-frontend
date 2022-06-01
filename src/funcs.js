import { Alert } from "react-native"

export function searchItems(input, data) {
    var result = []
    for (var ele of data) {
        if (ele.name.toLowerCase().includes(input.toLowerCase())) {
            result.push(ele)
        }
    }
    return result
}

export function searchWithCategory(category, data) {
    var result = []
    for (var ele of data) {
        if (ele.category == category) {
            result.push(ele)
        }
    }
    return result
}

export function checkIfPinned(pinnedProducts, product) {
    for (var prod of pinnedProducts) {
        if (prod.product_id === product.product_id) {
            return true
        }
    }

    return false
}

export function checkIsFollowing(following, user_id) {
    for (var usr of following) {
        if (usr.user_id === user_id) {
            return true
        }
    }
    return false
}

export function confirmDeleteProduct(deleteProduct, user_id, product_id, setRefreshing) {
    Alert.alert("Confirm deletion", "Are you sure you want to delete this product?", [
        {
            text: "No",
            style: "cancel"
        },
        {
            text: "Yes",
            onPress: () => {
                deleteProduct(user_id, product_id, setRefreshing)
            },
            style: "destructive"
        }
    ])
}