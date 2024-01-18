"use client"
import React , {useState} from 'react'
import {Axios} from '@/utils/axios'
import { useQuery } from '@tanstack/react-query'
const useLoggedIn = () => {

 const {data , isLoading} = useQuery({
    queryKey:['userLoad'],
    queryFn:async()=>{
        return await Axios.get("/me");
    }
 })

 if(data){
    window.location.href = "/"
  }
  
  return isLoading;
}

export default useLoggedIn;