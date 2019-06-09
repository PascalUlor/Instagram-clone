import React, { useState, useEffect } from "react";
import styled from "styled-components";
import uuidv4 from "uuid/v4";
import data from "./dummy-data";
import PostPage from './component/PostContainer/PostPage';
import Login from './component/Login/Login';
import Authenticate from './component/authentication/Authenticate';

const AppContainer = styled.div`
  text-align: center;
  background-color: #fafafa;
`;

const preprocessData = data.map(post => {
  return {
    ...post,
    postId: uuidv4(),
    show: "on"
  };
});

const ComponentFromWithAuthenticate = Authenticate(PostPage, Login);

function App() {
  const [posts, setPost] = useState([]);
  const [search, setSearch] = useState("");

  

  useEffect(() => {
    const allData = localStorage.getItem("posts");
    let postData;
    if (allData) {
      postData = JSON.parse(allData);
    } else {
      localStorage.setItem("posts", JSON.stringify(preprocessData));
      postData = JSON.parse(localStorage.getItem("posts"));
    }
    setPost(postData);
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    const data = posts;
    setSearch(e.target.value.trim());
      const query = data.map(post => {
        if (!post.username.trim().toLowerCase().includes(e.target.value.trim())) {
          return {
            ...post,
            show: "off"
          };
        }
        return {
          ...post,
          show: "on"
        };
      });
      setPost(query);
  };


  return (
    <AppContainer>
    <ComponentFromWithAuthenticate
        handleSearch={handleSearch}
        search={search}
        posts={posts}
      />
    </AppContainer>
  );
}

export default App;
