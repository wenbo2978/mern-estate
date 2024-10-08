import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp  from './pages/SignUp'
import Profile from './pages/Profile'
import About from './pages/About'
import Headers from './components/Headers'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'
import Search from './pages/Search'
import Message from './pages/Message'

function App() {

  return (
    <BrowserRouter>
      <Headers/>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/create-listing' element={<CreateListing/>}/>
          <Route path='/update-listing/:id' element={<UpdateListing/>}/>
          <Route path='/message' element={<Message/>}/>
        </Route>
        
        <Route path='/about' element={<About/>}/>
        <Route path='/listing/:id' element={<Listing/>}/>
        <Route path='/search' element={<Search/>}/>
  
      </Routes>
    </BrowserRouter>
  )
}

export default App
