import React from "react";
import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { backendPort } from "../config";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchAllPosts } from '../redux/slices/postSlice'

const DashPosts = () => {
  const selector = useSelector((state) => state.blogPosts.data);
  const currentUser = useSelector((state) => state.currentUser.data);
  const [userPosts, setUserPosts] = useState();
  const [showModal, setShowModal] = useState();
  const [postIdToDelete, setPostIdToDelete] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setUserPosts(selector);
  }, [selector]);

  const handleDeletePost = async()=>{
    // console.log("delete: ", postIdToDelete)
    const deleteRes = await axios.delete(`${backendPort}/api/post/delete/${postIdToDelete}`)
    setShowModal(false);
    dispatch(fetchAllPosts());
  }


  return (
    <div className="table-auto max-h-[85vh] overflow-y-scroll overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
      {currentUser.isAdmin && userPosts?.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head className="font-roboto">
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body className="divide-y" key={post._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="text-xs">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/blogs/${post._id}`}>
                      <img
                        src={`${post.postImage}`}
                        alt={post.title}
                        className="w-24 h-12 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-raleway text-[#333333]"
                      to={`/blogs/${post._id}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-[#7C4EE4] hover:underline"
                      to={`/api/post/update/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" 
              onClick={handleDeletePost}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashPosts;
