import React from "react";

const Footer=()=>{
    return(
        <>
        <section class="tj-footer">
				<div class="container">
					<div class="row">
						<div class="col-md-6">
							<div class="about-widget widget">
								<h3>About Hire Me</h3>
								<p>Search for will uncover many web sites variables onto of passages of lorem ipsum available but the majority the words all predefined humour to met chunks recently with desktop.</p>
								<ul class="fsocial-links">
									<li><a href="javascript:void(0)"><i class="fab fa-facebook-f"></i></a></li>
									<li><a href="javascript:void(0)"><i class="fab fa-twitter"></i></a></li>
									<li><a href="javascript:void(0)"><i class="fab fa-linkedin-in"></i></a></li>
									<li><a href="javascript:void(0)"><i class="fab fa-pinterest-p"></i></a></li>
									<li><a href="javascript:void(0)"><i class="fab fa-instagram"></i></a></li>
								</ul>
							</div>
						</div>

						<div class="col-md-6">
							<div class="contact-info widget">
								<h3>Contact Info</h3>
								<ul class="contact-box">
									<li>
										<i class="fas fa-home" aria-hidden="true"></i>  {process.env.REACT_APP_ADDRESS}
									</li>
									<li>
										<i class="far fa-envelope-open"></i>
										<a href="javascript:void(0)">
											{process.env.REACT_APP_EMAIL}</a>
									</li>
									<li>
										<i class="fas fa-phone-square"></i>
										{process.env.REACT_APP_PHONE}
									</li>
									<li>
										<i class="fas fa-globe-asia"></i>
										<a href="/">www.Hireme.com</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* <!--Footer Content End--> */}
			{/* <!--Footer Copyright Start--> */}
			<section class="tj-copyright">
				<div class="container">
					<div class="row">
						<div class="col-md-6 col-sm-6">
							<p>&copy; Copyrights 2018 <a href="/">www.Hireme.com</a>. All Rights Reserved.</p>
						</div>

					</div>
				</div>
			</section>
        </>
    )
}
export default Footer