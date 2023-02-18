import React from "react";
import { addParkingLot } from "../services/parkingservice";

export default class ParkingLot extends React.Component {
    constructor() {
        super();
        this.state = {
            alertMessage : '',
            parking_lot_name:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleSubmit = (event) => {
        event.preventDefault();
        let body ={
            "parking_lot_name": this.state.parking_lot_name,
            "status": "active"
        };
        addParkingLot(body).then((response) => {
            this.setState({
                alertMessage : "Parking Lot has been added"
            })
            return response;
          }).catch(error => {
                alert(error);
          });
      }

    render() {
      return <form onSubmit={this.handleSubmit}>
       { this.state.alertMessage ? <div className="alert alert-primary" role="alert">{this.state.alertMessage}
       <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button></div> : '' }
        <h3> Add Parking Lot </h3>
        <div className="form-group w-50 m-auto">
            <div className="float-left" for="parking_lot_name">Parking LOT Name</div>
            <input
                type="text" 
                value={this.state.parking_lot_name}
                onChange={(e) => this.setState({parking_lot_name : e.target.value}) }
                className="form-control" id="parking_lot_name" placeholder="Ex.Parking 1" />
        </div>
        <br /><br /><br />
        <input className="btn btn-success" type="submit" disabled={!this.state.parking_lot_name} />
    </form>
    }
  }