import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = () => {

	let navigate = useNavigate();

	const [user, setuser] = useState("");
	const [name, setname] = useState("");
	const [password, setpassword] = useState("");
	const [email, setemail] = useState("");
	const [phone, setphone] = useState("");
	const [msg, setmsg] = useState("")
	const [reger, setreger] = useState(false);
	const [show, setshow] = useState(false)
	const [pa,setpa]=useState(false)
	const [em,setem]=useState(false)
	const [Tnc,setTnc]=useState(false)

	const [logem, setlogem] = useState("");
	const [logpswd, setlogpswd] = useState("");
	const [err, seterr] = useState(false);
	const [error, seterror] = useState("");

	let ans = name.split(" ");
	let a1 = ans[0];
	let a2 = ans.slice(1,ans.length).join(' ');

	useEffect(() => {
		sessionStorage.clear();
	}, [])

	const Registerhandle = (e) => {
		e.preventDefault();
		if (RegValidation()) {
			let data = {
				"username": user,
				"u_name": name,
				"u_email": email,
				"u_password": password,
				"u_phone": phone,
				"c_code": "91",
				"city_id": "14",
				"u_fname": a1,
				"u_lname": a2
			}

			fetch(`${process.env.REACT_APP_URL}/userapi/registration?`, {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			}).then((res) => {
				res.json().then((result) => {
					if (res.status == 200) {
						console.log("success")
						setmsg(result.message)
						setshow(true)
						setreger(false)
						setuser("")
						setname("")
						setemail("")
						setpassword("")
						setphone("")
						setTnc(false)
					} else {
						setmsg(result.message)
						setshow(false)
						setreger(false)
					}
				})
			})

		}
	}

	const ProcedLogin = (e) => {
		e.preventDefault();
		if (validation()) {
			console.log('Proceed');

			let data = {
				"u_email": logem,
				"u_password": logpswd
			}

			fetch(`${process.env.REACT_APP_URL}/userapi/login?`, {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			}).then((res) => {
				res.json().then((result) => {
					console.log(result.response, "r");
					if (res.status == 200) {
						console.log(res, "res")
						sessionStorage.setItem("email", logem);
						sessionStorage.setItem("key", result.response.api_key);
						sessionStorage.setItem("password", result.response.u_password);
						sessionStorage.setItem("name",result.response.u_name)
						sessionStorage.setItem("phone",result.response.u_phone)
						sessionStorage.setItem("fname",result.response.u_fname)
						sessionStorage.setItem("lname",result.response.u_lname)
						sessionStorage.setItem("userid",result.response.user_id)
						let path = '/'
						navigate(path)
						window.location.reload()
					} else {
						seterror(result.message)
					}
				})
			})
		}
	}

	const validation = () => {
		let result = true;
		if (logem.length == 0 || logpswd.length == 0) {
			result = false;
			seterr(true)
		}
		return result;
	}

	const RegValidation = () => {
		let result = true;
		if (user.length == 0 || email.length == 0 || password.length == 0 || name.length == 0 || phone.length == 0 || Tnc==false) {
			result = false;
			setreger(true)
		}

		if(password.length<=5){
			result=false;
			setpa(true);
		}
		let regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
		if(!regex.test(email)){
			result=false;
			setem(true);
		}
		return result
	}

	return (
		<>
			<div class="tj-inner-banner">
				<div class="container">
					<h2>Login</h2>
				</div>
			</div>



			<div class="tj-breadcrumb">
				<div class="container">
					<ul class="breadcrumb-list">
						<li><a href="/">Home</a></li>
						<li class="active">Login</li>
					</ul>
				</div>
			</div>


			<section class="tj-login">
				<div class="container">
					<div class="row">
						<div class="col-md-12 col-sm-12">
							{/* <!--Tabs Nav Start--> */}
							<div class="tj-tabs">
								<ul class="nav nav-tabs" role="tablist">
									<li class="active"><a href="#login" data-toggle="tab">Login</a></li>
									<li><a href="#register" data-toggle="tab">Register</a></li>
								</ul>
							</div>

							<div class="tab-content">
								{/* <!--Login Tabs Content Start--> */}
								<div class="tab-pane active" id="login">
									<div class="col-md-6 col-sm-6">
										<div class="login-cta">
											<ul class="cta-list">
												<li>
													<span class="icon-mail-envelope icomoon"></span>
													<div class="cta-info">
														<strong>30 Days Money Back Guarantee</strong>
														<p>A more recently with desktop softy like aldus pages maker still versions have evolved.</p>
													</div>
												</li>
												<li>
													<span class="icon icon-Headset"></span>
													<div class="cta-info">
														<strong>24/7 Customer Support</strong>
														<p>A more recently with desktop softy like aldus pages maker still versions have evolved.</p>
													</div>
												</li>
												<li>
													<span class="icon-lock icomoon"></span>
													<div class="cta-info">
														<strong>100% Secure Payment</strong>
														<p>A more recently with desktop softy like aldus pages maker still versions have evolved.</p>
													</div>
												</li>
											</ul>
										</div>
									</div>
									<div class="col-md-6 col-sm-6">
										<form onSubmit={ProcedLogin} class="login-frm" id="login_form">
									        {error?<div className='alert alert-success'>{error}</div>:null}
											<div class="field-holder">
												<span class="far fa-envelope"></span>
												<input type="email" value={logem} name="u_email" onChange={(e) => setlogem(e.target.value)} placeholder="Enter your Email Address" />
												{err && logem.length <= 0 ? <label id="name-error" className="error"style={{ color: "#e74c3c",marginBottom:"20px",fontWeight:"500",fontSize:"15px" }}>This field is required</label> : null}

											</div>
											<div class="field-holder">
												<span class="fas fa-lock"></span>
												<input type="password" value={logpswd} name="u_password" onChange={(e) => setlogpswd(e.target.value)} placeholder="Password" />
												{err && logpswd.length <= 0 ? <label id="u_email-error" className="error" style={{ color: "#e74c3c",marginBottom:"10px",fontWeight:"500",fontSize:"15px" }}>This field is required</label> : null}

											</div>
											<a href="/forgetpassword" class="forget-pass">Forget Password?</a>
											<button type='submit' class="reg-btn">Login <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></button>

										</form>
									</div>
								</div>
								{/* <!--Login Tabs Content End-->
								<!--Register Tabs Content Start--> */}
								<div class="tab-pane" id="register">
									<div class="col-md-6 col-sm-6">
										<div class="login-cta">
											<ul class="cta-list">
												<li>
													<span class="icon-mail-envelope icomoon"></span>
													<div class="cta-info">
														<strong>30 Days Money Back Guarantee</strong>
														<p>A more recently with desktop softy like aldus pages maker still versions have evolved.</p>
													</div>
												</li>
												<li>
													<span class="icon icon-Headset"></span>
													<div class="cta-info">
														<strong>24/7 Customer Support</strong>
														<p>A more recently with desktop softy like aldus pages maker still versions have evolved.</p>
													</div>
												</li>
												<li>
													<span class="icon-lock icomoon"></span>
													<div class="cta-info">
														<strong>100% Secure Payment</strong>
														<p>A more recently with desktop softy like aldus pages maker still versions have evolved.</p>
													</div>
												</li>
											</ul>
										</div>
									</div>
									<div class="col-md-6 col-sm-6">

										<form onSubmit={Registerhandle} class="reg-frm" id="reg_form" >
											{show ? <div className='alert alert-success'>Register Successfully</div>:""}
											{msg ? <div className='alert alert-success'>{msg}</div>:""}
											<div class="field-holder">
												<span class="far fa-user"></span>
												<input type="text" name="username" value={user} onChange={(e) => setuser(e.target.value)} placeholder="Username" />
												{reger && user.length <= 0 ? <label id="name-error" className="error"style={{ color:"#e74c3c", fontWeight:"500",fontSize:"15px" }}>This field is required</label> : null}

											</div>
											<div class="field-holder">
												<span class="far fa-user"></span>
												<input type="text" name="u_name" value={name} onChange={(e) => setname(e.target.value)} placeholder="Full Name" />
												{reger && name.length <= 0 ? <label id="u_email-error" className="error" style={{ color:"#e74c3c", fontWeight:"500",fontSize:"15px" }}>This field is required</label> : null}

											</div>
											<div class="field-holder">
												<span class="far fa-envelope"></span>

												<input type="text" name="u_email" value={email} onChange={(e) => setemail(e.target.value)} placeholder="Email Address" />
												{reger && email.length <= 0 ? <label id="u_email-error" className="error" style={{ color:"#e74c3c", fontWeight:"500",fontSize:"15px" }}>This field is required</label> : null}
												{em &&email.length>=1 &&email.length<= 12 ? <label id="u_email-error" className="error" style={{ color:"#e74c3c", fontWeight:"500",fontSize:"15px" }}>Email does not exists</label> : null}

											</div>
											<div class="field-holder">
												<span class="fas fa-lock"></span>
												<input type="password" name="u_password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Password" />
												{reger && password.length <= 0 ? <label id="u_email-error" className="error" style={{ color:"#e74c3c", fontWeight:"500",fontSize:"15px" }}>This field is required</label> : null}
												{pa &&password.length>=1 && password.length <= 5 ? <label id="u_email-error" className="error" style={{ color:"#e74c3c", fontWeight:"500",fontSize:"15px" }}>Length should be greator then 6</label> : null}
											</div>
											<div class="field-holder">
												<span class="fas fa fa-phone"></span>
												<input type="number" name="u_phone" value={phone} onChange={(e) => setphone(e.target.value)} placeholder="Phone No." />
												{reger && phone.length <= 6 ? <label id="u_email-error" className="error" style={{ color:"#e74c3c", fontWeight:"500",fontSize:"15px" }}>This field is required</label> : null}

											</div>
											<label for="terms">
												<input type="checkbox" checked={Tnc} onChange={(e)=>setTnc(e.target.checked)} name="terms" id="terms" />
												I accept terms & conditions<br/>
												{reger && Tnc==false ? <label id="u_email-error" className="error" style={{ color:"#e74c3c", fontWeight:"500",fontSize:"15px" }}>This field is required</label> : null}
											</label>
											<button type="submit" class="reg-btn">Signup <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></button>
											
										</form>
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
			</section>
			{/* <!--Login Section End-->	
			
			<!--Call To Action Content Start--> */}
			<section class="tj-cal-to-action">
				<div class="container">
					<div class="row">
						<div class="col-md-4 col-sm-4">
							<div class="cta-box">
								<img src="images/cta-icon1.png" alt="" />
								<div class="cta-text">
									<strong>Best Price Guaranteed</strong>
									<p>A more recently with desktop softy  like aldus page maker.</p>
								</div>
							</div>
						</div>
						<div class="col-md-4 col-sm-4">
							<div class="cta-box">
								<img src="images/cta-icon2.png" alt="" />
								<div class="cta-text">
									<strong>24/7 Customer Care</strong>
									<p>A more recently with desktop softy  like aldus page maker.</p>
								</div>
							</div>
						</div>
						<div class="col-md-4 col-sm-4">
							<div class="cta-box">
								<img src="images/cta-icon3.png" alt="" />
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

export default Login