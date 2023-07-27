import './App.css';
import Home from './components/home/Home';
import { BrowserRouter as Router, Routes, Route }  from 'react-router-dom'
import Header from './common/Header';
import About from './components/about/About';
import Service from './components/service/Service';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import Booknow from './components/booking/Booknow';
import ChangePassword from './components/profile/ChangePassword';
import ContactUs from './components/contactus/ContactUs';
import ForgetPassword from './components/login/ForgetPassword';
import Footer from './common/Footer';

function App() {
  return (
    <div className="App">
      <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='about' element={<About/>} />
        <Route path='service' element={<Service/>} />
        <Route path='register' element={<Register/>} />
        <Route path='login' element={<Login/>} />
        <Route path='profile' element={<Profile/>} />
        <Route path='booknow' element={<Booknow/>} />
        <Route path='contactus' element={<ContactUs/>} />
        <Route path='changepassword' element={<ChangePassword/>} />
        <Route path='/forgetpassword' element={<ForgetPassword/>} />
      </Routes>
      <Footer/>
      </Router>
      {/* <Home/> */}
      
    </div>
  );
}

export default App;
