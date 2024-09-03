import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { backendPort } from '../config';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchAllUsersDetails } from '../redux/slices/allUsersSlice';

const DashUsers = () => {
  const selector = useSelector((state)=>state.allUsers.data.users);
  const [allUsers, setAllUsers] = useState();
  const [showModal, setShowModal] = useState();
  const [userIdToDelete, setUserIdToDelete] = useState();
  const currentUser = useSelector((state)=>state.currentUser.data);
  const dispatch = useDispatch();

  useEffect(()=>{
    setAllUsers(selector);

  }, [selector])

  const handleDeleteUser = async()=>{
    axios.defaults.withCredentials = true;
    const deleteUser = await axios.delete(`${backendPort}/user/delete-account/${userIdToDelete}`)

    setShowModal(false);

    if(deleteUser.data){
      dispatch(fetchAllUsersDetails());
    }else{
      console.log("Error in deleting user account")
    }
  }


  return (
    <div className='table-auto max-h-[85vh] overflow-y-scroll overflow-x-scroll md:mx-auto  scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 '>
      {currentUser.isAdmin && allUsers?.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head className='font-roboto'>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {allUsers.map((user) => (
              <Table.Body className='divide-y' key={user._id}>
                <Table.Row className='bg-white'>
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={`${backendPort}${user.profilePicture}`}
                      alt={user.username}
                      className='w-10 h-10 object-cover rounded-full'
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (
                      <FaCheck className='text-green-500' />
                    ) : (
                      <FaTimes className='text-red-500' />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>You have no users yet!</p>
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
              Are you sure you want to delete this user?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' 
              onClick={handleDeleteUser}
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
}

export default DashUsers;