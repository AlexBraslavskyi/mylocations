import React, {useState} from "react";
import MaterialTable from "material-table";
import {forwardRef} from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {actionLocations} from "./actions/actions";

//Table component with using material-table library (support CRUD, sorting, searching)

export default function Table(props) {
    const dispatch = useDispatch();
    const categoryItems = props.categoryItems;
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
    };
    let newLocations = useSelector(state=>state.locations);
    const {useState} = React;

    //To transfer added object into parent component
    function addFn(newData) {
        let newObj = {name:newData.name, address:newData.address,
            coordinates:{latitude: newData.coordinates.substr(0, newData.coordinates.indexOf(',')),
                longitude:newData.coordinates.substr(newData.coordinates.indexOf(',')+1, newData.coordinates.length)},
            category:newData.category};
        newLocations.push(newObj);
        dispatch(actionLocations(newLocations));
    }
    //To transfer updated object into parent component
    function updateFn(oldData, newData) {
        deleteFn(oldData);
        addFn(newData);
    }
    //To delete object from parent component
    function deleteFn(oldData) {
        let index = _.findIndex(newLocations, function (l) {
            return l.name == oldData.name;});
        newLocations.splice(index, 1);
        dispatch(actionLocations(newLocations));
    }


    const [columns, setColumns] = useState([
        {title: 'Name', field: 'name'},
        {title: 'Address', field: 'address'},
        {title: 'Coordinates lat,long', field: 'coordinates'},
        {title: 'Category', field: 'category'},
        {title: 'View on map', render: (row) => (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '120px',
                        width: '100px',
                        padding: 0,
                    }}
                >
                    <a href={"https://maps.google.com/?q="+row.link} target="_blank">
                        <img  width="80" height="100" align="center"  src={require('../Style/images/logo.png')}/></a>
                </div>
            )
        },
    ]);

    const [data, setData] = useState(categoryItems.map((item) => ({
        name: item.name, address: item.address,
        coordinates: item.coordinates.latitude + " , " + item.coordinates.longitude, category: item.category,
            link: item.coordinates.latitude + "," + item.coordinates.longitude
        }
    )))


    return (
        <MaterialTable style={{marginTop: '30px'}}
                       icons={tableIcons}
                       title="- Locations - "
                       options={{
                           headerStyle: {fontWeight: "bold", fontSize: 16}, cellStyle: {padding: 0},}}
                       columns={columns}
                       data={data}
                       editable={{
                           onRowAdd: newData =>
                               new Promise((resolve, reject) => {
                                   setTimeout(() => {
                                       const newItems = [...data];
                                       newItems.push(newData)
                                       setData([...newItems]);
                                       addFn(newData);
                                       resolve();
                                   }, 1000)
                               }),
                           onRowUpdate: (newData, oldData) =>
                               new Promise((resolve, reject) => {
                                   setTimeout(() => {
                                       const dataDelete = [...data];
                                       const index = oldData.tableData.id;
                                       dataDelete.splice(index, 1);
                                       dataDelete.push(newData);
                                       setData([...dataDelete]);
                                       updateFn(oldData,newData);
                                       resolve();
                                   }, 1000)
                               }),
                           onRowDelete: oldData =>
                               new Promise((resolve, reject) => {
                                   setTimeout(() => {
                                       const dataDelete = [...data];
                                       const index = oldData.tableData.id;
                                       dataDelete.splice(index, 1);
                                       setData([...dataDelete]);
                                       deleteFn(oldData);
                                       resolve()
                                   }, 1000)
                               }),
                       }}
        />
    )
}