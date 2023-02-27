import React from 'react'
import { Box, Typography,styled } from "@mui/material";
import {addElipsis} from '../../../utils/common-utils'


const Container = styled(Box)`
  border: 1px solid gray;
  border-radius: 10px;
  margin: 10px;
  height: 350px;
  align-items:center;
  flex-direction: column;
  & > p {
    padding: 0 5px 5px 5px;
  }
`
const Image = styled("img")({
  width:'100%',
  borderRadius:'10px 10px 0 0',
  objectFit:'cover',
  height:'150px'
});

const Text = styled(Typography)`
  color: #878787;
font-size: 12px;
`

const Heading=styled(Typography)`
font-size: 18px;
font-weight:600
`
const Details=styled(Typography)`
font-size: 14px;
word-break: break-word;
`


function Post({post}) {
  const url = post.picture ? post.picture : 'https://images.hdqwalls.com/wallpapers/ford-mustang-gt-forest-lord-5k-oq.jpg'
  return (
    <Container>
    <Image src={url} alt='blog'/>
    <Text>{post.categories}</Text>
    <Heading>{addElipsis(post.title, 20)}</Heading>
    <Text>{post.username}</Text>
    <Details>{addElipsis(post.description, 100)}</Details>
    </Container>
  )
}

export default Post