import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess
} from '../redux/user/userSlice.js'
import { useDispatch } from 'react-redux';


const Profile = () => {
  const {currentUser, loading, error} = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePrec, setFilePrec] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const[updateSuccess, setUpdateSuccess] = useState(false);
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
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  const handleSubmit = async (e)=> {
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    }catch(err){
      dispatch(updateUserFailure(err.message));
    }
  }
  //console.log(formData);
  const handleDeleteUser = async () => {
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: "DELETE"
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    }catch(err){
      dispatch(deleteUserFailure(err.message));
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center m-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
        <input 
          type='text' 
          placeholder='username' 
          className='border p-3 rounded-lg' 
          id='username'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input 
          type='email' 
          placeholder='email' 
          className='border p-3 rounded-lg' 
          id='email'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input 
          type='text' 
          placeholder='password' 
          className='border p-3 rounded-lg' 
          id='password'
          onChange={handleChange}
        />
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          {
            loading ? 'loading...' : 'update'
          }
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span 
          className='text-red-700 cursor-pointer'
          onClick={handleDeleteUser}  
        >Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5 text-center'>
        {
          error ? error : ''
        }
      </p>
      <p className='text-green-700 mt-5 text-center'>
        {
          updateSuccess ? 'User update successfully!' : ''
        }
      </p>
    </div>
  )
}

export default Profile
