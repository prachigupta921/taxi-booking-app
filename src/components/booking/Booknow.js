import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import data from "../login/record";
import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';
import moment from "moment";
import "../profile/booking.css"
import DateMomentUtils from "@date-io/moment";
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";

const Booknow = () => {
    const [select, setselect] = useState();
    const [time, settime] = useState();
    const [city, setcity] = useState("");
    const [category, setcategory] = useState("");
    const [err, seterr] = useState(false);
    const [drop, setdrop] = useState("")
    const [fullname, setfullname] = useState(sessionStorage.getItem("name"));
    const [phone, setphone] = useState(sessionStorage.getItem("phone"));
    const [email, setemail] = useState(sessionStorage.getItem("email"));
    const [book, setbook] = useState(false)
    const [show, setshow] = useState(true)
    const [message, setmessage] = useState("")
    const [catdata, setcatdata] = useState([]);
    const [base, setbase] = useState("")
    const [farekm, setfarekm] = useState("")
    const [faremin, setfaremin] = useState("")
    const [citydrop, setcitydrop] = useState([])
    const [cate, setcate] = useState("")

    const navigate = useNavigate();
    useEffect(() => {
        let username = sessionStorage.getItem('email')
        if (username === '' || username === null) {
            navigate('/login')
        }
    }, [])

   
    const [address, setaddress] = useState("")
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

    function handleshow() {
        setshow(false)
    }
    function handlehide() {
        setshow(true)
        setmessage(false)
    }

    useEffect(() => {
        handleCat()
    }, [])

    const handleCat = () => {
        fetch(`${process.env.REACT_APP_URL}/categoryapi/getcategories?api_key=${apikey}`, {
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

    const dist = data[0].rows[0].elements[0].distance.text
    const dura = data[0].rows[0].elements[0].duration.text
    let Base_price = base;
    let Base_fare_per_km = farekm
    let fare_per_min = faremin
    let sr = 30;
    let ST = 0;
    let GTF = 0;
    let jtf = (parseInt(Base_price) + ((Base_fare_per_km) * (dist)) + ((fare_per_min) * (dura)))

    const selectitem = (e) => {
        setcategory(e)
        catdata.map((res, ind) => {
            if (e == res.category_id) {
                console.log(res.cat_name, "i")
                setcate(res.cat_name)
                setbase(res.cat_base_price)
                setfarekm(res.cat_fare_per_km)
                setfaremin(res.cat_fare_per_min)
            }
        })
    }


    const userid = sessionStorage.getItem("userid")

    const form = moment(select).format("YYYY-MM-DD")
    const ftime=moment(time).format("hh:mm")
    
    const time_date = form + " " + ftime
    const apikey = sessionStorage.getItem("key")

    var d=new Date(time_date);
    var utc_offset=d.getTimezoneOffset();
    d.setMinutes(d.getMinutes()+utc_offset);
    const GMTtime=moment(d).format("YYYY-MM-DD"+" "+"HH:mm")

    const BookingForm = (e) => {
        e.preventDefault();
        if (Validation()) {
            handleshow();
        }
    }

    const handleBooknow = (e) => {
        e.preventDefault();
        if (BookingValidation()) {
            let data = {
                "trip_date": GMTtime,
                "cat_name": cate,
                "trip_from_loc": address,
                "trip_to_loc": drop,
                "city_id": city,
                "user_id": userid,
                "category_id": category,
                "trip_currency": "$",
                "trip_base_fare": jtf,
                "trip_scheduled_pick_lat": coordinate.lat,
                "trip_scheduled_pick_lng": coordinate.lng,
                "trip_scheduled_drop_lat": coord.lat,
                "trip_scheduled_drop_lng": coord.lng,
                "trip_distance": dist,
                "trip_dunit": "km",
                "trip_type": "normal",
                "trip_total_time": dura,
                "trip_pay_amount": GTF,
                "seats": "1",
                "trip_status": "request",
                "is_share": "0",
                "is_delivery": "0",
                "tax_amt": ST
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
                        console.log("success")
                        setmessage("Booking Confirmed")
                        setselect(new Date())
                        settime(time)
                        setcity("")
                        setcategory("")
                        setaddress("")
                        setdrop("")
                        seterr(false)
                    } else {
                        setmessage(result.message)
                    }
                })
            })
        }
    }

    const Validation = () => {
        let result = true;
        if (city.length == 0 || category.length == 0 || address.length == 0 || drop.length == 0) {
            result = false;
            seterr(true);
        }
        return result;
    }

    const BookingValidation = () => {
        let result = true;
        if (fullname.length == 0 || email.length == 0 || phone.length == 0) {
            result = false;
            setbook(true);
            setmessage(false)
        }
        return result;
    }

    return (
        <>

            <div className="tj-inner-banner">
                <div className="container">
                    <h2>Booking Form</h2>
                </div>
            </div>
           
            <div className="tj-breadcrumb">
                <div className="container">
                    <ul className="breadcrumb-list">
                        <li><a href="/">Home</a></li>
                        <li className="active">Booking Form</li>
                    </ul>
                </div>
            </div>

            {/* <!--Booking Form Section Start-->	 */}

            {
                show ? <div>
                    <section className="tj-booking-frm">
                        <div className="container">
                            <div className="row">

                                <div className="col-md-8 col-sm-12">
                                    <div className="tj-tabs">
                                        <ul className="nav nav-tabs" role="tablist">
                                            <li className="active"><a href="#point" data-toggle="tab">Trip Details</a></li>
                                        </ul>
                                    </div>
                                    <div className="tab-content">
                                        <div className="tab-pane active" id="point">
                                            <form onSubmit={BookingForm} className="booking-frm" id="User-Form">


                                                <div className="col-md-6 col-sm-6">
                                                    <div className="field-holder">
                                                        <MuiPickersUtilsProvider  utils={DateMomentUtils}>
                                                        <span class="fas fa-calendar-alt"></span>
                                                            <DatePicker disablePast format="DD/MM/yyyy" inputVariant="outlined" value={select} onChange={setselect} />
                                                        </MuiPickersUtilsProvider>
                                                        {/* {err && form.length <= 0 ? <label id="u_email-error" className="error" style={{ color: "red" }}>This field is required</label> : null} */}
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="field-holder">
                                                        <MuiPickersUtilsProvider utils={DateMomentUtils}>
                                                        <span className="fas fa-clock"></span>
                                                            <TimePicker inputVariant="outlined"
                                                                value={time} onChange={settime}  />
                                                        </MuiPickersUtilsProvider>
                                                        {/* {err && time.length <= 0 ? <label id="u_email-error" className="error" style={{ color: "red" }}>This field is required</label> : null} */}
                                                    </div>
                                                </div>

                                                <div className="col-md-12 col-sm-12">
                                                    <strong>City</strong>
                                                    <div className="field-holder">
                                                        <select className="form-control" value={city} onChange={e => setcity(e.target.value)} name="city" id="TripCityId">
                                                            <option>Select City</option>

                                                            {citydrop.map((res) => {
                                                                return (
                                                                    <>
                                                                        <option value={res.city_id}>{res.city_name}</option>
                                                                    </>
                                                                )
                                                            })}

                                                        </select>
                                                        {err && city.length <= 0 ? <label id="u_email-error" className="error" style={{ color:"#e74c3c", fontWeight:"500",fontSize:"15px", marginTop: "15px" }}>This field is required</label> : null}

                                                    </div>
                                                    {/* </br> */}
                                                </div>

                                                <div className="col-md-12 col-sm-12">
                                                    <strong style={{ marginTop: "15px" }}>Category</strong>
                                                    <div className="field-holder">
                                                        <select className="form-control" name="category" value={category} onChange={(e) => selectitem(e.target.value)} id="TripCategoryId">
                                                            <option>Select Category</option>

                                                            {catdata.map((res) => {
                                                                return (
                                                                    <>
                                                                        <option value={res.category_id}>{res.cat_name}</option>
                                                                    </>
                                                                )
                                                            })}

                                                        </select>
                                                        {err && category.length <= 0 ? <label id="u_email-error" className="error" style={{ color:"#e74c3c", fontWeight:"500",fontSize:"15px", marginTop: "15px" }}>This field is required</label> : null}
                                                    </div>
                                                    {/* </br> */}
                                                </div>
                                                <div className="col-md-12 col-sm-12">
                                                    <strong style={{ marginTop: "15px" }}>Picking Up</strong>
                                                    <div className="field-holder border">

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
                                                                            // inline style for demonstration purpose
                                                                            const style = suggestion.active
                                                                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                                            return (
                                                                                <div className="input-suggestion"
                                                                                    {...getSuggestionItemProps(suggestion, {
                                                                                        // className,
                                                                                        style,
                                                                                    })}
                                                                                >
                                                                                    <i class="material-icons ">location_on</i> <span >{suggestion.description}</span>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </PlacesAutocomplete>

                                                        {err && address.length <= 0 ? <label id="u_email-error" className="error" style={{ color:"#e74c3c", fontWeight:"500",fontSize:"15px", marginTop: "15px" }}>This field is required</label> : null}
                                                    </div>
                                                </div>

                                                <div className="col-md-12 col-sm-12">
                                                    <strong style={{ marginTop: "15px" }}>Drop off</strong>
                                                    <div className="field-holder border">

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
                                                                                    <i class="material-icons ">location_on</i> <span>{suggestion.description}</span>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </PlacesAutocomplete>

                                                        {err && drop.length <= 0 ? <label id="u_email-error" className="error" style={{ color:"#e74c3c", fontWeight:"500",fontSize:"15px" }}>This field is required</label> : null}
                                                    </div>
                                                </div>

                                                <div className="col-md-12 col-sm-12">
                                                    <p className="ride-terms">I understand and agree with the <a href="javascript:void(0)">Terms</a> of Service and Cancellation </p>
                                                    <label for="book_terms">
                                                        <input name="book_terms" id="book_terms" type="checkbox" checked />
                                                        <input type="hidden" id="trip_distance" name="distance" />
                                                    </label>
                                                </div>
                                                <div className="col-md-12 col-sm-12">
                                                    <button className="book-btn">Next Step <i className="fa fa-arrow-circle-rNclassNameight" aria-hidden="true"></i></button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {/* </div> */}

                                <div className="col-md-4 col-sm-12">
                                    <div className="booking-summary">
                                        <h3>Booking Summary</h3>
                                        <ul className="booking-info">
                                            {/* <li><span>Booking Reference: </span><div className="book-ref"></div></li> */}

                                            {
                                                (city.length != 0 && category.length != 0 && address.length != 0 && drop.length != 0) ?
                                                    <div>
                                                        <p name="baseaCatPrice" id="baseaCatPrice">Base Price:{Base_price}</p>
                                                        <p name="baseaCatPrice" id="baseaCatPrice">Base Fare per km:{Base_fare_per_km}</p>
                                                        <p name="baseaCatPrice" id="baseaCatPrice">Fare per min:{fare_per_min}</p>
                                                        <p name="baseaCatPrice" id="baseaCatPrice">Job Distance:{dist}</p>
                                                        <p name="baseaCatPrice" id="baseaCatPrice">Job Time:{dura}</p>
                                                        <p name="baseaCatPrice" id="baseaCatPrice">Job Total Fare:{jtf}</p>
                                                        <p name="baseaCatPrice" id="baseaCatPrice">Service Tax:{ST = (((parseInt(Base_price)) + (Base_fare_per_km * parseInt(dist)) + (fare_per_min * parseInt(dura))) * (sr / 100)).toFixed(2)}</p>
                                                        <p name="baseaCatPrice" id="baseaCatPrice">Gross Trip Fare:{GTF = (jtf + Number(ST)).toFixed(2)}</p>
                                                    </div>
                                                    : null
                                            }


                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section >
                </div> : <div>
                    <section class="tj-user-bfrm">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-8 col-sm-8 col-xs-12">
                                    <div class="tj-tabs">
                                        <ul class="nav nav-tabs" role="tablist">
                                            <li class="active"><a href="javascript:void(0)" data-toggle="tab"> Booking Conform</a></li>
                                        </ul>
                                    </div>
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="confirm_booking">
                                            <div class="cb-frm" id="rider-info">
                                                {message ? <div className='alert alert-success'>{message}</div> : ""}

                                                <div class="col-md-12 col-sm-12">
                                                    <div class="info-field">
                                                        <label>Full Name</label>
                                                        <span class="far fa-user"></span>
                                                        <input type="text" name="username" value={fullname} onChange={e => setfullname(e.target.value)} placeholder="Enter Full Name" />
                                                        {book && fullname.length <= 0 ? <label id="u_email-error" className="error" style={{ color:"#e74c3c", fontWeight:"500",fontSize:"15px"}}>This field is required</label> : null}
                                                    </div>
                                                </div>
                                                <div class="col-md-6 col-sm-6">
                                                    <div class="info-field">
                                                        <label>Phone</label>
                                                        <span class="icon-phone icomoon"></span>
                                                        <input type="tel" name="phone_num" value={phone} onChange={e => setphone(e.target.value)} placeholder="Enter Phone Number" />
                                                        {book && phone.length <= 0 ? <label id="u_email-error" className="error" style={{ color:"#e74c3c", fontWeight:"500",fontSize:"15px"}}>This field is required</label> : null}
                                                    </div>
                                                </div>
                                                <div class="col-md-6 col-sm-6">
                                                    <div class="info-field">
                                                        <label>Email</label>
                                                        <span class="far fa-envelope"></span>
                                                        <input type="email" name="email_id" value={email} onChange={e => setemail(e.target.value)} placeholder="Enter Email id" />
                                                        {book && email.length <= 0 ? <label id="u_email-error" className="error" style={{ color:"#e74c3c", fontWeight:"500",fontSize:"15px"}}>This field is required</label> : null}
                                                    </div>
                                                </div>
                                                <div class="col-md-12 col-sm-12">
                                                    <a href="javascript:void(0)" class="back-btn" onClick={handlehide}><i class="fa fa-arrow-circle-left" aria-hidden="true"></i> Go Back</a>
                                                    <button class="book-btn" id="ride-bbtn" onClick={handleBooknow}>Book Now <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-4 col-sm-4 col-xs-12">
                                    <div class="booking-summary"> <h3>Booking Summary</h3></div>
                                    {
                                        (city.length != 0 && category.length != 0 && address.length != 0 && drop.length != 0) ?

                                            <div class="booking-summary">
                                                {/* <h3>Booking Summary</h3> */}
                                                <ul class="booking-info">
                                                    <li><strong>Journey Type: </strong>
                                                        <div class="service_type">Normal</div></li>

                                                </ul>
                                                {/* <div class="journey-info">
                                                    <h4 class="service_type">Select Service Type</h4>
                                                </div> */}
                                                <ul class="service-info">
                                                    <li><strong>From: </strong><div class="pick_date info-outer">{address}</div></li>
                                                    <li><strong>To: </strong><div class="pick_date info-outer">{drop}</div></li>
                                                    <li><strong>Pickup Date: </strong><div class="pick_date info-outer">{form}</div></li>
                                                    <li><strong>Pickup Time: </strong><div class="pick_time info-outer">{ftime}</div></li>
                                                   
                                                </ul>
                                                <div class="fare-box">
                                                    <strong>Trip Estimation</strong>
                                                    <p name="baseaCatPrice" id="baseaCatPrice">Base Price: {Base_price}</p>
                                                    <p name="baseaCatPrice" id="baseaCatPrice">Base Fare per km: {Base_fare_per_km}</p>
                                                    <p name="baseaCatPrice" id="baseaCatPrice">Fare per min: {fare_per_min}</p>
                                                    <p name="baseaCatPrice" id="baseaCatPrice">Job Distance: {dist}</p>
                                                    <p name="baseaCatPrice" id="baseaCatPrice">Job Time: {dura}</p>
                                                    <p name="baseaCatPrice" id="baseaCatPrice">Job Total Fare: {jtf}</p>
                                                    <p name="baseaCatPrice" id="baseaCatPrice">Service Tax: {ST = (((parseInt(Base_price)) + (Base_fare_per_km * parseInt(dist)) + (fare_per_min * parseInt(dura))) * (sr / 100)).toFixed(2)}</p>
                                                    <p name="baseaCatPrice" id="baseaCatPrice">Gross Trip Fare: {GTF = (jtf + Number(ST)).toFixed(2)}</p>

                                                </div>
                                            </div> : null
                                    }
                                </div>


                            </div>
                        </div>
                    </section>
                </div>
            }

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

export default Booknow