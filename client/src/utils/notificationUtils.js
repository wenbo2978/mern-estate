export const generateNotification = async (userRef, listingRef, action) => {
  try{
    //console.log(userRef);
    //console.log(listingRef);
    //console.log(action);
    const res = await fetch('/api/notification/generateNotification', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        userRef,
        listingRef,
        action
      })
    })
    //console.log(res);
  }catch(err){
    console.log(err);
  }
}

export const getNotification = async (id) => {
  const res = await fetch(`/api/notification/getNotification/${id}`);
  const data = await res.json();
  console.log(data);
  return data;
}