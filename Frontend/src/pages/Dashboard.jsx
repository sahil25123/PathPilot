import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';

const Dashboard = () => {

    const { isLoaded , isSignedIn} = useUser();


    if(!isSignedIn&&isLoaded){
        return <Navigate to={"/auth/signup"} />
    }
  return (
    <div>
      <Header/>
        Dashboard

      
    </div>
  )
}

export default Dashboard
