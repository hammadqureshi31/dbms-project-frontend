import React from 'react'
import { Pagination } from "flowbite-react";
import { useDispatch } from 'react-redux';
import { fetchAllPosts } from '../redux/slices/postSlice';


const PostPagination = ({currentPage, setCurrentPage}) => {
    const dispatch = useDispatch();
      const onPageChange = (page) => {
        dispatch(fetchAllPosts({page:page}))
        setCurrentPage(page);
      }

      return (
        <div className="flex overflow-x-auto sm:justify-center">
          <Pagination currentPage={currentPage} totalPages={3} onPageChange={onPageChange} showIcons />
        </div>
      );
}

export default PostPagination