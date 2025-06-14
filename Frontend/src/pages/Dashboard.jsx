import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate } from 'react-router-dom';

const Dashboard = () => {

    const {user , isLoaded , isSignedIn} = useUser();


    if(!isSignedIn&&isLoaded){
        return <Navigate to={"/auth/signup"} />
    }
  return (
    <div>
        Dashboard
      
    </div>
  )
}

export default Dashboard
