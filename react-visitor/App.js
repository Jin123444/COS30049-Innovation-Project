import './App.css';
import Login from './components/login'
import Homepage from './components/homepage'
import Feedback from './components/feedback'
import ForgotPassword from './components/forgotPassword';
import AddAdmin from './components/addAdmin';
import AdminRegister from './components/adminRegister';
import BookingForm from './components/booking';
import Navigation from './components/navigation';
import ParkGuideRegister from './components/parkGuideRegister';
import VisitorRegister from './components/visitorRegister';


import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
    <Navigation/>
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path = "/feedback" element = {<Feedback/>}/>
        <Route path = "/booking" element = {<BookingForm/>}/>
        <Route path = "/addAdmin" element = {<AddAdmin/>}/>
        <Route path = "/adminRegister" element = {<AdminRegister/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/forgotPassword" element = {<ForgotPassword/>}/>
        <Route path = "/parkGuideRegister" element = {<ParkGuideRegister/>}/>
        <Route path = "/visitorRegister" element = {<VisitorRegister/>}/>
      </Routes>
    </div>
    </>
  );
}

export default App;
