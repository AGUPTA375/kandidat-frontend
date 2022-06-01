export function joinChannelMakeBody (user_id, recipientUUID) {
  const body = {
    user_id,
    type: 'channelJoin',
    SUUID: user_id,
    channelJoin: {
      recipientID: recipientUUID
    }
  }
  return JSON.stringify(body)
}

export function joinCommunityMakeBody (user_id, community) {
  const body = {
    user_id,
    type: 'channelJoin',
    channelJoin: {
      recipientUUID: community
    }
  }
  return JSON.stringify(body)
}

export function catchError (body) {
  if (body.type === 'error') {
    return body.error.error
  } else {
    return null
  }
}

export function stringifyBody (message, user_id, recipientID) {
  const body = {
    user_id,
    type: 'channelMessage',
    SUUID: user_id,
    channelMessage: {
      recipientUUID: recipientID,
      message
    }
  }

  return JSON.stringify(body)
}

export function readMessages (user_id, recipientID) {
  const body = {
    user_id,
    type: 'channelMessages',
    SUUID: user_id,
    channelMessages: {
      recipientUUID: recipientID,
      offset: 0,
      limit: 100
    }
  }

  return JSON.stringify(body)
}
