import React, { useEffect, useState, useRef } from "react";
import { CSVLink } from "react-csv";
import Modal from 'react-modal'
import "./booking.css"
import moment from "moment";
import ReactToPrint from 'react-to-print';
import Pagination from "../../common/Pagination";

const BookingHistory = () => {

    const apikey = sessionStorage.getItem("key")
    const userid = sessionStorage.getItem("userid")
    const [bookingtable, setbookingtable] = useState([])
    const [currentpage, setcurrentpage] = useState(1)
    const [postperpage, setpostperpage] = useState(10)
    const [openmodal, setopenmodal] = useState(false)
    const [ide, setide] = useState("")
    const [msg, setmsg] = useState(false)
    const [reason, setreason] = useState("")

    const componentRef = useRef();

    const lastPostIndex = (currentpage) * postperpage;
    const firstPostIndex = lastPostIndex - postperpage;

    useEffect(() => {
        historytable()
    }, [])

    const len = Math.ceil((bookingtable.length) / postperpage)
    const pageHandler = (selectedpage) => {
        if (
            selectedpage >= 1 &&
            selectedpage <= len &&
            selectedpage !== currentpage
        )
            setcurrentpage(selectedpage)
    }

    const HandleCancleTrip = (e) => {
        e.preventDefault()
        let data = {
            "trip_id": ide,
            "trip_status": "cancel",
            "is_return_details": "1",
            "trip_reason": reason
        }
        fetch(`${process.env.REACT_APP_URL}/tripapi/updatetrip?api_key=${apikey}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((res) => {
            res.json().then((data) => {
                if (res.status == 200) {
                    setopenmodal(false)
                    setmsg(true)
                    setreason("")
                    historytable()
                }
            })
        })
    }

    const headers = [
        { label: "Trip id", key: "trip_id" },
        { label: "Trip Date", key: "date" },
        { label: "Trip Time", key: "timefor" },
        { label: "Pickup Location", key: "trip_from_loc" },
        { label: "Drop of Location", key: "trip_to_loc" },
        { label: "status", key: "trip_status" },
        { label: "Reason", key: "trip_reason" }
    ]

    const historytable = () => {
        fetch(`${process.env.REACT_APP_URL}/tripapi/gettrips?api_key=${apikey}&user_id=${userid}`, {

            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        }).then((res) => {
            return res.json()
        }).then((data) => {
            setbookingtable(data.response)
        })
    }

    let csvData = bookingtable.map((it, ind) => {
        var e = new Date(it.trip_date);
        var utc_offset_gmt = e.getTimezoneOffset();
        e.setMinutes(e.getMinutes() - utc_offset_gmt);
        it.date = moment(e).format("YYYY-MM-DD");
        it.timefor = moment(e).format(" hh:mm");
        return it
    })

    const currentPost = csvData.slice(firstPostIndex, lastPostIndex)

    const handleModal = (id) => {
        setopenmodal(true)
        console.log(id, "id")
        setide(id)
        setmsg(false)
    }

    return (
        <>
            <div class="tab-content">
                {msg ? <div className='alert alert-success'>Trip Cancel Successfully</div> : null}
                <div class="tab-pane active" id="confirm_booking" style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <CSVLink data={csvData} headers={headers}>
                            <button className="btn btn-primary">CSV</button>
                        </CSVLink>
                        <ReactToPrint trigger={() => <button className="btn btn-primary" style={{ marginLeft: "5px" }}>Print</button>} content={() => componentRef.current} pageStyle="print" />
                    </div>
                    {/* <div>Search: <input type="text" />
                    </div> */}
                </div>

                <div ref={componentRef}>
                    <table className="table-head">
                        <thead>
                            <tr>
                                <th>Trip Id</th>
                                <th>Trip Date</th>
                                <th>Trip Time</th>
                                <th>Pickup Location</th>
                                <th>Drop off Location</th>
                                <th>Status</th>
                                <th></th>
                                <th>Reason</th>
                            </tr>
                        </thead>
                        <tbody>


                            {currentPost.map((res) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{res.trip_id}</td>
                                            <td>{moment(res.trip_date).format("YYYY-MM-DD")}</td>
                                            {/* <td>{moment(res.trip_date).format("hh:mm")}</td> */}
                                            <td>{res.timefor}</td>
                                            <td>{res.trip_from_loc}</td>
                                            <td>{res.trip_to_loc}</td>
                                            <td>{res.trip_status[0].toUpperCase() + res.trip_status.slice(1).toLowerCase()}</td>
                                            {res.trip_status === "request" ?
                                                <td><input id="mybtn" data-toggle="modal" data-target="#myModal372"
                                                    className="btn btn-danger" type="submit" onClick={(e) => handleModal(res.trip_id)} value="Cancel"
                                                /></td> : <td></td>
                                            }
                                            <td>{res.trip_reason}</td>
                                        </tr>
                                    </>
                                )
                            })}


                        </tbody>
                    </table>
                </div>

                <div className="table-page">
                    <div className="show">Showing {currentpage} to {bookingtable.length === 0 ? 1 : len} of  entries</div>
                    <div >
                        <div className="pagination">
                            <button className="button" onClick={() => pageHandler(currentpage - 1)}>Previous</button>
                            <Pagination totalPosts={bookingtable.length} postperpage={postperpage} setCurrentPage={setcurrentpage} />
                            <button className="button" onClick={() => pageHandler(currentpage + 1)}>Next</button>
                        </div>
                    </div>
                </div>

            </div>

            <Modal isOpen={openmodal} onRequestClose={() => setopenmodal(false)} shouldCloseOnOverlayClick={true}
                style={{
                    overlay: {
                        width: 650,
                        height: 400,
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
                    <h4 className="modal-title">Are You Sure?</h4>
                </div>
                <div className="modal-body">
                    <div className="md-form">
                        <i className="fas fa-pencil prefix grey-text"></i>
                        <label data-error="wrong" name="cancel_reason" data-success="right" value for="form371</label>">Reason For Cancel</label>
                        <textarea type="text" name="cancel_reason" value={reason} onChange={(e) => setreason(e.target.value)} id="form371" className="md-textarea form-control" rows="4" ></textarea>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-dafault" onClick={() => setopenmodal(false)}>Close</button>
                    <button className="btn btn-primary" onClick={(e) => HandleCancleTrip(e)}>Cancel Trip</button>
                </div>
            </Modal>
        </>
    )
}
export default BookingHistory