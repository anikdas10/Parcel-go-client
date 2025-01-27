
import UseAxiosPublic from '@/Hooks/UseAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const NumberOfParcels = ({id}) => {
    const axiosPublic = UseAxiosPublic();
   console.log(id);
   const {data:delivered,isLoading}= useQuery({
    queryKey:[id],
    queryFn:async()=>{
        const {data} = await axiosPublic.get(`/delivered/${id}`)
       return data
    }
   })
   if(isLoading)
    {
        return "."
    }
    return (
        <div>
           {delivered.result}

        </div>
    );
};

export default NumberOfParcels;