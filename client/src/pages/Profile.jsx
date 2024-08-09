import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
//import {getAuth} from 'firebase/auth'

const Profile = () => {
  const {currentUser} = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePrec, setFilePrec] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  //console.log(formData);
  //console.log(filePrec);
  //console.log(fileUploadError);
  //console.log('User is authenticated:', getAuth().currentUser != null);

  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //console.log(' Upload is ' + progress + '% done');
        setFilePrec(Math.round(progress));
      },
      (error) => {
        console.error('Error during upload:'+ error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL)=>{
            setFormData({...formData, avatar: downloadURL});
          })
          .catch((error) => {
            console.error('Error getting download URL:', error);
          });
      }
    )
  }
  //console.log(file);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center m-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type='file' ref={fileRef} hidden accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/>
        <img 
          onClick={()=>fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full w-24 h-24 object-cover cursor-pointer self-center m-2'
        />
        <p className='text-sm text-center'>
        {  fileUploadError ? 
          <span className='text-red-700'>Error Image upload</span> :
          filePrec > 0 && filePrec < 100 ? (
            <span className='text-slate-700'>
              {`Uploading ${filePrec}%`}
            </span>
          ) : (
            filePrec === 100 ? (
              <span className='text-green-700'>
                Image successfully uploaded!
              </span>
            ) : ''
          )
        }
        </p>
        <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username'/>
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email'/>
        <input type='text' placeholder='password' className='border p-3 rounded-lg' id='password'/>
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile
