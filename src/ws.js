export function joinChannel(ws, SUUID, user_id, community_id) {
    var body = {
        "SUUID": SUUID,
        "user_id": user_id,
        "type": "channelJoin",
        "channelJoin": {
            "recipientUUID": community_id
        }
    }
    ws.send(JSON.stringify(body))
}

export function catchError(body) {
    if (body.type === 'error') {
        return body.error.error
    } else {
        return null
    }
}

export function channelJoined(body) {
    if (body.type === 'channelJoin') {
        return {
            messages: body.channelJoin.messages,
            users: body.channelJoin.users
        }
    }
}

export function receiveMessage(body) {
    
}