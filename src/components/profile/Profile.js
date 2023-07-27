import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingHistory from "./BookingHistory";
import ChangePassword from "./ChangePassword";
import UserWallet from "./UserWallet";

const Profile = () => {

    const navigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem('email')
        if (username === '' || username === null) {
            navigate('/login')
        }
    }, [])


    const handlelogout = () => {
        sessionStorage.clear();
        navigate('/login')
        window.location.reload()
    }

    const [fname, setfname] = useState(sessionStorage.getItem("fname"));
    const [lname, setlname] = useState(sessionStorage.getItem("lname"));
    const [email, setemail] = useState(sessionStorage.getItem("email"));
    const [phon, setphon] = useState(sessionStorage.getItem("phone"));
    const [userid, setuserid] = useState(sessionStorage.getItem("userid"));
    const [error, seterror] = useState(false)
    const [msg, setmsg] = useState("");
    let tabtype = "userprofile"
    const [type, settype] = useState("userprofile")


    const apikey = sessionStorage.getItem("key")

    const handletab = (value) => {
        if (tabtype = value) {
            settype(tabtype)
        }
    }

    const Updatehandler = (e) => {
        e.preventDefault()
        if (validation()) {
            let item = {
                "u_fname": fname,
                "u_lname": lname,
                "u_email": email,
                "u_phone": phon,
                "user_id": userid,
                "is_return_details": "1"
            }
            fetch(`${process.env.REACT_APP_URL}/userapi/updateuserprofile?api_key=${apikey}&user_id=${userid}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            }).then((res) => {
                res.json().then((result) => {
                    if (res.status == 200 || res.status == "OK") {
                        sessionStorage.setItem("fname", fname)
                        sessionStorage.setItem("lname", lname)
                        sessionStorage.setItem("email", email)
                        sessionStorage.setItem("phone", phon)
                        sessionStorage.setItem("name", fname + " " + lname)
                        setmsg("Update Successfully")
                    } else {
                        setmsg(result.message);
                        seterror(false)
                    }
                })
            })
        }
    }

    const validation = () => {
        let result = true;
        if (fname.length == 0 || lname.length == 0 || email.length == 0 || phon.length == 0) {
            result = false;
            seterror(true)
        }
        return result;
    }

    return (
        <>
            <div className="tj-inner-banner">
                <div className="container">
                    <h2>User Account</h2>
                </div>
            </div>

            <div className="tj-breadcrumb">
                <div className="container">
                    <ul className="breadcrumb-list">
                        <li><a href="/">Home</a></li>
                        <li className="active">User Account</li>
                    </ul>
                </div>
            </div>

            <section className="tj-account-frm">
                <div className="container">
                    <div className="row">


                        <div className="col-md-12 col-sm-12">
                            <div className="tj-tabs">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="active" id="userprofile"><a href="#" data-toggle="tab" value={type} onClick={() => handletab("userprofile")} ><i className="far fa-user"></i> My Account</a></li>
                                    <li id="bookinghistory"><a id="bookinghistory1" href="#" data-toggle="tab" value={type} onClick={() => handletab("bookinghistory")} ><i className="far fa-credit-card"></i> Booking History</a></li>
                                    <li id="userwallet"><a id="userwallet1" href="#" data-toggle="tab" value={type} onClick={() => handletab("userwallet")}><i className="far fa-credit-card"></i> User Wallet</a></li>
                                    <li id="changepass" ><a id="changepass1" href="#" data-toggle="tab" value={type} onClick={() => handletab("changepass")}><i className="fas fa-user"></i>&nbsp;Change Password</a></li>
                                    <li><a href="#" data-toggle="tab" onClick={handlelogout}><i className="fas fa-sign-out-alt"></i> Logout</a></li>
                                </ul>
                            </div>

                            {type === "userprofile" && <div className="tab-content">
                                <div className="tab-pane active" id="confirm_booking">
                                    {msg ? <div className='alert alert-success'>{msg}</div> : null}
                                    <div className="account-frm">
                                        <div className="col-md-6 col-sm-6">

                                            <div class="account-field">
                                                <label>First Name</label>
                                                <span class="far far fa-user"></span>
                                                <input type="text" value={fname} name="u_fname" onChange={(e) => setfname(e.target.value)} placeholder="Enter First Name" />
                                                {error && fname.length <= 0 ? <label style={{ color: "#e74c3c", fontWeight: "500" }}>This field is required</label> : null}

                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">

                                            <div class="account-field">
                                                <label>Last Name</label>
                                                <span class="far far fa-user"></span>
                                                <input type="text" value={lname} name="u_lname" onChange={(e) => setlname(e.target.value)} placeholder="Enter Last Name" />
                                                {error && lname.length <= 0 ? <label id="u_email-error" className="error" style={{ color: "#e74c3c", fontWeight: "500" }}>This field is required</label> : null}

                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div class="account-field">
                                                <label>Phone</label>
                                                <span class="icon-phone icomoon"></span>
                                                <input type="number" value={phon} name="u_phone" onChange={(e) => setphon(e.target.value)} placeholder="Enter Phone Number" />
                                                {error && phon.length <= 0 ? <label id="u_email-error" className="error" style={{ color: "#e74c3c", fontWeight: "500" }}>This field is required</label> : null}

                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">

                                            <div class="account-field">
                                                <label>Email</label>
                                                <span class="far fa-envelope"></span>
                                                <input type="email" value={email} name="u_email" onChange={(e) => setemail(e.target.value)} placeholder="Enter your Email Address" />
                                                {error && email.length <= 0 ? <label id="u_email-error" className="error" style={{ color: "#e74c3c", fontWeight: "500" }}>This field is required</label> : null}

                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <button className="save-btn" onClick={Updatehandler}>Update<i className="fa fa-arrow-circle-rNclassNameight" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            }
                            {type === "bookinghistory" && <BookingHistory />}
                            {type === "userwallet" && <UserWallet />}
                            {type === "changepass" && <ChangePassword />}

                        </div>
                    </div>
                </div>
            </section>

            <section className="tj-cal-to-action">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-sm-4">
                            <div className="cta-box">
                                <img src="images/cta-icon1.png" alt="" />
                                <div className="cta-text">
                                    <strong>Best Price Guaranteed</strong>
                                    <p>A more recently with desktop softy  like aldus page maker.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <div className="cta-box">
                                <img src="images/cta-icon2.png" alt="" />
                                <div className="cta-text">
                                    <strong>24/7 Customer Care</strong>
                                    <p>A more recently with desktop softy  like aldus page maker.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <div className="cta-box">
                                <img src="images/cta-icon3.png" alt="" />
                                <div className="cta-text">
                                    <strong>Easy Bookings</strong>
                                    <p>A more recently with desktop softy  like aldus page maker.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
export default Profile