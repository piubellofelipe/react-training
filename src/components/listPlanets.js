import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom'
import axios from 'axios';

class ListPlanets extends Component{
    constructor(props){
        super(props);
        this.state = {
          listPlanets : "loading..."
        }
    }

    componentDidMount(){
      let promises = [];
      for (let i=1; i<8; i++){
        promises[i-1] = axios.get(`https://swapi.co/api/planets/?page=${i}`)
        axios.all(promises).then(response => {
          if (response.length === 7){
            let data = response[0].data.results;
            for (let j=0; j<6; j++)
              data = data.concat(response[j+1].data.results);
            let Items = data.map(
              (planet) => {
                let url = "/planets/"+planet.name;
                return (
                <Link to={url} style={{ textDecoration: 'none' }} > <ListItem
                primaryText = {planet.name}
                secondaryText= {planet.climate}
                /> </Link> );}

              );
            this.setState({listPlanets:<List> {Items} </List>});
          }
        }).catch( err => console.log(err));
      }
    }

    render(){
      return (<div>{this.state.listPlanets}</div>);
    }
}

export default ListPlanets;
