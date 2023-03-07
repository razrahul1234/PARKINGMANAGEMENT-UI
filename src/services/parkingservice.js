import axios from "axios";

 export function addParkingLot(body) {
    let url = 'https://parkingmanagementservice.onrender.com/parking/addParkingLot';
    return axios.post(url, body);
  }

  export function addFloor(body) {
    let url = 'https://parkingmanagementservice.onrender.com/parking/addFloorDetails';
    return axios.post(url, body);
  }

  export function addParkingSpot(body) {
    let url = 'https://parkingmanagementservice.onrender.com/parking/addSpot';
    return axios.post(url, body);
  }

  export function bookSpot(body) {
    let url = 'https://parkingmanagementservice.onrender.com/booking/addBooking';
    return axios.post(url, body);
  }

  export function releaseSpot(body){
    let url = 'https://parkingmanagementservice.onrender.com/booking/releaseBooking';
    return axios.post(url, body);
  }

  export function dashboard() {
    let url = 'https://parkingmanagementservice.onrender.com/common/dashboard';
    return axios.get(url);
  }

  export function parkingManagement(){
    let url = 'https://parkingmanagementservice.onrender.com/common/parkingManagementDetails';
    return axios.get(url);
  }

  export function getUsers(){
    let url = "https://reqres.in/api/users?page=2";
    return axios.get(url);
  }