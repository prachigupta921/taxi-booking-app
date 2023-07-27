import React,{ useState} from "react";

const ContactUs = () => {
    const [name,setname]=useState("")
    const [email,setemail]=useState("")
    const [sub,setsub]=useState("")
    const [message,setmessage]=useState("")
    const [error,seterror]=useState("")

   const messageHandle=(e)=>{
    e.preventDefault()
    if(validation()){
        console.log(name,email,sub,message,"details")
    }
   }

   const validation = () => {
    let result = true
    if (name.length === 0 || email.length===0 || sub.length===0) {
        result = false;
        seterror(true)
    }
    return result
}
    return (
        <>
            <div class="tj-inner-banner">
                <div class="container">
                    <h2>Contact Us</h2>
                </div>
            </div>
            <div class="tj-breadcrumb">
                <div class="container">
                    <ul class="breadcrumb-list">
                        <li><a href="/">Home</a></li>
                        <li class="active">Contact Us</li>
                    </ul>
                </div>
            </div>

            <section class="tj-contact-section">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 col-sm-12">
                            <div class="tj-heading-style">
                                <h3>Contact Us</h3>
                                <p>Lorem Ipsum passages, and more recently with desktop publishing software like aldus pageMaker including versions of all the Lorem Ipsum generators</p>
                            </div>
                        </div>
                        <div class="col-md-8 col-sm-8">
                            <div class="form-holder">
                                <form onSubmit={messageHandle} class="tj-contact-form" id="contact-form">
                                    <div class="row">
                                        <div class="col-md-6 col-sm-6">
                                            <div class="inner-holder">
                                                <label for="name">Name</label>
                                                <input placeholder="Enter Your Name" value={name} onChange={(e)=>setname(e.target.value)} name="name" type="text" id="name" />
                                                {error && name.length <= 0 ? <label className="error" id="form-error" style={{ color: "#e74c3c" }}>This field is required</label> : null}
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-sm-6 no-pad">
                                            <div class="inner-holder">
                                                <label for="email">Email</label>
                                                <input placeholder="Enter Your Email" value={email} onChange={(e)=>setemail(e.target.value)} name="email" type="email" id="email" />
                                                {error && email.length <= 0 ? <label className="error" id="form-error" style={{ color: "#e74c3c" }}>This field is required</label> : null}
                                            </div>
                                        </div>
                                        <div class="col-md-12 col-sm-12">
                                            <div class="inner-holder">
                                                <label for="subject">Subject</label>
                                                <input placeholder="Your Subject" name="subject" value={sub} onChange={(e)=>setsub(e.target.value)} type="text" id="subject" />
                                                {error && sub.length <= 0 ? <label className="error" id="form-error" style={{ color: "#e74c3c" }}>This field is required</label> : null}
                                            </div>
                                        </div>
                                        <div class="col-md-12 col-sm-12">
                                            <div class="inner-holder">
                                                <label for="message">Message</label>
                                                <textarea name="message" placeholder="Your Message" value={message} onChange={(e)=>setmessage(e.target.value)} id="message"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-md-12 col-sm-12">
                                            <div class="inner-holder">
                                                <button class="btn-submit" id="frm_submit_btn" type="submit">Send Message <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4">
                            <div class="address-box">
                                <div class="add-info">
                                    <span class="icon-map icomoon"></span>
                                    <p>{process.env.REACT_APP_ADDRESS}</p>
                                    {/* <p>Hire Me, Orlando,<br /> United States</p> */}
                                </div>
                                <div class="add-info">
                                    <span class="icon-phone icomoon"></span>
                                    <p>
                                        <a href="javascript:void(0)"> {process.env.REACT_APP_PHONE}</a>
                                    </p>
                                </div>
                                <div class="add-info">
                                    <span class="icon-mail-envelope-open icomoon"></span>
                                    <p>
                                        <a href="javascript:void(0)">
                                           {process.env.REACT_APP_EMAIL}</a>

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--Contact Section End-->	
			<!--Call To Action Content Start--> */}
            <section class="tj-cal-to-action">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4 col-sm-4">
                            <div class="cta-box">
                                <img src="/images/cta-icon1.png" alt="" />
                                <div class="cta-text">
                                    <strong>Best Price Guaranteed</strong>
                                    <p>A more recently with desktop softy  like aldus page maker.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4">
                            <div class="cta-box">
                                <img src="/images/cta-icon2.png" alt="" />
                                <div class="cta-text">
                                    <strong>24/7 Customer Care</strong>
                                    <p>A more recently with desktop softy  like aldus page maker.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4">
                            <div class="cta-box">
                                <img src="/images/cta-icon3.png" alt="" />
                                <div class="cta-text">
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
export default ContactUs