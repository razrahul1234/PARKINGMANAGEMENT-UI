import React from "react";
import Select from 'react-select'
import { parkingManagement, addParkingSpot } from "../services/parkingservice";

export default class AddParkingSpot extends React.Component {
    constructor() {
        super();
        this.state = {
            alertMessage : '',
            parking_lot_id: '',
            floor_id: '',
            size_id:'',
            parkingLotOptions: [],
            floorOptions: [],
            sizeOptions: [],
            parkingLotData:'',
            floorData:''
        };
        
       this.handleSubmit = this.handleSubmit.bind(this);
       this.formatFloorOptions = this.formatFloorOptions.bind(this);
      }

      handleSubmit = (event) => {
         event.preventDefault();
         const body = {
            parking_lot_id : this.state.parking_lot_id,
            floor_id : this.state.floor_id,
            size_of_slots : this.state.size_id,
            status : "available"
         }

         addParkingSpot(body).then(res => {
            this.setState({
                alertMessage: `Spot has been added`
            })
         })

      }

      componentDidMount(){
        parkingManagement().then(res => {
            console.log(res);
            let tempoptions = [];
            res.data.parkingLotData.map(item => {
                tempoptions.push({value: item.parking_lot_id, label:`Parking - ${item.parking_lot_id}`});
            })
            let tempsizeoptions = [
                {value: "small", label: "Small"},
                {value: "medium", label: "Medium"},
                {value: "large", label: "Large"},
                {value: "x-large", label: "X-Large"},
            ]
            this.setState({
                parkingLotData: res.data.parkingLotData,
                floorData: res.data.floorData,
                parkingLotOptions: tempoptions,
                sizeOptions: tempsizeoptions
            })
            
        })
      }

      formatFloorOptions =  (e) => {
            console.log(e);
            this.setState({parking_lot_id : e.value, floorOptions:[]});

            let filteredFloordata = this.state.floorData.filter(item => item.parking_lot_id === e.value);
            if(filteredFloordata && filteredFloordata.length>0){
                let tempflooroptions = [];
                console.log(filteredFloordata);
                filteredFloordata.map(item => tempflooroptions.push({value: item.floor_id, label: `Floor - ${item.floor_id}` }) );
                this.setState({
                    floorOptions: tempflooroptions
                })
            }
      }

      

      render() {
        return <form onSubmit={this.handleSubmit}>
         { this.state.alertMessage ? <div className="alert alert-primary" role="alert">{this.state.alertMessage}
         <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button></div> : '' }
          <h3> Add Parking Spot </h3>
          <div className="form-group w-50 m-auto pb-4">
              <div className="float-left" for="parking_lot_id">Parking LOT</div><br />
              <Select isClearable="true" isSearchable='true' options={this.state.parkingLotOptions} onChange={(e) => this.formatFloorOptions(e) } />
              {/* <input
                  type="number" 
                  value={this.state.numberoffloors}
                  onChange={(e) => this.setState({numberoffloors : e.target.value}) }
                  className="form-control" id="numberoffloors" placeholder="Ex.3" /> */}
          </div>
          <div className="form-group mb-4 w-50 m-auto pb-4">
              <div className="float-left" for="floor_id">Floor</div><br/>
              {/* <input
                  type="number" 
                  value={this.state.numberoffloors}
                  onChange={(e) => this.setState({numberoffloors : e.target.value}) }
                  className="form-control" id="numberoffloors" placeholder="Ex.3" /> */}
              <Select isClearable="true" isSearchable='true' options={this.state.floorOptions} onChange={(e) => this.setState({floor_id : e.value}) } />
          </div>
          <div className="form-group mb-4 w-50 m-auto pb-4">
              <div className="float-left" for="numberoffloors">Size</div><br />
              {/* <input
                  type="text" 
                  value={this.state.size_id}
                  onChange={(e) => this.setState({size_id : e.target.value}) }
                  className="form-control" id="size_id" placeholder="Ex.small, large, medium, x-large" /> */}
              <Select isClearable="true" isSearchable='true' options={this.state.sizeOptions} onChange={(e) => this.setState({size_id : e.value}) } />
          </div>
          
          <br /><br /><br />
          <input className="btn btn-success" type="submit" disabled={!this.state.parking_lot_id || !this.state.floor_id || !this.state.size_id} />
      </form>
      }

    }
