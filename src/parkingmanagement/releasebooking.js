import React from "react";
import Select from 'react-select'
import { parkingManagement, releaseSpot } from "../services/parkingservice";

export default class ReleaseBooking extends React.Component {
    constructor() {
        super();
        this.state = {
            alertMessage : '',
            parkingLotData: '',
            booking_id:'',
            parking_lot_id: '',
            parkingLotOptions: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        parkingManagement().then(res => {
            console.log(res);
            let tempoptions = [];
            res.data.parkingLotData.map(item => {
                tempoptions.push({value: item.parking_lot_id, label:item.parking_lot_name});
            })
            
            this.setState({
                parkingLotData: res.data.parkingLotData,
                parkingLotOptions: tempoptions
            })
        })
      }

      handleSubmit = (event) => {
        event.preventDefault();
        let body ={
            booking_id: this.state.booking_id,
            parking_lot_id: this.state.parking_lot_id,
            status: "available"
        };

        releaseSpot(body).then((response) => {
            this.setState({
                alertMessage : "Parking Lot has been released"
            })
            return response;
          }).catch(error => {
                alert(error);
          });
      }

      render () {
        return <form onSubmit={this.handleSubmit}>
        { this.state.alertMessage ? <div className="alert alert-primary" role="alert">{this.state.alertMessage}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
         <span aria-hidden="true">&times;</span>
         </button></div> : '' }
         <h3> Release Spot </h3>
         <div className="form-group w-50 m-auto pb-4">
              <div className="float-left" for="parking_lot_id">Parking LOT</div><br />
              <Select isClearable="true" isSearchable='true' options={this.state.parkingLotOptions} onChange={(e) => this.setState({ parking_lot_id: e.value }) } />
         </div>

         <div className="form-group w-50 m-auto">
             <div className="float-left" for="booking_id">Booking ID</div>
             <input
                 type="number"
                 step={1} 
                 value={this.state.booking_id}
                 onChange={(e) => this.setState({booking_id : e.target.value}) }
                 className="form-control" id="booking_id" placeholder="Ex.123, 67" />
         </div>
         <br /><br /><br />
         <input className="btn btn-success" type="submit" disabled={!this.state.booking_id || !this.state.parking_lot_id} />
     </form>
      }

}