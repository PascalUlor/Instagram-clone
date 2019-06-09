import React, { useState, useEffect } from "react";
import uuidv4 from "uuid/v4";
import moment from "moment";
import faker from "faker";
import styled from 'styled-components';
import { IoIosHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import CommentSection from "../CommentSection/CommentSection";
import Form from "../Form/Form";


const PostContainerStyle  = styled.section`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 5rem auto;
    border: 1px solid lightgray;
    overflow: hidden;
`;
const UserThumbnail = styled.img`
border-radius: 50%;
  height: 2rem;
  padding: 1rem;
`;
const UserDeets = styled.div`
width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  vertical-align: middle;
  border: .5px solid lightgrey;
  border-radius: .2rem;
  font-weight: bold;
`;

const UserPostArea = styled.div`
 width: 100%;
`;

const PostImage = styled.img`
width: 100%;
    height: 100%;
    margin-bottom: 0;
    overflow: hidden;
`;

const Reaction = styled.section`
display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    font-weight: bold;
    padding: 1rem;
`;

const PostIcons = styled.div`
font-size: 1.5rem;
`;

const TimeStamp = styled.div`
display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    color: gray;
    margin: 0 .5rem;
    padding: 1rem;
    border-bottom: 1px solid lightgrey;
`;
const PostContainer = ({ props }) => {
    const {
      postId,
      comments,
      thumbnailUrl,
      imageUrl,
      timestamp,
      likes,
      username,
      show
    } = props;
    const commentDate = timestamp.replace(/th/, "");
    const [inputValue, setInputValue] = useState("");
    const [inputComment, setInputComment] = useState(comments);
    const [createdAt, setCreatedAt] = useState(
      moment(new Date(commentDate), "MMM D LTS").fromNow()
    );
  
    const [addLikes, updateLikes] = useState(likes);
    
    useEffect(()=>{
      const post = JSON.parse(localStorage.getItem("posts"));
      const postUpdate = post.map((userPost) => {
        if(postId === userPost.postId) {
          return {
            ...userPost, comments: inputComment, timestamp: `${moment(new Date(), "MMM D LTS")}`, likes: addLikes
          }
        }
        return userPost;
      });
      localStorage.setItem("posts", JSON.stringify(postUpdate));
    },[inputComment, postId, createdAt, addLikes])
  
    const handleChange = e => {
      setInputValue(e.target.value);
    };
    const postComment = e => {
      e.preventDefault();
      const newComment = {
        postId: postId,
        id: uuidv4(),
        username: faker.name.findName(),
        text: inputValue
      };
      setInputComment([...inputComment, newComment]);
      setInputValue("");
      setCreatedAt(moment(new Date(), "MMM D LTS").fromNow());
    };
    const handleLikes = () => {
      let newLike = likes;
      updateLikes(newLike + 1);
    };
    
  
    return (
      <PostContainerStyle display={show}>
        <UserDeets>
          <UserThumbnail src={thumbnailUrl} alt="user-profile" />
          <p>{username}</p>
        </UserDeets>
        <UserPostArea>
          <PostImage src={imageUrl} alt="user-post" />
        </UserPostArea>
        <Reaction>
          <PostIcons>
            <span onClick={handleLikes}>
              <IoIosHeartEmpty />
            </span>
  
            <span>
              <FaRegComment />
            </span>
          </PostIcons>
          {addLikes} likes
        </Reaction>
        {inputComment.map(comment => {
          return <CommentSection key={comment.id} props={comment} />;
        })}
        <TimeStamp>{createdAt}</TimeStamp>
        <Form
          inputValue={inputValue}
          changeHandler={handleChange}
          addComment={postComment}
        />
      </PostContainerStyle>
    );
};

export default PostContainer;
