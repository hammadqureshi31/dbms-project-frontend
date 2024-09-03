import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import axios from 'axios';
import { backendPort } from '../config';
import { fetchAllPostsComments } from '../redux/slices/commentSlice';

const DashComments = () => {
  const [allPostComments, setAllPostComments] = useState();
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState();
  const currentUser = useSelector((state) => state.currentUser.data);
  const selector = useSelector((state) => state.postComments.data?.comments);
  const [deleted, setDeleted] = useState();
  const dispatch = useDispatch();
  // console.log(selector);

  useEffect(() => {
    setAllPostComments(selector);
  }, [selector]);

  const handleDeleteComment = async()=>{
    axios.defaults.withCredentials = true
    const deleteResp = await axios.delete(`${backendPort}/api/comment/delete/${commentIdToDelete}`);
    setDeleted(deleteResp.data)
    dispatch(fetchAllPostsComments());
  }

  return (
    <div className='table-auto max-h-[85vh] overflow-y-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300'>
      {currentUser.isAdmin && allPostComments?.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
              <Table.HeadCell>Post ID</Table.HeadCell>
              <Table.HeadCell>User ID</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {allPostComments.map((comment) => (
                <Table.Row
                  key={comment._id}
                  className='bg-white dark:bg-gray-800'
                >
                  <Table.Cell className='text-xs md:text-sm'>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell className='text-xs md:text-sm'>
                    {comment.content}
                  </Table.Cell>
                  <Table.Cell className='text-xs md:text-sm'>
                    {comment.likes?.length}
                  </Table.Cell>
                  <Table.Cell className='text-xs md:text-sm'>
                    {comment.postId}
                  </Table.Cell>
                  <Table.Cell className='text-xs md:text-sm'>
                    {comment.userId}
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className='font-medium text-red-500 hover:underline'
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </>
      ) : (
        <p className='text-center text-gray-500'>You have no comments yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this comment?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button
                color='failure'
                onClick={() => {
                  handleDeleteComment();
                  setShowModal(false);
                }}
              >
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashComments;
