import React from "react";
import styled from "styled-components";

const FormInput = styled.input`
  width: 100%;
  height: 2rem;
  border: 0;
  padding: 1rem;
  font-size: 1rem;
`;

const Form = ({ inputValue, changeHandler, addComment }) => {
  return (
    <form onSubmit={(e) => addComment(e)}>
        <FormInput
        className="form__input"
        type="text"
        value={inputValue}
        onChange={changeHandler}
        placeholder="Add a comment..."
        />
    </form>
  );
};

export default Form;
