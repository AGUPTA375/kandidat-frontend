
export function searchItems(input, data) {
    var result = []
    for (var ele of data) {
        if (ele.name.toLowerCase().includes(input.toLowerCase())) {
            result.push(ele)
        }
    }
    return result
}