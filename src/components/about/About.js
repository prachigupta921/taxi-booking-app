import React from "react";

const About = () => {

    return (
        <>
            <div class="tj-inner-banner">
                <div class="container">
                    <h2>About Us</h2>
                </div>
            </div>

            <div class="tj-breadcrumb">
                <div class="container">
                    <ul class="breadcrumb-list">
                        <li><a href="/">Home</a></li>
                        <li class="active">About Us</li>
                    </ul>
                </div>
            </div>
            {/* <!--Breadcrumb Section End-->

<!--About Facts Section Start--> */}
            <section class="tj-aboutus">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 col-sm-7">
                            <div class="about-info bounceInLeft animated delay-2s">
                                <div class="tj-heading-style">
                                    <h3>Who We Are</h3>
                                </div>
                                <p>Lorem Ipsum passages, and more recently with desktop publishing software like aldus pageMaker including versions of all the Lorem Ipsum generators on thet Internet tends to repeat predefined chunks as necessary, making this an web evolved over the years, sometimes by accident.</p>
                                <a href="javascript:void(0)">See all Vehicles<i class="fa fa-arrow-circle-right" aria-hidden="true"></i></a>
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
                            <div class="about-banner bounceInRight animated delay-2s">
                                <img src="/images/about-img.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
           
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

export default About