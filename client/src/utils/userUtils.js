export const getUserById = async (id) => {
  const res = await fetch(`/api/user/chatUser/${id}`, {
    method: 'GET'
  });
  const data = await res.json();
  return data;
}