import { Box, AppBar, Toolbar, IconButton, Typography, Button, Avatar, TextField } from '@mui/material'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { useEffect, useState } from 'react';
import Profile from './../assets/profile.png'
import { Link } from 'react-router-dom'
import Travel from './../assets/travel.png'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles'
import Place from './../assets/place.png'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditMyTravel() {
  const [travellerFullname, setTravellerFullname] = useState('')
  const [travellerImage, setTravellerImage] = useState('')

  const [travelImage, setTravelImage] = useState('')
  const [travelNewImage, setTravelNewImage] = useState(null)


  const [travelPlace, setTravelPlace] = useState('')
  const [travelStartDate, setTravelStartDate] = useState('')
  const [travelEndDate, setTravelEndDate] = useState('')
  const [travelCostTotal, setTravelCostTotal] = useState('')
  const [travellerId, setTravellerId] = useState('')

  const {travelId} = useParams()
  const navigator = useNavigate()

  useEffect(() => {
    //เอาข้อมูลใน memory มาแสดงที่ AppBar
    //อ่านข้อมูลจาก memory เก็บในตัวแปร
    const traveller = JSON.parse(localStorage.getItem('traveller'))
    //เอาข้อมูลในตัวแปรกำหนดให้กับ state ที่สร้างไว้
    setTravellerFullname(traveller.travellerFullname)
    setTravellerImage(traveller.travellerImage)
    setTravellerId(traveller.travellerId)

    const getTravel = async ()=>{
      // const resData = await fetch(`http://localhost:4000/travel/one/${travelId}`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })

      const resData = await axios.get(`https://travel-service-server-by-prisma-d8tx.vercel.app/travel/one/${travelId}`)

      // const data = await resData.json()
      // setTravelPlace(data["data"].travelPlace)
      // setTravelStartDate(data["data"].travelStartDate)
      // setTravelEndDate(data["data"].travelEndDate)
      // setTravelCostTotal(data["data"].travelCostTotal)
      // setTravelImage(data["data"].travelImage)

      setTravelPlace(resData.data["data"].travelPlace)
      setTravelStartDate(resData.data["data"].travelStartDate)
      setTravelEndDate(resData.data["data"].travelEndDate)
      setTravelCostTotal(resData.data["data"].travelCostTotal)
      setTravelImage(resData.data["data"].travelImage)
    }
    getTravel()
  }, [])

  const handleSelectFileClick = (e) => {
    const file = e.target.files[0]

    if (file) {
      setTravelNewImage(file)
    }
  }

  const SelectFileBt = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  })

  const handelUpdateTravelClick = async (e) =>{
    e.preventDefault();

   //Validate UI แล้วค่อยส่งข้อมูลไปให้ API ทีฝั่ง Back-end
    if( travelPlace.trim().length == 0){
      alert('ป้อนสถานที่ไปด้วย')
    }else if( travelStartDate.trim().length == 0){
      alert('ป้อนวันที่ไปด้วย')
    }else if( travelEndDate.trim().length == 0){
      alert('ป้อนวันที่กลับด้วย')
    }else if( travelCostTotal.length == 0){
      alert('ป้อนค่าใช้จ่ายด้วยด้วย')
    }else{
      //ส่งข้อมูลไปให้ API บันทึงลง DB แล้ว redirect ไปหน้า Login
      //เอาข้อมูลเก็บใส่ FormData
      const formData = new FormData()
      
      formData.append('travelPlace',travelPlace)
      formData.append('travelStartDate',travelStartDate)
      formData.append('travelEndDate',travelEndDate)
      formData.append('travelCostTotal',travelCostTotal)
      formData.append('travellerId',travellerId)

      if(travelNewImage){
        formData.append('travelImage',travelNewImage)
      } 

      try{
        // const response = await fetch(`http://localhost:4000/travel/${travelId}`,{
        //   method: 'PUT',
        //   body: formData,
        // })

        const response = await axios.put(`https://travel-service-server-by-prisma-d8tx.vercel.app/travel/${travelId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        if( response.status == 200){
          alert('แก้ไขการเดินทางสำเร็จ')
          navigator('/mytravel')
          // window.location.href('/mytravel')
        }else{
          alert('แก้ไขการเดินไม่สำเร็จ กรุณาลองใหม่อีกครั้ง')
        }

      }catch(error){
        alert('พบข้อผิดพลาดในการทำงาน: ', error)
      }
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
              <Button color="inherit">
                {travellerFullname}
              </Button>
              <Avatar src={travellerImage == '' ? Profile : `${travellerImage}`} />
              <Link to={'/'} style={{ color: 'red', textDecoration: 'none', marginLeft: '10px', fontWeight: 'bold' }}>
                LOG OUT
              </Link>
            </Toolbar>
          </AppBar>
        </Box>

        <Box sx={{ width: '60%', boxShadow: 4, mx: 'auto', p: 5, my: 4 }}>
          <Typography variant='h3' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            Travel DTI
          </Typography>
          <Avatar src={Travel} alt="travel logo"
            sx={{ width: 150, height: 150, mx: 'auto', my: 2 }} />
          <Typography variant='h5' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            เพิ่มการเดินทาง
          </Typography>
          <Typography sx={{ fontWeight: 'bold', mt: 4, mb: 1 }} >
            สถานที่ที่เดินทางไป
          </Typography>
          <TextField fullWidth value={travelPlace} onChange={(e) => setTravelPlace(e.target.value)}/>
          <Typography sx={{ fontWeight: 'bold', mt: 4, mb: 1 }} >
            วันที่เดินทางไป
          </Typography>
          <TextField fullWidth value={travelStartDate} onChange={(e) => setTravelStartDate(e.target.value)}/>
          <Typography sx={{ fontWeight: 'bold', mt: 4, mb: 1 }} >
            วันที่เดินทางกลับ
          </Typography>
          <TextField fullWidth value={travelEndDate} onChange={(e) => setTravelEndDate(e.target.value)}/>
          <Typography sx={{ fontWeight: 'bold', mt: 4, mb: 1 }} >
            ค่าใช้จ่ายในการเดินทาง
          </Typography>
          <TextField fullWidth type='number' value={travelCostTotal} onChange={(e) => setTravelCostTotal(e.target.value)} />
          {/* -------------------- */}
          {/* <Avatar src={travelImage == null ? Place : URL.createObjectURL(travelImage)} alt="travel logo"
            sx={{ width: 150, height: 150, mx: 'auto', my: 3 }} variant="rounded" /> */}

          <Avatar src={travelNewImage == null 
                        ? travelImage == ''
                        ? Place
                        :`${travelImage}` 
                        : URL.createObjectURL(travelNewImage)} alt="travel logo"
            sx={{ width: 150, height: 150, mx: 'auto', my: 3 }} variant="rounded" />  

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button component="label" variant='contained'
              startIcon={<CloudUploadIcon />}>
              เลือกรูป
              <SelectFileBt type="file" accept="image/*" onChange={handleSelectFileClick} />
            </Button>
          </Box>
          {/* -------------------- */}
          <Button variant="contained" fullWidth onClick={handelUpdateTravelClick}
            sx={{ mt: 4, py: 2, backgroundColor: '#259e69' }} >
            บันทึกการเดินทาง
          </Button>

          <Link to='/mytravel' style={{ textDecoration: 'none', color: '#259e69' }}>
            <Typography sx={{ fontWeight: 'bold', mt: 2, mb: 1, textAlign: 'center' }} >
              กลับไปหน้า การเดินทางของฉัน
            </Typography>
          </Link>
        </Box>

      </Box>
    </>
  )
}

export default EditMyTravel