import { Box, AppBar, Toolbar, IconButton, Typography, Button, Avatar } from '@mui/material'
import { Table, TableCell, TableContainer, TableHead, TableRow, Paper, TableBody } from '@mui/material'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { useEffect, useState, } from 'react';
import Profile from './../assets/profile.png'
import Place from './../assets/place.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import React from 'react'

function MyTravel() {
  const [travellerFullname, setTravellerFullname] = useState('')
  const [travellerImage, setTravellerImage] = useState('')
  const [travel, setTravel] = useState([])

  const navigator = useNavigate()

  useEffect(() => {
    //เอาข้อมูลใน memory มาแสดงที่ AppBar
    //อ่านข้อมูลจาก memory เก็บในตัวแปร
    const traveller = JSON.parse(localStorage.getItem('traveller'))
    //เอาข้อมูลในตัวแปรกำหนดให้กับ state ที่สร้างไว้
    setTravellerFullname(traveller.travellerFullname)
    setTravellerImage(traveller.travellerImage)

    //ดึงข้อมูลจาก DB ของ traveller ที่ login เข้ามา เพื่อนำมาแสดง
    const getAllTravel = async () => {
      // const resData = await fetch(`http://localhost:4000/travel/${traveller.travellerId}`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })

      const resData = await axios.get(`https://travel-service-server-by-prisma-dome-klayudoms-projects.vercel.app/travel/${traveller.travellerId}`)

      if (resData.status == 200) {
        // const data = await resData.json()
        // setTravel(data["data"])
        setTravel(resData.data["data"])
      }
    }
    getAllTravel()
  }, [])

  //ฟังก์ชันลบ
  const handleDeleteTravelClick = async (travelId)=>{
    try{
      // const response  = await fetch(`http://localhost:4000/travel/${travelId}`,{
      //   method: 'DELETE',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })

      const response  = await axios.delete(`https://travel-service-server-by-prisma-dome-klayudoms-projects.vercel.app/travel/${travelId}`)

      if(response.status === 200){
        alert('ลบข้อมูลเรียบร้อยแล้ว')
        navigator('/mytravel')
      }else{
        alert('ลบข้อมูลไม่สำเร็จ กรุณาลองใหม่')
      }
    }catch(error){
      alert('พบข้อผิดพลาดในการทำงาน: ', error)
    }
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <FlightTakeoffIcon sx={{ color: 'yellow' }} />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                บันทึกการเดินทาง
              </Typography>
              <Link to={'/editprofile'} style={{ color: 'white' }}>
                <Button color="inherit">
                  {travellerFullname}
                </Button>
              </Link>
              <Avatar src={travellerImage == '' ? Profile : `${travellerImage}`} />
              <Link to={'/'} style={{ color: 'red', textDecoration: 'none', marginLeft: '10px', fontWeight: 'bold' }}>
                LOG OUT
              </Link>
            </Toolbar>
          </AppBar>
        </Box>

        <Box sx={{ width: '70%', boxShadow: 4, mx: 'auto', p: 5, my: 4 }}>
          <Typography variant="h4" component="div" sx={{ textAlign: 'center', mb: 4 }}>
            การเดินทางของฉัน
          </Typography>

          {/* แสดงตารางข้อมูลการเดินทางของ Traveller */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#aaaaaa' }}>
                  <TableCell align="center">No.</TableCell>
                  <TableCell align="center">สถานที่ไป</TableCell>
                  <TableCell align="center">รูป</TableCell>
                  <TableCell align="center">วันที่ไป</TableCell>
                  <TableCell align="center">วันที่กลับ</TableCell>
                  <TableCell align="center">ค่าใช้จ่ายทั้งหมด</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {travel.map((row, index) => (
                  <TableRow
                    key={index}                    
                    sx={{ '&:last-child td, &:last-child th': { border: 0 },
                        backgroundColor: index % 2 == 0 ? 'white' : 'pink'
                    }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="left">{row.travelPlace}</TableCell>
                    <TableCell align="center">
                      <Avatar src={row.travelImage == '' ? Place : `${row.travelImage}`}
                              sx={{width: 60, height: 60, boxShadow:3}}
                              variant='rounded'
                      />
                    </TableCell>
                    <TableCell align="left">{row.travelStartDate}</TableCell>
                    <TableCell align="left">{row.travelEndDate}</TableCell>
                    <TableCell align="right">{row.travelCostTotal}</TableCell>
                    <TableCell align="center">
                      <Button component={Link} to={`/editmytravel/${row.travelId}`}>แก้ไข</Button>
                      <Button onClick={()=>handleDeleteTravelClick(row.travelId)}>ลบ</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* ----------------------------------- */}

          <Link to={'/addmytravel'} style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
            <Button fullWidth variant="contained" sx={{ py: 2, mt: 4 }}>
              เพิ่มการเดินทาง
            </Button>
          </Link>

        </Box>
      </Box >
    </>
  )
}

export default MyTravel