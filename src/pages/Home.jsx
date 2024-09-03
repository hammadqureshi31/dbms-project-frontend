import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetails } from '../redux/slices/userSlice'
import { fetchAllPosts } from '../redux/slices/postSlice'
import LandingComp from '../components/LandingComp'
import RecentPosts from '../components/RecentPosts'
import PopularPosts from '../components/PopularPosts'

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetchUserDetails())
      dispatch(fetchAllPosts())
  }, [])


  return (
    <>
    <div className='max-w-full overflow-hidden'>
      <LandingComp/>
      <RecentPosts />
      <PopularPosts />
    </div>
    </>
  )
}

export default Home