import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

function Users() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = userList?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(userList?.length / itemsPerPage);

  useEffect(() => {
    const getUserList = async() => {
      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then((res) => {
          setUserList(res.data);
        })
        .catch(() => {
          setUserList([]);
          toast.error("We could not fetch the user's list");
        })
        .finally(() => {
          setUserLoading(false);
        })
    }

    getUserList();
  }, []);

  useEffect(() => {
    const getPostsList = async() => {
      axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then((res) => {
          setPostList(res.data);
        })
        .catch(() => {
          setPostList([]);
        })
    }

    getPostsList();
  }, []);

  const goToUserPosts = (id) => {
    if(postList?.length > 0) {
      const filteredPosts = postList?.filter(post => post?.userId === id);
      console.log(filteredPosts);
      navigate(`/users/${id}`, { state: filteredPosts })
    } else {
      toast.error("Error fetching on posts");
    }
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % userList?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <div className="main-container">
      <ToastContainer />
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
            <th>User ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Company Name</th>
          </tr>
        </thead>
        <tbody>
          {
            userLoading
            ? (
              <tr>
                <td colSpan={5}>Data Loading...</td>
              </tr>
            ) : userList?.length > 0
            ? currentItems?.map((user, index) => (
              <tr key={index} onClick={() => {goToUserPosts(user?.id)}} style={{cursor: 'pointer'}}>
                <td style={{textAlign: 'center'}}>{user?.id}</td>
                <td style={{color: 'blue', textDecoration: 'underline'}}>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.address?.street}, {user?.address?.suite}, {user?.address?.city}, {user?.address?.zipcode}</td>
                <td>{user?.company?.name}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5}>No Data Available</td>
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

export default Users;