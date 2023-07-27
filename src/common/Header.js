import React,{useState,useEffect} from "react";

const Header=()=>{

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
									{/* <span>{process.env.REACT_APP_ADDRESS}</span> */}
									<span>10A, Hireme, San Andreno, United States</span>
								</div>
							</div>
						</div>
						<div class="col-md-3 col-sm-4 col-xs-12">
							<div class="info_box">
								<i class="fa fa-envelope"></i>
								<div class="info_text">
									<span class="info_title">Email Us</span>
									<span><a href="javascript:void(0)"> {process.env.REACT_APP_EMAIL}</a></span>
								</div>
							</div>
						</div>
						<div class="col-md-3 col-xs-12">
							<div class="phone_info">
								<div class="phone_icon">
									<i class="fas fa-phone-volume"></i>
								</div>
								<div class="phone_text">
									<span><a href="javascript:void(0)">{process.env.REACT_APP_PHONE}</a></span>
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
											<li>
												<a href="contactus">Contact Us</a>
											</li>

                                            {
												print?
												<>
													
														<li>
												<a href="login">Login</a>
											</li>
												</>
											:<li>
												<a href="profile">My Account</a>
											</li>
											}
											<li>
											</li>
										</ul>
									</div>
									{/* <!-- Navigation Content Start --> */}
								</nav>
								{/* <!--Menu Holder End--> */}
								<div class="book_btn">
									<a href="booknow">Book Now <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></a>
								</div>
							</div>
							{/*<!--Nav Holder End--> */}
						</div>
					</div>
				</div>
			</header>
        </>
    )
}
export default Header