import React, { useEffect } from "react";
import { loadPosts } from "redux/posts/postsActions";
import { useSelector, useDispatch } from "react-redux";
import Post from "components/PostsList/Post";
import './index.scss';

const PostsList = () => {
  const posts = useSelector((state) => state.posts.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    const searchPosts = () => {
      fetch("https://my-pasteque-space.herokuapp.com/posts?_sort=created_at:desc")
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response;
        })
        .then((response) => response.json())
        .then((response) => {
          dispatch(loadPosts(response));
        })
        .catch((error) => {
          console.error(error);
        });
    }
    searchPosts()
  }, [dispatch])

  return (
    <div>
      <h2>Voici les posts :</h2>
      <div className="PostsDiv">
        {posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((post) => (
          <Post post={post} key={post.id}/>
        ))}
      </div>
    </div>
  );
};

export default PostsList;