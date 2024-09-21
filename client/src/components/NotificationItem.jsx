import React from 'react'

export default function NotificationItem({info}) {
  return (
    <div className='border bg-white rounded-md p-2 px-4 cursor-pointer hover:shadow-md'>
      <div className='flex flex-row gap-3 items-center'>
        <img 
          src='https://sm.ign.com/ign_ap/cover/a/avatar-gen/avatar-generations_hugw.jpg'
          className='w-12 h-12 rounded-full'
        />
        <p>{info.user}</p>
      </div>
      <div className='mt-3'>
        <p>
          {
            info.content
          }
        </p>
        <p>
          Click me go to the page
        </p>
      </div>
    </div>
  )
}
