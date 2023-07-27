import React,{useEffect,useState} from "react";


const Register=()=>{
  const [print,setprint]=useState(false)
    useEffect(()=>{
       let username=sessionStorage.getItem('email')
       if(username==='' || username===null){
           setprint(true);
       }
   },[])

	return(
		<>
		
			<header class="tj-header">
				{/* <!--Header Content Start--> */}
				<div class="container">
					<div class="row">
						{/* <!--Toprow Content Start--> */}
						<div class="col-md-3 col-sm-4 col-xs-12">
							{/* <!--Logo Start--> */}
							<div class="tj-logo">
								<h1><a href="/">Hire Me</a></h1>
							</div>
							{/* <!--Logo End--> */}
						</div>
						<div class="col-md-3 col-sm-4 col-xs-12">
							<div class="info_box">
								<i class="fa fa-home"></i>
								<div class="info_text">
									<span class="info_title">Address</span>
									<span>Hire Me, United States</span>
								</div>
							</div>
						</div>
						<div class="col-md-3 col-sm-4 col-xs-12">
							<div class="info_box">
								<i class="fa fa-envelope"></i>
								<div class="info_text">
									<span class="info_title">Email Us</span>
									<span><a href="#"> Hireme@booking.com</a></span>
								</div>
							</div>
						</div>
						<div class="col-md-3 col-xs-12">
							<div class="phone_info">
								<div class="phone_icon">
									<i class="fas fa-phone-volume"></i>
								</div>
								<div class="phone_text">
									<span><a href="#"> +1-333-444-555</a></span>
								</div>
							</div>
						</div>
						{/* <!--Toprow Content End--> */}
					</div>
				</div>
				
				<div class="tj-nav-row">
					<div class="container">
						<div class="row">
							{/* <!--Nav Holder Start--> */}
							<div class="tj-nav-holder">
								{/* <!--Menu Holder Start--> */}
								<nav class="navbar navbar-default"> 
									<div class="navbar-header">
									  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#tj-navbar-collapse" aria-expanded="false"> 
										  <span class="sr-only">Menu</span>
										  <span class="icon-bar"></span> 
										  <span class="icon-bar"></span> 
										  <span class="icon-bar"></span>
									  </button>
									</div>
									{/* <!-- Navigation Content Start --> */}
									<div class="collapse navbar-collapse" id="tj-navbar-collapse">
									  <ul class="nav navbar-nav">
										<li class="dropdown"> <a href="/">Home</a>
										</li>
										<li>
											<a href="about">About Us</a>
										</li>
										<li>
											<a href="service">Services</a>
										</li>
									
										{/* <!-- <li class="dropdown"> <a href="/app-assets/#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Our Fleets<i class="fa fa-angle-down" aria-hidden="true"></i></a>
											<ul class="dropdown-menu">
												<li><a href="/app-assets/fleet-grid.html">Car Fleet Grid</a></li>
												<li><a href="/app-assets/fleet-list.html">Car Fleet List</a></li>
												<li><a href="/app-assets/fleet-detail.html">Fleet Detail</a></li>
											</ul>
										</li>
										<li class="dropdown"> <a href="/app-assets/#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Blog<i class="fa fa-angle-down" aria-hidden="true"></i></a>
											<ul class="dropdown-menu">
												<li><a href="/app-assets/blog.html">Our Blog</a></li>
												<li><a href="/app-assets/blog-list.html">Blog List</a></li>
												<li><a href="/app-assets/blog-detail.html">Blog Detail</a></li>
											</ul>
										</li>
										<li class="dropdown"> <a href="/app-assets/#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Pages<i class="fa fa-angle-down" aria-hidden="true"></i></a>
											<ul class="dropdown-menu">
												<li><a href="/app-assets/404.html">404</a></li>
												<li><a href="/app-assets/register.html">Register</a></li>
												<li><a href="/app-assets/login.html">Login</a></li>
												<li><a href="/app-assets/faq.html">FAQ</a></li>
												<li><a href="/app-assets/booking-form.html">Booking Form</a></li>
												<li><a href="/app-assets/confirm-booking.html">Confirm Booking</a></li>
												<li><a href="/app-assets/payment.html">Payment</a></li>
												<li><a href="/app-assets/payment-confirmation.html">Confirm Payment</a></li>
												<li><a href="/app-assets/booking-cancel.html">Booking Cancel</a></li>
												<li><a href="/app-assets/user-account.html">User Account</a></li>
											</ul>
										</li> --> */}

									
										<li>
											<a href="contactus">Contact Us</a>
										</li>
										
                    {
												print?
												<>
														<li>
												<a href="login">Resgister Driver</a>
											</li>
														<li>
												<a href="login">Login</a>
											</li>
												</>
											:<li>
												<a href="profile">myaccount</a>
											</li>
											}
								
											
										{/* <li>
											<a href="register">Register Driver</a>
										</li>
										<li>
											<a href="login">Login</a>
												
											
										</li> */}
									  </ul>
									</div>
									{/* <!-- Navigation Content Start --> */}
								</nav>
								{/* <!--Menu Holder End--> */}
								<div class="book_btn">
									<a href="booknow">Book Now <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></a>
								</div>
							</div>
							{/* <!--Nav Holder End--> */}
						</div>
					</div>
				</div>
			</header>

{/* <style>

select.error {
    border: 1px solid red !important;
    margin-bottom:15px;
}
input.error {
    border: 1px solid red !important;
}
label.error {
    margin-top:-10px;
}
</style> */}
<section class="tj-booking-frm">
  <div class="container">
    

    <div class="row">
      <div class="col-md-12 col-sm-12">
        <div class="tj-tabs">
          <ul class="nav nav-tabs" role="tablist">
            <li class="active"><a href="#point" data-toggle="tab">Driver Registration</a></li>
          </ul>
        </div>

        <div class="tab-content">
          <div class="tab-pane active" id="point">
            <form method="POST" class="booking-frm" enctype="multipart/form-data" action="/rocka/saveDriver"
              id="driver">

              <div class="col-md-6">
                <div class="form-holder">
                  <div class="row">
                    <h4 style={{marginLeft:"13px"}}>General Information</h4>
                    <div class="col-md-12">
                      {/* <!--Inner Holder Start--> */}
                      <div class="inner-holder form-group">
                        <label>City<span style={{color:"red"}}> *</span></label>
                        <select class="form-control" name="city_id">
                          <option value="">Select City</option>
                          
                          <option value="2">Ghaziabad</option>
                          
                        </select>
                      </div>
                      {/* <!--Inner Holder End--> */}
                    </div>
                    <div class="col-md-12">
                      {/* <!--Inner Holder Start--> */}
                      <div class="inner-holder form-group">
                        <label class="required">Category<span style={{color:"red"}}> *</span></label>
                        <select class="form-control" name="category_id">
                          <option value="">Select Category</option>
                          
                          <option value="9">Van
                          </option>
                          
                          <option value="11">micro
                          </option>
                          
                          <option value="12">MIni
                          </option>
                          

                        </select>
                      </div>
                      {/* <!--Inner Holder End--> */}
                    </div>
                    <div class="col-md-12">
                      {/* <!--Inner Holder Start--> */}
                      <div class="inner-holder">
                        <label>User Name<span style={{color:"red"}}> *</span></label>
                        <input name="username" type="email" class="form-control" id="username"/>
                      </div>
                      {/* <!--Inner Holder End--> */}
                    </div>


                    <div class="col-md-12">
                      {/* <!--Inner Holder Start--> */}
                      <div class="inner-holder">
                        <label>Password<span style={{color:"red"}}> *</span></label>
                        <input name="text_password" class="form-control" type="password" id="password"
                           minlength="6" maxlength="100"/>
                      </div>
                      {/* <!--Inner Holder End--> */}
                    </div>




                    <div class="col-md-12">
                      {/* <!--Inner Holder Start--> */}
                      <div class="inner-holder">
                        <label>First Name<span style={{color:"red"}}> *</span></label>
                        <input name="d_fname" type="text" class="form-control" id="d_fname"/>
                      </div>
                      {/* <!--Inner Holder End--> */}
                    </div>



                    <div class="col-md-12">
                      {/* <!--Inner Holder Start--> */}
                      <div class="inner-holder">
                        <label>Last Name<span style={{color:"red"}}> *</span></label>
                        <input name="d_lname" type="text" id="d_lname"/>
                      </div>
                      {/* <!--Inner Holder End--> */}
                    </div>
                    <div class="col-md-12">
                      {/* <!--Inner Holder Start--> */}
                      <div class="inner-holder">
                        <label>Contact Phone<span style={{color:"red"}}> *</span></label>
                        <input name="d_phone" type="number" id="d_phone"/>
                      </div>
                      {/* <!--Inner Holder End--> */}
                    </div>
                    <div class="col-md-12 col-sm-12">
                      {/* <!--Inner Holder Start--> */}
                      <div class="inner-holder">
                        <label>Address<span style={{color:"red"}}> *</span></label>
                        <input name="d_address" type="text" id="subject"/>
                      </div>
                      {/* <!--Inner Holder End--> */}
                    </div>
                    <div class="col-md-12">
                      {/* <!--Inner Holder Start--> */}
                      <div class="inner-holder">
                        <label>State<span style={{color:"red"}}> *</span></label>
                        <input name="d_state" type="text" id="state"/>
                      </div>
                      {/* <!--Inner Holder End--> */}
                    </div>
                    <div class="col-md-12">
                      {/* <!--Inner Holder Start--> */}
                      <div class="inner-holder">
                        <label>Zip Code<span style={{color:"red"}}> *</span> </label>
                        <input name="d_zip" type="text" id="zipcode"/>
                      </div>
                      {/* <!--Inner Holder End--> */}
                    </div>
                    <div class="col-md-12 col-sm-12" >
                      {/* <!--Inner Holder Start--> */}
                      <div class="inner-holder">
                        <label>Profile Photo</label>
                        <input type="file" name="profile_image" id="name"/>
                      </div>
                      {/* <!--Inner Holder End--> */}
                    </div>
                    <div class="col-md-12 col-sm-12" style={{marginTop: "20px"}}>
                      {/* <!--Inner Holder Start--> */}
                      <div class="inner-holder">
                        <label>License</label>
                        <input type="file" name="license_image" id="name"/>
                      </div>
                      {/* <!--Inner Holder End--> */}
                    </div>
                    <div class="col-md-12 col-sm-12" style={{marginTop: "20px"}}>
                      {/* <!--Inner Holder Start--> */}
                      <div class="inner-holder">
                        <label>Insurance</label>
                        <input type="file" name="insurance_image" id="name"/>
                      </div>
                      {/* <!--Inner Holder End--> */}
                    </div>
                    <div class="col-md-12 col-sm-12" style={{marginTop: "20px", marginBottom: "20px"}}>
                      {/* <!--Inner Holder Start--> */}
                      <div class="inner-holder">
                        <label>Registration Card</label>
                        <input type="file" name="rc_image" id="name"/>
                      </div>
                      {/* <!--Inner Holder End--> */}
                    </div>
           
                  </div>

                </div>
              </div>

              <div class="col-md-6">
                <div class="form-holder">

                  <div class="row">
                    <h4 style={{marginLeft: "13px"}}>Driver Car Registration</h4>
                    <div class="col-md-12">
                      {/* <!--Inner Holder Start--> */}
                      <div class="inner-holder">
                        <label>Car Name</label>
                        <input name="car_name" class="form-control" type="text"/>
                      </div>
                      {/* <!--Inner Holder End--> */}
                    </div>
                    <div class="col-md-12">
                      {/* <!--Inner Holder Start--> */}
                      <div class="inner-holder">
                        <label>Car Description</label>
                        <input name="car_desc" class="form-control" type="text"/>
                      </div>
                      {/* <!--Inner Holder End--> */}
                    </div>
                    <div class="col-md-12">
                      {/* <!--Inner Holder Start--> */}
                      <div class="inner-holder">
                        <label>Car Registration No</label>
                        <input name="car_reg_no" class="form-control" type="text"/>
                      </div>
                      {/* <!--Inner Holder End--> */}
                    </div>
                    <div class="col-md-12">
                      {/* <!--Inner Holder Start--> */}
                      <div class="inner-holder">
                        <label>Car Model</label>
                        <input name="car_model" class="form-control" type="text"/>
                      </div>
                      {/* <!--Inner Holder End--> */}
                    </div>

                  </div>

                </div>
              </div>
              <div class="col-md-12 col-sm-12">
                <div class="inner-holder">
                  <button class="book-btn" id="frm_submit_btn" type="submit">Submit <i class="fa fa-arrow-circle-right"
                      aria-hidden="true"></i></button>
                </div>
				</div>
            </form>
          </div>

        </div>
      </div>


    </div>



  </div>
</section>

<section class="tj-footer">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="about-widget widget">
                    <h3>About Hire Me</h3>
                    <p>Search for will uncover many web sites variables onto of passages of lorem ipsum available but the majority the words all predefined humour to met chunks recently with desktop.</p>
                    <ul class="fsocial-links">
                        <li><a href="/app-assets/http://www.facebook.com"><i class="fab fa-facebook-f"></i></a></li>
                        <li><a href="/app-assets/http://www.twitter.com"><i class="fab fa-twitter"></i></a></li>
                        <li><a href="/app-assets/http://www.linkedin.com"><i class="fab fa-linkedin-in"></i></a></li>
                        <li><a href="/app-assets/http://www.pinterest.com"><i class="fab fa-pinterest-p"></i></a></li>
                        <li><a href="/app-assets/http://www.instagram.com"><i class="fab fa-instagram"></i></a></li>
                    </ul>
                </div>
            </div>
         
            <div class="col-md-6">
                <div class="contact-info widget">
                    <h3>Contact Info</h3>
                    <ul class="contact-box">
                        <li>
                            <i class="fas fa-home" aria-hidden="true"></i>    10A, Hireme, San Andreno, United States
                        </li>
                        <li>
                            <i class="far fa-envelope-open"></i>
                            <a href="/app-assets/mailto:Hireme@booking.com">
                            Hireme@booking.com</a>
                        </li>
                        <li>
                            <i class="fas fa-phone-square"></i>
                            +1-333-444-555
                        </li>
                        <li>
                            <i class="fas fa-globe-asia"></i>
                            <a href="/rocka">www.Hireme.com</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>
{/* <!--Footer Content End-->
<!--Footer Copyright Start--> */}
<section class="tj-copyright">
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-sm-6">
                <p>&copy; Copyrights 2018 <a href="#">www.Hireme.com</a>. All Rights Reserved.</p>
            </div>
        </div>
    </div>
</section>
{/* </div> */}
     </>
    )
}

export default Register
