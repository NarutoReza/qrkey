import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import './style.css';
import ReactPaginate from 'react-paginate';

function Posts() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if(!location.state) {
      navigate('/');
    }
  }, [location.state]);

  const posts = location.state;
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = posts?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(posts?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % posts?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className='post-container'>
      <div
        className='go-back'
        onClick={() => {navigate(-1)}}
      >
        <p>←</p>
        <p>Go back</p>
      </div>
      <div className="selector">
        <select
          onChange={e => {
            setItemsPerPage(parseInt(e.target.value));
          }}
          value={itemsPerPage}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <label>items</label>
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
            currentItems?.length > 0
            ? currentItems?.map((post, index) => (
              <tr key={index}>
                <td className='postsFirst'>{post?.title}</td>
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
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< prev"
        renderOnZeroPageCount={null}

        containerClassName="container-class"

        className="pagination-class-name"

        pageClassName="pagination-li"
        pageLinkClassName="pagination-li-a"

        breakClassName="pagination-ellipsis"
        breakLinkClassName="pagination-ellipsis-a"

        activeClassName="pagination-active-li"
        activeLinkClassName	="pagination-active-a"
      />
    </div>
  )
};

export default Posts;