import { Box, Typography,styled } from '@mui/material'
import React from 'react'


const Image =styled(Box)`
background:url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x black;
width:100%;
height:50vh;
display:flex;
align-items: center;
justify-content:center;
flex-direction:column;
`
const Heading =styled(Typography)`
font-size:70px;
color:white;
line-height:1;
`
const Subheading =styled(Typography)`
font-size: 20px;
background:white;
`
const Banner=()=> {
  return (
    <Image>
    <Heading>BLOG</Heading>
    <Subheading>SHIV BLOG WEB SITE</Subheading>
    </Image>
  )
}

export default Banner