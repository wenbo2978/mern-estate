export const getMessageListByUsers = async (userRef, userChatRef) => {
  const res = await fetch(`/api/message/getMessageList/${userChatRef}`, {
    method: 'GET',
  });
  const data = await res.json();
  return data;
}

export const getMessageById = async (id) => {
  const res = await fetch(`/api/message/getMessage/${id}`);
  const data = await res.json();
  return data;
}

export const sendMsg = async (senderRef, receiverRef, content) => {
  const res = await fetch('/api/message/add', {
    method: 'post',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      senderRef,
      receiverRef,
      content
    })

  })
  const data = await res.json();
  return data;

}