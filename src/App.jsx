import { useEffect, useState } from 'react'
import axios from 'axios'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Container } from '@mui/material';
import Button from '@mui/joy/Button';
import './App.css'
import logo from './icons8-nasa-480.png'
import scrollDown from './system-regular-12-arrow-down (1).gif'

function App() {
  const key = '4vrFuRrTJ5FvUni07f2LRDDvzgVRBqhr9IomMxlF'
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${key}`
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    data: undefined
  })

  const run = async () => {
    const response = await axios.get(url)
    const result = await response.data.photos
    data.data = result
    setLoading(false)
    // jsx()
  }
  useEffect(() => {
    try {
      run()
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <>
      <Container sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} maxWidth="sm">

        <img src={logo} height={100} alt="" />
        <h2>Mars Rover Photos</h2>
        {
          !loading
            ?
            <ImageList className='images' sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
              {data.data.map((item) => {
                console.log(item)
                return (
                  <ImageListItem key={item.id}>
                    <img
                      src={item.img_src}
                      loading="lazy"
                    />
                  </ImageListItem>
                )
              })}
            </ImageList>
            :
            <>
              <Button size="lg" loading variant="plain">
                Plain
              </Button>
            </>
        }
        <img src={scrollDown} height={45} alt="" />
      </Container>
    </>
  )
}

export default App
