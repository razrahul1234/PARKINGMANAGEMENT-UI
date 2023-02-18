import logo from './logo.svg';
import './App.css';
import ParkingLot from './parkingmanagement/addparkinglot';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './navbar';
import Home from './parkingmanagement/home';
import AddFloor from './parkingmanagement/addfloor';
import AddParkingSpot from './parkingmanagement/addparkinggspot';
import BookSpot from './parkingmanagement/booking';
import ReleaseBooking from './parkingmanagement/releasebooking';

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";  

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/addparkinglot" element={<ParkingLot />}> </Route>
        <Route path="/addfloors" element={<AddFloor />}> </Route>
        <Route path="/addparkingspot" element={<AddParkingSpot />}> </Route>
        <Route path="/bookspot" element={<BookSpot />}> </Route>
        <Route path="/releasespot" element={<ReleaseBooking />}> </Route>
      </Routes>
     
      
    </div>
  );
}

export default App;
