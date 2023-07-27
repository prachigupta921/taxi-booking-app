import React, { useState, useEffect } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';
import "../profile/booking.css"
import moment from "moment";
import { NavLink, useNavigate } from "react-router-dom";
import DateMomentUtils from "@date-io/moment";
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";

const Home = () => {
	const [drop, setdrop] = useState("")
	const [address, setaddress] = useState("")
	const [citydrop, setcitydrop] = useState([])
	const [city, setcity] = useState("");
	const [category, setcategory] = useState("");
	const [catdata, setcatdata] = useState([]);
	const [select, setselect] = useState(new Date());
	const [time, settime] = useState(new Date());
	const [fullname, setfullname] = useState(sessionStorage.getItem("name"));
	const [phone, setphone] = useState(sessionStorage.getItem("phone"));
	const [email, setemail] = useState(sessionStorage.getItem("email"));
	const [message, setmessage] = useState(false)
	const [err,seterr] = useState(false)
	const [cate,setcate]=useState("")
	const [base,setbase]=useState("")
	const [farekm, setfarekm] = useState("")
    const [faremin, setfaremin] = useState("")

	const navigate=useNavigate()

	let username = sessionStorage.getItem('email')

	const handlesignout = () => {
		let path="/login"
		navigate(path)
	}
	const apikey = sessionStorage.getItem("key")
	const userid = sessionStorage.getItem("userid")

	
	const [coordinate, setcoordinate] = useState({
		lat: null,
		lng: null
	})
	const [coord, setcoord] = useState({
		lat: null,
		lng: null
	})

	const handleSelect = async value => {
		const result = await geocodeByAddress(value);
		const l1 = await getLatLng(result[0]);
		setaddress(value)
		setcoordinate(l1)
	}

	const handleDrop = async value => {
		const result = await geocodeByAddress(value);
		const l2 = await getLatLng(result[0]);
		setdrop(value)
		setcoord(l2)
	}

	useEffect(() => {
		handleCat()
	}, [])

	const handleCat = () => {
		fetch(`${process.env.REACT_APP_URL}/categoryapi/getcategoriesv1`, {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
		})
			.then((res) => {
				return res.json();
			}).then((data) => {
				setcatdata(data.response)
			})
	}

	useEffect(() => {
		citiesapi()
	}, [])

	const citiesapi = () => {
		
		fetch(`${process.env.REACT_APP_URL}/cityapi/getcities?api_key=${apikey}`, {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
		})
			.then((res) => {
				return res.json();
			}).then((data) => {
				setcitydrop(data.response)
			})
	}

	let Base_price = base;
	let Base_fare_per_km = farekm
    let fare_per_min = faremin
	let sr = 30;

	let jtf=(parseInt(Base_price)+((Base_fare_per_km) * (4.7)) + ((fare_per_min) * (22)));
	let ST = (((parseInt(Base_price)) + (Base_fare_per_km * parseInt(4.7)) + (fare_per_min * parseInt(22))) * (sr / 100)).toFixed(2)
	let GTF = (jtf + Number(ST)).toFixed(2)

	const selectitem = (e) => {
		setcategory(e)
		catdata.map((res, ind) => {
		    if (e == res.category_id) {
				setcate(res.cat_name)
				setbase(res.cat_base_price)
				setfarekm(res.cat_fare_per_km)
                setfaremin(res.cat_fare_per_min)
		    }
		})
	}
	const form = moment(select).format("YYYY-MM-DD")
	const ftime=moment(time).format("HH:mm")
	const time_date=form+" "+ftime

	var d=new Date(time_date);
    var utc_offset=d.getTimezoneOffset();
    d.setMinutes(d.getMinutes()+utc_offset);
    const GMTtime=moment(d).format("YYYY-MM-DD"+" "+"HH:mm")

	const handleBooknow = (e) => {
		e.preventDefault()
		if(validation()){
			let data = {
                "trip_date": GMTtime,
                "cat_name": cate,
                "trip_from_loc": address,
                "trip_to_loc":drop,
                "city_id": city,
                "user_id": userid,
                "category_id": category,
                "trip_currency": "$",
                "trip_base_fare": jtf,
                "trip_scheduled_pick_lat": coordinate.lat,
                "trip_scheduled_pick_lng": coordinate.lng,
				"trip_scheduled_drop_lat":coord.lat,
                "trip_scheduled_drop_lng":coord.lng,
                "trip_distance": "4.7",
                "trip_dunit": "km",
                "trip_type": "normal",
                "trip_total_time": "22",
                "trip_pay_amount": GTF,
                "seats": "1",
                "trip_status":"request",
                "is_share":"0",
                "is_delivery":"0",
				"tax_amt":ST
            }

			fetch(`${process.env.REACT_APP_URL}/tripapi/save?api_key=${apikey}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then((res) => {
                res.json().then((result) => {
                    console.log(result, "r");
                    if (res.status == 200) {
                        setmessage(true)
                        setselect(new Date())
                        settime(time)
                        setcity("")
                        setcategory("")
                        setaddress("")
                        setdrop("")
						seterr(false)
                    } else {
                        alert("not");
                    }
                })
            })
		}
	}

	const validation=()=>{
		let result =true;
		if(address.length==0 || drop.length==0 || city.length==0 || category.length==0 || time.length==0){
			result=false
			seterr(true)
			setmessage(false)
		}
		return result
	}

	return (
		<>
			<section class="tj-banner-form">
				<div class="container">
					<div class="row">
						{/* <!--Header Banner Caption Content Start--> */}
						<div class="col-md-8 col-sm-7">
							<div class="banner-caption">
								<div class="banner-inner bounceInLeft animated delay-2s">
									<strong>More recently with desktop publishing software including versions</strong>
									<h2>Upto 25% off on first booking through your app</h2>
									<div class="banner-btns">
										<a href="javascript:void(0)" class="btn-style-1"><i class="fab fa-apple"></i> Download App</a>
										<a href="javascript:void(0)" class="btn-style-2"><i class="fab fa-android"></i> Download App</a>
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-4 col-sm-5">

							<div className="trip-outer">
								<div class="trip-type-tabs">
									<ul class="nav nav-tabs">
									</ul>
								</div>

								{/* <!--Banner Tab Content Start--> */}
								<div className="tab-content">
									{message?<div className='alert alert-success'>Trip Saved</div>:null}
									<center style={{ paddingBottom: "10px" }}>
										<h3><u>Book Now</u></h3>
									</center>


									<div class="tab-pane active" id="one-way">

										{/* <!--Banner Form Content Start--> */}
										<div class="trip-type-frm" id="User-Form">
											<div class="field-outer">
												<PlacesAutocomplete
													value={address}
													onChange={setaddress}
													onSelect={handleSelect}
												>
													{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
														<div>
															<span className="fas fa-map-marker-alt"></span>
															<input
																{...getInputProps({
																	placeholder: 'Drop Location',
																	className: 'location-search-input',
																})}
															/>
															<div className="autocomplete-dropdown-container">
																{loading && <div>Loading...</div>}
																{suggestions.map(suggestion => {
																	const className = suggestion.active
																		? 'suggestion-item--active'
																		: 'suggestion-item';
																	// inline style for demonstration purpose
																	const style = suggestion.active
																		? { backgroundColor: '#fafafa', cursor: 'pointer' }
																		: { backgroundColor: '#ffffff', cursor: 'pointer', };
																	return (
																		<div className="input-suggestion"
																			{...getSuggestionItemProps(suggestion, {
																				//className,
																				style,
																			})}
																		>
																			<i class="material-icons ">location_on</i> <span className="input-type">{suggestion.description}</span>
																		</div>
																	);
																})}
															</div>
														</div>
													)}
												</PlacesAutocomplete>
												{err && address.length<=0?<label id="point_start_loc-error" style={{color:"#e74c3c", fontWeight:"500",fontSize:"15px"}} className="error">This field is required</label>:null}
											</div>
											
											<div class="field-outer">

												<PlacesAutocomplete
													value={drop}
													onChange={setdrop}
													onSelect={handleDrop}
												>
													{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
														<div>
															<span className="fas fa-map-marker-alt"></span>
															<input
																{...getInputProps({
																	placeholder: 'Pickup Location',
																	className: 'location-search-input',
																})}
															/>
															<div className="autocomplete-dropdown-container">
																{loading && <div>Loading...</div>}
																{suggestions.map(suggestion => {
																	const className = suggestion.active
																		? 'suggestion-item--active'
																		: 'suggestion-item';
																	const style = suggestion.active
																		? { backgroundColor: '#fafafa', cursor: 'pointer' }
																		: { backgroundColor: '#ffffff', cursor: 'pointer', };
																	return (
																		<div className="input-suggestion"
																			{...getSuggestionItemProps(suggestion, {
																				style,
																			})}
																		>
																			<i class="material-icons ">location_on</i> <span className="input-type">{suggestion.description}</span>
																		</div>
																	);
																})}
															</div>
														</div>
													)}
												</PlacesAutocomplete>
												{err && drop.length<=0?<label id="point_start_loc-error" style={{color:"#e74c3c", fontWeight:"500",fontSize:"15px"}} className="error">This field is required </label>:null}
												
											</div>
											<div class="field-outer">
												<span class="fa fa-city"></span>
												<select class="form-control" value={city} onChange={e => setcity(e.target.value)} name="city" id="city_id">
													<option value="">Select City</option>

													{citydrop.map((res) => {
														return (
															<>
																<option value={res.city_id}>{res.city_name}</option>
															</>
														)
													})}

												</select>
												{err && city.length<=0?<label id="point_start_loc-error" style={{color:"#e74c3c", fontWeight:"500",fontSize:"15px"}} className="error">This field is required</label>:null}
											</div>

											<div class="field-outer">
												<span class="fa fa-taxi"></span>
												<select class="form-control" name="category"  value={category} onChange={(e) => selectitem(e.target.value)} id="category_id">
													<option value="">Select Category</option>
													{catdata.map((res) => {
														return (
															<>
																<option value={res.category_id}>{res.cat_name}</option>
															</>
														)
													})}

												</select>
												{err && category.length<=0?<label id="point_start_loc-error" style={{color:"#e74c3c", fontWeight:"500",fontSize:"15px"}} className="error">This field is required</label>:null}
												
											</div>

											<div className="field-outer span-icon">
												<span class="fas fa-calendar-alt"></span>
												<MuiPickersUtilsProvider  utils={DateMomentUtils}>
                                                            <DatePicker disablePast format="DD/MM/yyyy" value={select} onChange={setselect} />
                                                        </MuiPickersUtilsProvider>
											</div>
											<div className="field-outer span-icon">
												<span class="far fa-clock"></span>
												<div class="time_pick">
												<MuiPickersUtilsProvider utils={DateMomentUtils}>
                                                            <TimePicker format="HH:mm A"
                                                                value={time} onChange={settime} />
                                                        </MuiPickersUtilsProvider>
													{/* {err && time.length<=0?<label id="point_start_loc-error" className="error">This field is required</label>:null} */}
												</div>
											</div>
											<div class="field-outer">
												<span class="far fa-user-circle"></span>
												<input type="text" name="username" value={fullname} onChange={e => setfullname(e.target.value)} placeholder="Enter Full Name" readOnly/>
												{err && fullname.length<=0?<label id="point_start_loc-error" style={{color:"#e74c3c", fontWeight:"500",fontSize:"15px"}} className="error">This field is required</label>:null}
											</div>

											<div class="field-outer">
												<span class="far fa-envelope"></span>
												<input type="text" name="username" value={email} onChange={e => setemail(e.target.value)} placeholder="Enter Email Address" readOnly />
												{err && email.length<=0?<label id="point_start_loc-error" style={{color:"#e74c3c", fontWeight:"500",fontSize:"15px"}} className="error">This field is required</label>:null}
											</div>

											<div class="field-outer">
												<span class="far fa fa-phone-square"></span>
												<input type="number" name="username" value={phone} onChange={e => setphone(e.target.value)} placeholder="Enter Phone Number" readOnly/>
												{err && phone.length<=0?<label id="point_start_loc-error" style={{color:"#e74c3c", fontWeight:"500",fontSize:"15px"}} className="error">This field is required</label>:null}
											</div>
											

											{username === '' || username === null? <button onClick={handlesignout} name="booking" class="search-btn">Book Now <i
												class="fa fa-arrow-circle-right" aria-hidden="true"></i></button> : <button type="submit" name="booking" onClick={handleBooknow} class="search-btn">Book Now <i
													class="fa fa-arrow-circle-right" aria-hidden="true"></i></button>}
											
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			
			<section class="tj-offers">
				<div class="row">
					{/* <!--Offer Box Content Start--> */}
					<div class="col-md-3 col-sm-6">
						<div class="offer-box">
							<img src="/images/offer-icon1.png" alt="" />
							<div class="offer-info">
								<h4>Best Price Guaranteed</h4>
								<p>A more recently with desktop softy like aldus page maker.</p>
							</div>
						</div>
					</div>
					
					<div class="col-md-3 col-sm-6">
						<div class="offer-box">
							<img src="/images/offer-icon2.png" alt="" />
							<div class="offer-info">
								<h4>24/7 Customer Care</h4>
								<p>A more recently with desktop softy like aldus page maker.</p>
							</div>
						</div>
					</div>
					
					<div class="col-md-3 col-sm-6">
						<div class="offer-box">
							<img src="/images/offer-icon3.png" alt="" />
							<div class="offer-info">
								<h4>Home Pickups</h4>
								<p>A more recently with desktop softy like aldus page maker.</p>
							</div>
						</div>
					</div>
					
					<div class="col-md-3 col-sm-6">
						<div class="offer-box">
							<img src="/images/offer-icon4.png" alt="" />
							<div class="offer-info">
								<h4>Easy Bookings</h4>
								<p>A more recently with desktop softy like aldus page maker.</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		
			<section class="tj-welcome">
				<div class="container">
					<div class="row">
						<div class="col-md-6 col-sm-7">
							<div class="about-info">
								<div class="tj-heading-style">
									<h3>Who We Are</h3>
								</div>
								<p>Lorem Ipsum passages, and more recently with desktop publishing software like aldus pageMaker
									including versions of all the Lorem Ipsum generators on thet Internet tends to repeat predefined
									chunks as necessary, making this an web evolved over the years, sometimes by accident.</p>
								<a href="javascript:void(0)">See all Vehicles<i class="fa fa-arrow-circle-right"
									aria-hidden="true"></i></a>
								<ul class="facts-list">
									<li>
										<strong class="fact-count">100</strong>
										<i class="fa fa-percent"></i>
										<span>Happy Customer</span>
									</li>
									<li>
										<strong class="fact-count">200</strong>
										<i class="fas fa-plus"></i>
										<span>Luxury Cars</span>
									</li>
									<li>
										<strong class="fact-count">12,000</strong>
										<i class="fas fa-arrow-up"></i>
										<span>Kilometers Driven</span>
									</li>
								</ul>
							</div>
						</div>
						
						<div class="col-md-6 col-sm-5">
							<div class="welcome-banner">
								<img src="/images/car.jpg" alt="" />
							</div>
						</div>
					</div>
				</div>
			</section>
			
			<section class="fleet-carousel">
				<div class="col-md-12 col-sm-12">
					<div class="tj-heading-style">
						<h3>Our Car Fleet</h3>
					</div>
				</div>
				<div class="carousel-outer">
					<div class="cab-carousel" id="cab-carousel">
						<div class="fleet-item">
							<img src="/images/fleet-carousel-img1.png" alt="" />
							<div class="fleet-inner">
								<h4>2017 Chevrolet Pepe</h4>
								<ul>
									<li><i class="fas fa-taxi"></i>Luxery</li>
									<li><i class="fas fa-user-circle"></i>2 Passengers</li>
									<li><i class="fas fa-tachometer-alt"></i>5.6/100 MPG</li>
								</ul>
								<strong class="price">$190<span> / day</span></strong>
								<a href="/booknow">Book Now <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></a>
							</div>
						</div>
						<div class="fleet-item">
							<img src="/images/fleet-carousel-img2.png" alt="" />
							<div class="fleet-inner">
								<h4>Mercedes Benz</h4>
								<ul>
									<li><i class="fas fa-taxi"></i>Luxery</li>
									<li><i class="fas fa-user-circle"></i>5 Passengers</li>
									<li><i class="fas fa-tachometer-alt"></i>7.6/100 MPG</li>
								</ul>
								<strong class="price">$390<span> / day</span></strong>
								<a href="/booknow">Book Now <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></a>
							</div>
						</div>
						<div class="fleet-item">
							<img src="/images/fleet-carousel-img3.png" alt="" />
							<div class="fleet-inner">
								<h4>Renault Sedan</h4>
								<ul>
									<li><i class="fas fa-taxi"></i>Luxery</li>
									<li><i class="fas fa-user-circle"></i>5 Passengers</li>
									<li><i class="fas fa-tachometer-alt"></i>5.6/100 MPG</li>
								</ul>
								<strong class="price">$250<span> / day</span></strong>
								<a href="/booknow">Book Now <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></a>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* <!--Cab Services Section Start--> */}
			<section class="cab-services">
				<div class="container">
					<div class="row">
						<div class="tj-heading-style">
							<h3>Our Services</h3>
							<p>Lorem Ipsum passages, and more recently with desktop publishing software like aldus pageMaker
								including versions.</p>
						</div>
						<div class="col-md-4 col-sm-4">
							<div class="cab-service-box">
								<figure class="service-thumb">
									<img src="/images/cab-service-icon1.png" alt="" />
								</figure>
								<div class="service-desc">
									<h4>Restaurants</h4>
									<p>A more recently with desktop softy like aldus page maker.</p>
								</div>
							</div>
						</div>
						<div class="col-md-4 col-sm-4">
							<div class="cab-service-box">
								<figure class="service-thumb">
									<img src="/images/cab-service-icon2.png" alt="" />
								</figure>
								<div class="service-desc">
									<h4>Airports</h4>
									<p>A more recently with desktop softy like aldus page maker.</p>
								</div>
							</div>
						</div>
						<div class="col-md-4 col-sm-4">
							<div class="cab-service-box">
								<figure class="service-thumb">
									<img src="/images/cab-service-icon3.png" alt="" />
								</figure>
								<div class="service-desc">
									<h4>Hospitals</h4>
									<p>A more recently with desktop softy like aldus page maker.</p>
								</div>
							</div>
						</div>
						
						<div class="col-md-4 col-sm-4">
							<div class="cab-service-box">
								<figure class="service-thumb">
									<img src="/images/cab-service-icon4.png" alt="" />
								</figure>
								<div class="service-desc">
									<h4>Beaches</h4>
									<p>A more recently with desktop softy like aldus page maker.</p>
								</div>
							</div>
						</div>
						<div class="col-md-4 col-sm-4">
							<div class="cab-service-box">
								<figure class="service-thumb">
									<img src="/images/cab-service-icon5.png" alt="" />
								</figure>
								<div class="service-desc">
									<h4>Shopping Malls</h4>
									<p>A more recently with desktop softy like aldus page maker.</p>
								</div>
							</div>
						</div>
						<div class="col-md-4 col-sm-4">
							<div class="cab-service-box">
								<figure class="service-thumb">
									<img src="/images/cab-service-icon6.png" alt="" />
								</figure>
								<div class="service-desc">
									<h4>Wedding Parties</h4>
									<p>A more recently with desktop softy like aldus page maker.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* <!--Call To Action 2 Content Start--> */}
			<section class="tj-cal-to-action2">
				<div class="container">
					<div class="row">
						<div class="col-md-9 col-sm-9">
							<div class="cta-tagline">
								<h2>Incredible Destinations at Incredible Deals</h2>
							</div>
						</div>

						<div class="col-md-3 col-sm-3">
							<div class="cta-btn">
								<a href="/booknow">Book Now <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
export default Home