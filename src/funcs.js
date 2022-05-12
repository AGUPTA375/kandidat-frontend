
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