import moment from "moment";
import React, { useEffect, useState, useRef } from "react";
import Modal from 'react-modal'
import "./booking.css"
import { CSVLink } from "react-csv";
import ReactToPrint from 'react-to-print';
import Pagination from "../../common/Pagination";

const UserWallet = () => {
    const [openmodal, setopenmodal] = useState(false)
    const [addmoney, setaddmoney] = useState("")
    const [error, seterror] = useState(false)
    const apikey = sessionStorage.getItem("key")
    const userid = sessionStorage.getItem("userid")
    const [showtable, setshowtable] = useState([])
    const [currentpage, setcurrentpage] = useState(1)
    const [postperpage,setpostperpage]=useState(10)
    const [msg, setmsg] = useState(false)

    const componentRef = useRef();

    const lastPostIndex=(currentpage)*postperpage;
    const firstPostIndex=lastPostIndex-postperpage;

    const handleaddmoney = () => {
        if (validation()) {
            let data = {
                "total_amt": addmoney,
                "trans_description": "ff"
            }
            fetch(`${process.env.REACT_APP_URL}/transactionapi/addtranswithouttrip?api_key=${apikey}&user_id=${userid}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then((res) => {
                res.json().then((result) => {
                    if (res.status == 200) {
                        console.log("success");
                        setopenmodal(false)
                        setmsg(true)
                        setaddmoney("")
                        seterror(false)
                        amountTable()
                    }
                })
            })

        }
    }

    useEffect(() => {
        amountTable()
    },[])

    const amountTable = () => {
        fetch(`${process.env.REACT_APP_URL}/transactionapi/gettransactions?api_key=${apikey}&user_id=${userid}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        }).then((res) => {
            return res.json()
        }).then((result) => {
            setshowtable(result.response)
        })
    }

    const currentPost=showtable.slice(firstPostIndex,lastPostIndex)

    const len=Math.ceil((showtable.length)/postperpage)

    const validation = () => {
        let result = true
        if (addmoney.length === 0) {
            result = false;
            seterror(true)
        }
        return result
    }

    const pageHandler = (selectedpage) => {
        if (
            selectedpage >= 1 &&
            selectedpage <= len &&
            selectedpage !== currentpage
        )
            setcurrentpage(selectedpage)
    }

    console.log(showtable.length, "len")

    const headers = [
        { label: "Id", key: "TransUsr[0].transaction_id" },
        { label: "Date", key: "date" },
        { label: "Type", key: "trans_type" },
        { label: "Amount", key: "total_amt" },
        { label: "Current Balance", key: "TransUsr[0].current_bal" }
    ]

    let csvData = showtable.map((it, ind) => {
        it.date = moment(it.trans_date).format("YYYY-MM-DD");
        return it

    })

    const popmodalopen=()=>{
        setopenmodal(true)
        setmsg(false)
    }

    
    return (
        <>
            <div class="tab-content">
                {msg ? <div className='alert alert-success'>Successfully Added</div> : null}
                <div class="tab-pane active" id="confirm_booking" style={{ display: "flex", justifyContent: "end" }}>
                    <button onClick={popmodalopen} className="btn btn-primary">Add Money</button>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                    <div>
                        <CSVLink data={csvData} headers={headers}>
                            <button className="btn btn-primary">CSV</button>
                        </CSVLink>
                        <ReactToPrint trigger={() => <button className="btn btn-primary" style={{ marginLeft: "5px" }}>Print</button>} content={() => componentRef.current} pageStyle="print" />
                    </div>

                </div>

                <div ref={componentRef}>
                    <table className="table-head">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Current Balance</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                currentPost.map((item) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{item.TransUsr[0].transaction_id}</td>
                                                <td>{moment(item.trans_date).format("YYYY-MM-DD")}</td>
                                                <td>{item.trans_type}</td>
                                                <td>{item.total_amt}</td>
                                                <td>{item.TransUsr[0].current_bal}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>

               <div className="table-page">
               <div className="show">Showing {currentpage} to {showtable.length===0?1:len} of  entries</div>
               <div className="pagination">
                        <button className="button" onClick={()=>pageHandler(currentpage-1)}>Previous</button>
                        <Pagination totalPosts={showtable.length} postperpage={postperpage} setCurrentPage={setcurrentpage} />
                        <button className="button" onClick={()=>pageHandler(currentpage+1)}>Next</button>
                    </div>
               </div>
            </div>

            <Modal isOpen={openmodal} onRequestClose={() => setopenmodal(false)} shouldCloseOnOverlayClick={true}
                style={{
                    overlay: {
                        width: 550,
                        height: 360,
                        borderRadius: "10px",
                        backgroundColor: "none",
                        zIndex: "1000",
                        top: "50%",
                        left: "50%",
                        marginTop: "-300px",
                        marginLeft: "-350px",
                    },
                }}
            >
                <div className="modal-header">
                    <button className="close" onClick={() => setopenmodal(false)}>×</button>
                    <h4 className="modal-title">Add Money</h4>
                </div>
                <div>
                    <div className="modal-body">
                        <div className="md-form">
                            <label>Total Amount</label>
                            <input type="number" name="add_money" value={addmoney} onChange={(e) => setaddmoney(e.target.value)} className="md-textarea form-control" id="form" min="0" required />
                            {error && addmoney.length <= 0 ? <label className="error" id="form-error" style={{ color: "#e74c3c" }}>This field is required</label> : null}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-dafault" onClick={() => setopenmodal(false)}>Close</button>
                        <button className="btn btn-primary" onClick={handleaddmoney}>Add Money</button>
                    </div>
                </div>
            </Modal>
           
        </>
    )
}
export default UserWallet