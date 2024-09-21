import React, { useEffect, useState } from 'react'
import MessageItem from './MessageItem';
import ChatUser from './ChatUser';
import { useSelector } from 'react-redux';
import { getUserById } from '../utils/userUtils';
import { getMessageListByUsers, sendMsg } from '../utils/messageUtils';

const ChatBox = () => {
  const [chatList, setChatList] = useState([]);
  const [boxMessage, setBoxMessage] = useState('');
  const [currentChatUser, setCurrentChatUser] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [currentMsg , setCurrentMsg] = useState('');
  const {currentUser} = useSelector(state => state.user);

  useEffect(() => {
    const getChatUserList = async ()=> {
      //console.log(currentUser);
      const res = await fetch(`/api/message/getUserChatList/${currentUser._id}`);
      const data = await res.json();
      setChatList(data);
      const firstUser = await getUserById(data[0].userChatRef);
      setBoxMessage(firstUser.username);
      setCurrentChatUser(firstUser._id);
      await getMessageList(data[0].userChatRef);
    }
    getChatUserList();
  }, []);

  const getMessageList = async (userChatRef) => {
    //console.log(currentUser._id, userChatRef);
    const msgData = await getMessageListByUsers(currentUser._id, userChatRef);
    //console.log(msgData.messageArray);
    setMessageList(msgData.messageArray);
  }
  const sendMessage = async () => {
    const msg = await sendMsg(currentUser._id, currentChatUser, currentMsg);
    setMessageList([...messageList, msg._id]);
    setCurrentMsg('');
  }
  const userChatButton = async (id) => {
    const User = await getUserById(id);
    setBoxMessage(User.username);
    setCurrentChatUser(User._id);
    await getMessageList(id, currentUser._id);
  }
  return (
    <div className='flex flex-row absolute top-0 bottom-0 right-0 left-0'>
      <div className='w-1/3 max-w-[200px] flex flex-col border-r-2 h-full overflow-auto scrollbar-none'>
        {
          chatList.map((chat, index) => 
            <button 
              key={index}
              className='p-3 hover:bg-slate-200'
              value={chat.userChatRef}
              //onClick={(ev) => setBoxMessage(ev.target.value)}
              onClick={(ev) => userChatButton(ev.currentTarget.value)}
            ><ChatUser UserId={chat.userChatRef}/></button>)
        }
      </div>
      <div className='flex-1 flex flex-col'>
        <div className='h-10 bg-slate-200'>
          <p className='text-center p-2 text-slate-800'>{boxMessage}</p>
        </div>
        <div className='h-2/3 bg-slate-50 p-2 flex flex-col gap-2 flex-grow-0 overflow-y-auto scrollbar-thin'>
          {
            messageList && messageList.length > 0 && (
              messageList.map((msg, _) => 
                <MessageItem key={msg} messageId={msg} currrentUserId={currentUser._id}/>
              )
            ) 
          }
        </div>
        <div className='flex-1 bg-slate-100 border-t-4 flex flex-col'>
          <textarea 
            className='flex-1 border-none resize-none focus:outline-none p-2 rounded-md'
            value={currentMsg}
            onChange={(ev) => setCurrentMsg(ev.target.value)}
          />
          <button 
            className='p-1 bg-blue-300 hover:bg-blue-400'
            onClick={sendMessage}
          >Send</button>
        </div>
      </div>
    </div>
  )
}

export default ChatBox
