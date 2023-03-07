import React from "react";
import Select from 'react-select'
import { bookSpot, parkingManagement } from "../services/parkingservice";

export default class BookSpot extends React.Component {
    constructor() {
        super();
        this.state = {
            alertMessage: '',
            size_of_slots: '',
            data: [],
            showTicket: '',
            parking_lot_id:'',
            parkingLotOptions: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.ticketTemplate = this.ticketTemplate.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let body = {
            "size_of_slots": this.state.size_of_slots,
            "parking_lot_id": this.state.parking_lot_id
        };
        bookSpot(body).then((response) => {
            console.log(response);
            this.setState({
                alertMessage: response.data.message,
                data: response.data.data,
                showTicket: response.data.data ? this.ticketTemplate(response.data.data) : ""
            })
                ;
            return response;
        }).catch(error => {
            alert(error);
        });
    }

    ticketTemplate = (data) => {
        let ticket = '';
        if (Object.keys(data).length > 0) {
            ticket = <div className="card w-50 m-auto">
                <div className="card-header">
                    PARKING TICKET
                </div>
                <div className="card-body">
                    <h5 className="card-title">SLOT NUMBER : {data.slot_id} </h5>
                    <p className="card-text">FLOOR NUMBER : {data.floor_id} </p>
                    <p className="card-text">PARKING LOT : {data.parking_lot_id} </p>
                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                </div>
                <div className="card-footer">
                  BOOKING ID : { data.booking_id} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.size_of_slots} Slots
                </div>
            </div>
            return ticket;
        } else {
            return "";
        }


    }
    
    componentDidMount(){
        parkingManagement().then(res => {
            console.log(res);
            let tempoptions = [];
            res.data.parkingLotData.map(item => {
                tempoptions.push({value: item.parking_lot_id, label:item.parking_lot_name});
            })
            
            this.setState({
                parkingLotOptions: tempoptions
            })
            
        })
      }

    render() {
        return <form onSubmit={this.handleSubmit}>
            {this.state.alertMessage ? <div className="alert alert-primary" role="alert">{this.state.alertMessage}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button></div> : ''}
            <h3> Book Spot </h3>
            <div className="form-group mb-4 w-50 m-auto pb-4">
              <div className="float-left" for="parking_lot_id">Parking Lot</div><br />
              <Select isClearable="true" isSearchable='true' options={this.state.parkingLotOptions} onChange={(e) => this.setState({parking_lot_id : e.value}) } />
          </div>
          <br /><br />
            <div className="form-group w-50 m-auto">
                <label className="float-left" for="size_of_slots">Size Of Slots</label>
                <input
                    type="text"
                    value={this.state.size_of_slots}
                    onChange={(e) => this.setState({ size_of_slots: e.target.value })}
                    className="form-control" id="size_of_slots" placeholder="Ex.small,medium,large,x-large" />
            </div>
            <p className="text-muted">Vehicle will be scanned automatically.</p>
           
            <br /><br /><br />
            <input className="btn btn-success" type="submit" disabled={!this.state.size_of_slots} />

            <br /><br /><br />

            {this.state.showTicket}
        </form>
    }

}
