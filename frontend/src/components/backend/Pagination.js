import React, {useEffect, useState} from 'react';

export const Pagination = ({apiURL}) => {

    const [pageNum, setPageNum] = useState(null);

    const fetchPagination = async () => {
        console.log('here we are')
        try {
            const response = await fetch(`${apiURL}/pagination`);
            const data = await response.json();
            setPageNum(data.data);
        } catch (error) {
            alert(error.message);
        }
        
    }

   

    useEffect(() => { 
        fetchPagination();
    }, [])
    return (
        <div>
            <ul>
                { pageNum && [...Array(pageNum)].map((e, i) => <button key={i}>{i + 1}</button>)}
            </ul>
        </div>
    )
}
