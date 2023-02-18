import React from "react";
import Select from 'react-select'
import { parkingManagement , addFloor} from "../services/parkingservice";

export default class AddFloor extends React.Component {
    constructor() {
        super();
        this.state = {
          alertMessage : '',
          parking_lot_id: '',
          floor_number:'',
          parkingLotOptions: [],
          parkingLotData:''
      };
      
     this.handleSubmit = this.handleSubmit.bind(this);
    //  this.formatFloorOptions = this.formatFloorOptions.bind(this);
      }

      componentDidMount(){
        parkingManagement().then(res => {
            console.log(res);
            let tempoptions = [];
            res.data.parkingLotData.map(item => {
                tempoptions.push({value: item.parking_lot_id, label:`Parking - ${item.parking_lot_id}`});
            })
            
            this.setState({
                parkingLotData: res.data.parkingLotData,
                parkingLotOptions: tempoptions
            })
            
        })
      }

      handleSubmit = (event) => {
        event.preventDefault();
        const body = {
           parking_lot_id : this.state.parking_lot_id,
           floor_number: this.state.floor_number,
           status : "active"
        }

        addFloor(body).then(res => {
           this.setState({
               alertMessage: `Floor has been added`
           })
        })

     }

      render() {
        return <form onSubmit={this.handleSubmit}>
         { this.state.alertMessage ? <div className="alert alert-primary" role="alert">{this.state.alertMessage}
         <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button></div> : '' }
          <h3> Add Floor </h3>
          <div className="form-group w-50 m-auto pb-4">
              <div className="float-left" for="parking_lot_id">Parking LOT</div><br />
              <Select isClearable="true" isSearchable='true' options={this.state.parkingLotOptions} onChange={(e) => this.setState({ parking_lot_id: e.value }) } />
              {/* <input
                  type="number" 
                  value={this.state.numberoffloors}
                  onChange={(e) => this.setState({numberoffloors : e.target.value}) }
                  className="form-control" id="numberoffloors" placeholder="Ex.3" /> */}
          </div>
          <div className="form-group mb-4 w-50 m-auto pb-4">
              <div className="float-left" for="floor_id">Floor Number</div><br/>
              <input
                  type="number" 
                  value={this.state.floor_number}
                  onChange={(e) => this.setState({floor_number : e.target.value}) }
                  className="form-control" id="floor_number" placeholder="Ex.3" />
          </div>
          
          <br /><br /><br />
          <input className="btn btn-success" type="submit" disabled={!this.state.parking_lot_id || !this.state.floor_number} />
      </form>
      }

    }
