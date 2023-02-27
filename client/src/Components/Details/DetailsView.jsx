import React, { useEffect, useState, useContext } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { API } from "../../service/api";
import { styled } from "@mui/system";
import { Edit, Delete } from "@mui/icons-material";
import { DataContext } from "../../Context/DataProvider";

const Container = styled(Box)`
  margin: 50px 100px;
`;
const Image = styled("img")({
  width: "100%",
  objectFit: "cover",
  height: "50vh",
});

const Heading = styled(Typography)`
  text-align: center;
  font-weight: 600;
  font-size: 34px;
  margin: 50px 0px 10px 0px;
  word-break: break-word;
`;

const EditIcon = styled(Edit)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;
const DeleteIcon = styled(Delete)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const Author = styled(Box)`
  margin: 20px 0px;
  color: #878787;
  display: flex;
`;
const Description = styled(Typography)`
  word-break: break-word;
`;

const DetailsView = () => {
  const [post, setPost] = useState();


  const url = post.picture
    ? post.picture
    : "https://www.motori.it/pUgU4TCDtCDODZpJGj4XW_9WaXM=/1024x674/smart/uploads/2017/03/017173.jpg";
    
    const { account } = useContext(DataContext);

    const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const response = await API.getPostByID(id);
      if (response.isSuccess) {
        setPost(response.data);
        console.log(response.data);
      }
    };
    fetchData();
  }, []);
  console.log(post);

  return (
    <Container>
      <Image src={url} alt="sd" />
      <Box style={{ float: "right" }}>
        {account.username === post.username && (
          <>
            <EditIcon color="primary" />
            <DeleteIcon color="error" />
          </>
        )}
      </Box>

      <Heading>{post.title}</Heading>
      <Author>
        <Typography>
          Author:{" "}
          <Box component="span" style={{ fontWeight: 600 }}>
            {post.username}
          </Box>
        </Typography>
        <Typography style={{ marginLeft: "auto" }}>{new Date(post.createdDate).toDateString()}</Typography>
        <Description >
          {post.description}
        </Description>
      </Author>
    </Container>
  );
};

export default DetailsView;
