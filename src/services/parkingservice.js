import axios from "axios";

 export function addParkingLot(body) {
    let url = 'http://localhost:3000/parking/addParkingLot';
    return axios.post(url, body);
  }

  export function addFloor(body) {
    let url = 'http://localhost:3000/parking/addFloorDetails';
    return axios.post(url, body);
  }

  export function addParkingSpot(body) {
    let url = 'http://localhost:3000/parking/addSpot';
    return axios.post(url, body);
  }

  export function bookSpot(body) {
    let url = 'http://localhost:3000/booking/addBooking';
    return axios.post(url, body);
  }

  export function releaseSpot(body){
    let url = 'http://localhost:3000/booking/releaseBooking';
    return axios.post(url, body);
  }

  export function dashboard() {
    let url = 'http://localhost:3000/common/dashboard';
    return axios.get(url);
  }

  export function parkingManagement(){
    let url = 'http://localhost:3000/common/parkingManagementDetails';
    return axios.get(url);
  }