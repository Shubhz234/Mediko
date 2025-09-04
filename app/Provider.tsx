'use client'

import React, { useEffect } from 'react'
import axios from 'axios'
import { useUser } from '@clerk/nextjs';

const Provider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const {user} = useUser();

    useEffect(() => {
      user&&CreateNewUser();
    }, [user])
    

    const CreateNewUser = async() => {
        // Logic to create a new user
        const result = await axios.post('/api/users');
        console.log(result.data)
    }

    return (
        <div>{children}</div>
    )
}

export default Provider