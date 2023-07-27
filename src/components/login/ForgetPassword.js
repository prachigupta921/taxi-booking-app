import React,{useState} from "react";

const ForgetPassword=()=>{
	const [forgotpass,setforgotpass]=useState("")
	const [err,seterr]=useState(false)
	const [msg,setmsg]=useState("")

	const handleForgetPassword=(e)=>{
		e.preventDefault();
		if(validation()){
			let data={
				"u_email":forgotpass
			}
			console.log("success")
			fetch(`${process.env.REACT_APP_URL}/userapi/forgetpassword?`,{
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			}).then((res)=>{
				res.json().then((result)=>{
					console.log(result,"r")
					if(res.status == 200){
						setmsg("Check Your Email")
					}else{
						setmsg(result.message)
					}
				})
			})
		}
	}
	const validation=()=>{
		let result=true;
		if(forgotpass.length==0){
			result=false;
			seterr(true)
		}
		return result
	}
    return(
        <>
       
			{/* <!--Header Content End-->
			
			<!--Inner Banner Section Start--> */}
	    	<div class="tj-inner-banner">
	    		<div class="container">
	    			<h2>Forgot Password</h2>
	    		</div>
	    	</div>
			{/* <!--Inner Banner Section End-->
			
			<!--Breadcrumb Section Start--> */}
	    	<div class="tj-breadcrumb">
				<div class="container">
					<ul class="breadcrumb-list">
						<li><a href="/">Home</a></li>
						<li class="active">Forgot Password</li>
					</ul>
				</div>
	    	</div>
			{/* <!--Breadcrumb Section End-->	
			
			<!--Register Section Start-->	 */}
			<section class="tj-register">
				<div class="container">
					<div class="row">
						<div class="col-md-12 col-sm-12">
						<div class="tj-tabs">
								<ul class="nav nav-tabs" role="tablist">
									<li class="active"><a href="#login" data-toggle="tab">Forgot Password</a></li>
							
								</ul>
							</div>
							<div class="tab-content">
								<div class="tab-pane" id="login">
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
							
								</div>
								<div class="tab-pane active" id="register">
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
									<div class="col-md-6 ">
										<form onSubmit={handleForgetPassword} class="login-frm" id="forget-form">
										   {msg?<div className='alert alert-success'>{msg}</div>:null}
										   
											<div class="field-holder">
                                                <span class="far fa-envelope"></span>
                                                <input type="email" name="u_email" value={forgotpass} onChange={(e)=>setforgotpass(e.target.value)}  placeholder="Enter your Email Address"/>
                                                {err && forgotpass.length<=0?<label id="u_email-error" className="error" for="u_email" style={{color:"#e74c3c", fontWeight:"500", marginBottom:"15px",fontSize:"15px"}} >This field is required</label>:null}
                                                
											</div>
											<button type="submit" class="reg-btn">Submit <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></button>
											
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			
        </>
    )
}
export default ForgetPassword