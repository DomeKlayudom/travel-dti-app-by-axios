import React from 'react'

// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Avatar from '@mui/material/Avatar';
// import TextField from '@mui/material/TextField';
import { Box, Typography, Avatar, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios'

import Travel from './../assets/travel.png'

function Login() {

  const navigator = useNavigate()

  const [travellerEmail, setTravellerEmail] = useState('');
  const [travellerPassword, setTravellerPassword] = useState('');

  const handleLoginClick = async (e) => {
    e.preventDefault();

    //validate ui
    if (travellerEmail.length == 0) {
      alert('ป้อนชื่อผู้ใช้ (อีเมล์) ด้วย !!!')
      return;
    } else if (travellerPassword.length == 0) {
      alert('ป้อนรหัสผ่าน ด้วย !!!')
      return;
    }

    //ส่งข้อมูลไปยัง API เพื่อตรวจสอบและไปยังหน้าถัดไป MyTravel (/mytravel)
    try {
      // const response = await fetch('http://localhost:4000/traveller/'+travellerEmail+'/'+travellerPassword,{
      
      // const response = await fetch(`http://localhost:4000/traveller/${travellerEmail}/${travellerPassword}`,{
      //   method: 'GET'
      // })

      const response = await axios.get(`https://travel-service-server-by-prisma-d8tx.vercel.app/traveller/${travellerEmail}/${travellerPassword}`)

      if (response.status == 200) {
        // window.location.href('/mytravel')
        //เอาข้อมูลของ Traveller ที่ Login ผ่านเก็บใส่ memory

        // const data = await response.json()
        // localStorage.setItem('traveller', JSON.stringify(data["data"]))

        localStorage.setItem('traveller', JSON.stringify(response.data["data"]))
        
        //แล้วค่อยเปิดไปหน้า /mytravel
        navigator('/mytravel')
      } else if (response.status == 404) {
        alert('ชื่อผู้ใช้รหัสผ่าน ไม่ถูกต้อง')
      } else {
        alert('Login ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง')
      }
    } catch (error) {
      alert('พบข้อผิดพลาดในการทำงาน: ', error)
    }
  }

  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center' }} >
      <Box sx={{ width: '40%', boxShadow: 4, mx: 'auto', p: 5 }}>
        <Typography variant='h3' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Travel DTI
        </Typography>
        <Avatar src={Travel} alt="travel logo"
          sx={{ width: 150, height: 150, mx: 'auto', my: 2 }} />
        <Typography variant='h5' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          เข้าใช้งานระบบ
        </Typography>
        <Typography sx={{ fontWeight: 'bold', mt: 4, mb: 1 }} >
          ชื่อผู้ใช้ (E-Mail)
        </Typography>
        <TextField fullWidth value={travellerEmail} onChange={(e) => setTravellerEmail(e.target.value)} />
        <Typography sx={{ fontWeight: 'bold', mt: 2, mb: 1 }} >
          รหัสผ่าน
        </Typography>
        <TextField fullWidth type='password' value={travellerPassword} onChange={(e) => setTravellerPassword(e.target.value)} />
        <Button variant="contained" fullWidth onClick={handleLoginClick}
          sx={{ mt: 4, py: 2, backgroundColor: '#259e69' }} >
          LOGIN
        </Button>

        <Link to='/register' style={{ textDecoration: 'none', color: '#259e69' }}>
          <Typography sx={{ fontWeight: 'bold', mt: 2, mb: 1, textAlign: 'center' }} >
            ลงทะเบียน
          </Typography>
        </Link>
      </Box>
    </Box>
  )
}

export default Login