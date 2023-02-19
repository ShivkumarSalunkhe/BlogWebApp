import React from 'react'
import { Box, Typography } from "@mui/material";


function Post({post}) {
  return (
    <Box>
    <img src={post.picture} alt='blog'/>
    <Typography>{post.categories}</Typography>
    <Typography>{post.title}</Typography>
    <Typography>{post.username}</Typography>
    <Typography>{post.description}</Typography>
    </Box>
  )
}

export default Post