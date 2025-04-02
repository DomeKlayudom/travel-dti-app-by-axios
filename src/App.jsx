//App.jsx จะใช้ในการกำหนดเส้นทาง (Route)
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './views/Login.jsx'
import Register from './views/Register.jsx'
import MyTravel from './views/MyTravel.jsx'
import EditProfile from './views/EditProfile.jsx'
import AddMyTravel from './views/AddMyTravel.jsx'
import EditMyTravel from './views/EditMyTravel.jsx'
import { CssBaseline } from '@mui/material'

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mytravel" element={<MyTravel />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/addmytravel" element={<AddMyTravel />} />
          <Route path="/editmytravel/:travelId" element={<EditMyTravel />} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
