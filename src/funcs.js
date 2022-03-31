import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

export function searchCommunities(input, data) {
    var result = []
    for (var community of data) {
        if (community.title.toLowerCase().includes(input.toLowerCase())) {
            result.push(community)
        }
    }
    return result
}