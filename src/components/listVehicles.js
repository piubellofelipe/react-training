import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom';
import {GridList, GridTile} from 'material-ui/GridList';
import CircularProgress from 'material-ui/CircularProgress';
import axios from 'axios';

class ListVehicles extends Component{
    constructor(props){
        super(props);
        this.state = {
          listVehicles : <CircularProgress />
        }
    }
    updateDimensions() {
          let w = window,
              d = document,
              documentElement = d.documentElement,
              body = d.getElementsByTagName('body')[0],
              width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
              mobile = width < 740;

         this.setState({mobile: mobile});
      }

    componentDidMount(){
      window.addEventListener("resize", ()=> {
        this.updateDimensions();
      });
      this.updateDimensions();
      let promises = [];
      for (let i=1; i<5; i++){
        promises[i-1] = axios.get(`https://swapi.co/api/vehicles/?page=${i}`)
        axios.all(promises).then(response => {
          if (response.length === 4){
            let data = response[0].data.results;
            for (let j=0; j<3; j++)
              data = data.concat(response[j+1].data.results);
            for (let j=0; j<data.length; j++) data[j].key = j+1;
            let Items = data.map(
            (vehicle) => {
                if (!this.state.mobile){
                  let url = vehicle.url.substring(29).slice(0, -1);
                  return (
                  <Link to={'/vehicles/'+url} style={{ textDecoration: 'none' }} key={vehicle.key} > <ListItem
                  primaryText = {vehicle.name}
                  secondaryText= {vehicle.manufacturer}
                  /> </Link> );
                }
                else{
                  let url = vehicle.url.substring(29).slice(0, -1);
                  return (
                  <Link to={'/vehicles/'+url} style={{ textDecoration: 'none' }} key={vehicle.key} > <GridTile
                  title = {vehicle.name}
                  subtitle= {vehicle.manufacturer}
                  /> </Link> );
                }
              }
              );
              if (!this.state.mobile) this.setState({listVehicles:<List> {Items} </List>});
              else this.setState({listVehicles : <GridList>{Items}</GridList>})
          }
        }).catch( err => console.log(err));
      }
    }

    render(){
      return (<div>{this.state.listVehicles}</div>);
    }
}

export default ListVehicles;
