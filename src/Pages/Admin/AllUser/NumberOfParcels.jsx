import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import UseParcels from '@/Hooks/UseParcels';
import React from 'react';

const NumberOfParcels = ({email}) => {

     const [parcels,isLoading] = UseParcels(email);

    if(isLoading)
    {
        return "."
    }
    return (
        <div>
            {parcels.length}

        </div>
    );
};

export default NumberOfParcels;