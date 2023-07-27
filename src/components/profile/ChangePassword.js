import React, { useState } from "react";

const ChangePassword = () => {
    const [oldpass, setoldpass] = useState("");
    const [newpass, setnewpass] = useState("");
    const [confirmpass, setconfirmpass] = useState("");
    const [error, seterror] = useState(false)
    const [match, setmatch] = useState(false)
    const [message, setmessage] = useState("")

    const apikey = sessionStorage.getItem("key")
    const userid = sessionStorage.getItem("userid")

    const changehandler = (e) => {
        e.preventDefault()
        if (validation()) {
            let item = {
                "u_password": oldpass,
                "new_password": newpass
            }
            console.log(oldpass, newpass, confirmpass, "pass")
            fetch(`${process.env.REACT_APP_URL}/userapi/updateuserpassword?api_key=${apikey}&user_id=${userid}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            }).then((res) => {
                res.json().then((data) => {
                    if (res.status == 200) {
                        setmessage("Password Updated")
                        console.log("success")
                        setmatch(false)
                        seterror(false)
                    } else {
                        setmatch(false)
                        setmessage(data.message)
                        seterror(false)
                    }
                })
            })


        }
    }

    const validation = () => {
        let result = true;
        if (oldpass.length == 0 || newpass.length == 0 || confirmpass.length == 0) {
            result = false;
            seterror(true);
            setmessage(false)
        }
        if (newpass != confirmpass) {
            result = false;
            setmatch(true)
            setmessage(false)
        }
        return result
    }
    return (
        <>
            <div class="tab-content">

                <div class="tab-pane active" id="confirm_booking">
                    <div class="account-frm">
                        {message ? <div className='alert alert-success'>{message}</div> : null}
                        {match ? <div className='alert alert-success'>Confirm Password Not Matched</div> : null}
                        <div class="col-md-4 col-sm-4">
                            <div class="account-field">
                                <label>Old Password</label>
                                <span class="fas fa-lock"></span>
                                <input type="password" value={oldpass} name="old_pass" onChange={e => setoldpass(e.target.value)} placeholder="Password" />
                                {error && oldpass.length <= 0 ? <label style={{ color: "#e74c3c", fontWeight: "500" }}>This field is required</label> : null}
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4">
                            <div class="account-field">
                                <label>New Password</label>
                                <span class="fas fa-lock"></span>
                                <input type="password" value={newpass} name="new_pass" onChange={e => setnewpass(e.target.value)} placeholder="Password" />
                                {error && newpass.length <= 0 ? <label style={{ color: "#e74c3c", fontWeight: "500", top: "10px" }}>This field is required</label> : null}
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4">
                            <div class="account-field">
                                <label>Confirm Password</label>
                                <span class="fas fa-lock"></span>
                                <input type="password" value={confirmpass} name="confirm_pass" onChange={e => setconfirmpass(e.target.value)} placeholder="Password" />
                                {error && confirmpass.length <= 0 ? <label style={{ color: "#e74c3c", fontWeight: "500" }}>This field is required</label> : null}
                            </div>
                        </div>

                        <div class="col-md-12">
                            <button onClick={changehandler} class="save-btn">Change &nbsp;<i class="fa fa-arrow-circle-right" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>
            </div>
           
        </>
    )
}
export default ChangePassword