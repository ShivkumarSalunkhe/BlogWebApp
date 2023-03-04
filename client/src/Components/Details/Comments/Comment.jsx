import { useContext } from "react";

import { Typography, Box, styled } from "@mui/material";
import Delete from '../../../Assets/Delete.png'

import { API } from "../../../service/api";
import { DataContext } from "../../../Context/DataProvider";
import ToastContext from "../../../Context/ToastContext";

const Component = styled(Box)`
  margin-top: 30px;
  background: #f5f5f5;
  padding: 10px;
`;

const Container = styled(Box)`
  display: flex;
  margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 600,
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
  font-size: 14px;
  color: #878787;
`;

const DeleteIcon = styled('img')({
  margin: "5px",
  padding: "5px",
  width:'20px',
  marginLeft: "auto"
})

const Comment = ({ comment, setToggle }) => {
  const { account } = useContext(DataContext);
  const { toast } = useContext(ToastContext);
  const removeComment = async () => {
    const response = await API.deleteComment(comment._id);
    setToggle((prev) => !prev);
    toast.success(response.data);
  };

  return (
    <Component>
      <Container>
        <Name>{comment.name}</Name>
        <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
        {comment.name === account.username && (
          <DeleteIcon src={Delete} alt='delete' onClick={() => removeComment()}/>
        )}
      </Container>
      <Typography>{comment.comments}</Typography>
    </Component>
  );
};

export default Comment;
