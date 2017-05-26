import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom'
import axios from 'axios';

class ListVehicles extends Component{
    constructor(props){
        super(props);
        this.state = {
          listVehicles : "loading..."
        }
    }

    componentDidMount(){
      let promises = [];
      for (let i=1; i<5; i++){
        promises[i-1] = axios.get(`https://swapi.co/api/vehicles/?page=${i}`)
        axios.all(promises).then(response => {
          if (response.length === 4){
            let data = response[0].data.results;
            for (let j=0; j<3; j++)
              data = data.concat(response[j+1].data.results);
            let Items = data.map(
              (vehicle) => {
                let url = "/vehicles/"+vehicle.name;
                return (
                <Link to={url} style={{ textDecoration: 'none' }} > <ListItem
                primaryText = {vehicle.name}
                secondaryText= {vehicle.manufacturer}
                /> </Link> );}

              );
            this.setState({listVehicles:<List> {Items} </List>});
          }
        }).catch( err => console.log(err));
      }
    }

    render(){
      return (<div>{this.state.listVehicles}</div>);
    }
}

export default ListVehicles;
