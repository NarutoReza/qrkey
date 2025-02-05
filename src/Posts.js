import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import './style.css';

function Posts() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if(!location.state) {
      navigate('/');
    }
  }, [location.state]);

  const posts = location.state;
  console.log(posts);
  return (
    <div className='post-container'>
      <div
        className='go-back'
        onClick={() => {navigate(-1)}}
      >
        <p>←</p>
        <p>Go back</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Post Title</th>
            <th>Post Content</th>
          </tr>
        </thead>
        <tbody>
          {
            posts?.length > 0
            ? posts?.map((post, index) => (
              <tr key={index}>
                <td>{post?.title}</td>
                <td>{post?.body}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={2}>No Posts Available</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
};

export default Posts;