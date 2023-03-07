import React from "react";
import { dashboard, parkingManagement, getUsers } from "../services/parkingservice";


import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            countData: '',
            bookingColumns: [],
            bookingData: '',
            spotData: '',
            userColumns: [],
            userData:'',
            parkingLotData: '',
            floorData: '',
            parkingLotColumns: [],
            floorColumns: []
        };
        this.fetchDashboard = this.fetchDashboard.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);
    }

    componentDidMount() {
        this.fetchDashboard();
        this.fetchParkingManagementAllData();
        this.fetchUsers();
        this.setState({
            bookingColumns: [
                { field: 'booking_id', header: 'Booking ID' },
                { field: 'slot_id', header: 'Slot ID' },
                { field: 'floor_id', header: 'Floor ID' },
                { field: 'parking_lot_id', header: 'Parking LOT' },
                { field: 'size_of_slots', header: 'Slot Size' },
                { field: 'check_in_time', header: 'Check in Time' },
                { field: 'check_out_time', header: 'Check out Time' }
            ],
            spotColumns: [
                {field: 'slot_id', header: 'Spot ID'},
                {field: 'floor_id', header: 'Floor ID'},
                {field: 'parking_lot_id', header: 'Parking ID'},
                {field: 'size_of_slots', header: 'Spot Size'},
                {field: 'status', header: 'Status'}
            ],
            userColumns: [
                {field: 'id', header: 'ID'},
                {field: 'first_name', header: 'First Name'},
                {field: 'last_name', header: 'Last Name'},
                {field: 'emaild', header: 'Email'},
                {field: 'avatar', header: 'Avatar'}
            ],
            parkingLotColumns: [
                {field: 'parking_lot_id', header: 'Parking LOT ID'},
                {field: 'parking_lot_name', header: 'Parking Name'}
            ],
            floorColumns: [
                {field: 'parking_lot_id', header:'Parking LOT ID'},
                {field: 'floor_id', header:'Floor ID'},,
                {field: 'floor_number', header:'Floor Number'}
            ]
        })
    }

    fetchDashboard = async () => {
        try {
            await dashboard().then(res => {
                // console.log(res);
                const data = res.data.map((item, i) =>
                    <div key={i} className="card text-center m-4 bg-info text-light" style={{
                        width: '15rem',
                    }}>
                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.count}</p>
                        </div>
                    </div>
                )
                this.setState({
                    countData: data
                })
            })
        } catch (err) {
            console.log(err);
        }
    }

    fetchUsers = async () => {
        try {
                getUsers().then(res => {
                    console.log("user data : " ,res.data.data);
                    this.setState({
                        userData : res.data.data
                    })
                })
        } catch (error) {

        }
    }


    fetchParkingManagementAllData = async () => {
        try {
            parkingManagement().then(res => {
                console.log(res);
                this.setState({
                    bookingData: res.data.bookingData,
                    spotData: res.data.slotData,
                    parkingLotData: res.data.parkingLotData,
                    floorData: res.data.floorData
                })
            })
        } catch (error) {
            console.log(error);
        }
    }

    imageBodyTemplate = (product) => {
        console.log(product);
        return <img src={`${product.avatar}`} alt={'Avatar image'} class="w-6rem shadow-2 border-round" />;
    };

    render() {
        console.log(this.state.spotColumns);
        return <div >
            <div style={{ display: "flex" }}>
                {this.state.countData}
            </div> <br />

            {/* <DataGrid columns={columns} rows={rows} /> */}
            <div style={{ width: "70%", margin: "auto" }}>
                <DataTable value={this.state.parkingLotData} header={'PARKING DETAILS'} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} sortMode="multiple" stripedRows>
                    {this.state.parkingLotColumns.map((col, i) => (
                        <Column key={col.field} field={col.field} header={col.header} sortable />
                    ))}
                </DataTable> <br /><br />

                <DataTable value={this.state.floorData} header={'FLOOR DETAILS'} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} sortMode="multiple" stripedRows>
                    {this.state.floorColumns.map((col, i) => (
                        <Column key={col.field} field={col.field} header={col.header} sortable />
                    ))}
                </DataTable> <br /><br />

                <DataTable value={this.state.bookingData} header={'BOOKING DETAILS'} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} sortMode="multiple" stripedRows>
                    {this.state.bookingColumns.map((col, i) => (
                        <Column key={col.field} field={col.field} header={col.header} sortable />
                    ))}
                </DataTable> <br /><br />

                { this.state.spotColumns && this.state.spotColumns.length > 0 ?  <DataTable value={this.state.spotData} header={'SPOT DETAILS'} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} sortMode="multiple" stripedRows>
                    {this.state.spotColumns.map((col, i) => (
                        <Column key={col.field} field={col.field} header={col.header} sortable />
                    ))}
                </DataTable> : ''}
                <br></br>
                <DataTable value={this.state.userData} header={'USER DATA'} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} sortMode="multiple" stripedRows>
                    {this.state.userColumns.map((col, i) => (
                       col.field == 'avatar' ? <Column key={col.field} field={col.field} header={col.header} body={this.imageBodyTemplate} sortable /> : <Column key={col.field} field={col.field} header={col.header} sortable /> 
                    ))}
                </DataTable>
            </div>
        </div>
    }

}
