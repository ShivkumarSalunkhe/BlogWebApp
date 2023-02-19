import React, { useEffect, useState } from "react";
import { API } from "../../../service/api";
import { Box } from "@mui/material";
import Post from "./Post";

const Posts = () => {
  const [posts, setPost] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getAllPosts();
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {
        posts && posts.length > 0 ? (
        posts.map((post) => 
        <Post post={post}/>
        )
      ) : (
        <Box style={{color:'#878787', margin:'30px 80px', fontSize:'18px'}}> No data available to display </Box>
      )
      }
    </>
  );
};

export default Posts;
