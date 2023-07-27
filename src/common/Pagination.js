import React, { useState } from "react";
import "../components/profile/booking.css"

const Pagination = ({ totalPosts, postperpage, setCurrentPage }) => {
    const [pagelimit, setpagelimit] = useState(4)
    const [minpagelimit, setminpagelimit] = useState(4)
    const [maxpagelimit, setmaxpagelimit] = useState(0)
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postperpage); i++) {
        pages.push(i)
    }
    
    return (
        <>
        {
            pages.map((page)=>{
                return <button className="page" onClick={() => setCurrentPage(page)}>{page}</button>
            })
        }
            {/* {pages.map((page) => {
               if(page<maxpagelimit+1 && page>minpagelimit){
                return {page}
               }else{
                return null
               }
            })} */}
        </>
    )
}
export default Pagination