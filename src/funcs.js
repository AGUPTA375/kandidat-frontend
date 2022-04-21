
export function searchCommunities(input, data) {
    var result = []
    for (var community of data) {
        if (community.Name.toLowerCase().includes(input.toLowerCase())) {
            result.push(community)
        }
    }
    return result
}