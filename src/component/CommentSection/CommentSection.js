import React from "react";
import styled from "styled-components";

const CommentArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  line-height: 0;
  padding: 0 1rem 0 1rem;
  p span {
    font-weight: bold;
  }
`;

const CommentSection = ({ props }) => {
    return (
        <CommentArea>
        <p><span className="user__comment">{props.username}</span>&nbsp;&nbsp;{props.text}</p>
        </CommentArea>
    )
}

export default CommentSection;
