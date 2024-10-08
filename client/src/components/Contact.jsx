import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Contact = ({listing}) => {
  const [landlord, setLandlord] = useState(null);
  const [errorInfo, setErrorInfo] = useState(false);
  const [message, setMessage] = useState('');
  const {currentUser} = useSelector(state => state.user);
  useEffect(()=>{
    const fetchLandlord = async () => {
      try{
        setErrorInfo(false);
        const res = await fetch('/api/user/' + listing.userRef);
        const data = await res.json();
        setLandlord(data)

      }catch(err){
        setErrorInfo(err);
      }
    }
    fetchLandlord();

  },[listing.userRef]);
  const sendMsg = async () => {
    
    //console.log(message);
    //console.log(listing.userRef);
    //console.log(currentUser._id);
    //console.log(listing._id);
    const res = await fetch('/api/message/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'senderRef': currentUser._id,
        'receiverRef': listing.userRef,
        'content': message,
        'listingRef': listing._id
      })
    })
    const data = await res.json();
    console.log(data);
    setMessage('');
  }
  return (
    <>
      {
        landlord && (
          <div className='flex flex-col gap-2'>
            <p>Contact{' '}
              <span className='font-semibold'>{landlord.username}</span> 
              {' '}for{' '} 
              <span className='font-semibold'>{listing.name.toLowerCase()}</span>
            </p>
            <textarea 
              name='message' 
              id='message' 
              rows={2} 
              value={message} 
              onChange={(e)=>setMessage(e.target.value)}
              placeholder='Enter your message here...'
              className='w-full border p-3 rounded-lg'
            >

            </textarea>
            {/*<Link
              to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
              className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
            >
              Send Message
            </Link>*/}
            <button
              className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
              onClick={sendMsg}
            >
              Send Message
            </button>
          </div>
        )
      }
    </>
  )
}

export default Contact
