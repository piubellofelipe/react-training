import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom'
import axios from 'axios';

class ListSpecies extends Component{
    constructor(props){
        super(props);
        this.state = {
          listSpecies : "loading..."
        }
    }

    componentDidMount(){
      let promises = [];
      for (let i=1; i<5; i++){
        promises[i-1] = axios.get(`https://swapi.co/api/species/?page=${i}`)
        axios.all(promises).then(response => {
          if (response.length === 4){
            let data = response[0].data.results;
            for (let j=0; j<3; j++)
              data = data.concat(response[j+1].data.results);
            let Items = data.map(
              (species) => {
                let url = "/Species/"+species.name;
                return (
                <Link to={url} style={{ textDecoration: 'none' }} > <ListItem
                primaryText = {species.name}
                secondaryText= {species.language}
                /> </Link> );}

              );
            this.setState({listSpecies:<List> {Items} </List>});
          }
        }).catch( err => console.log(err));
      }
    }

    render(){
      return (<div>{this.state.listSpecies}</div>);
    }
}

export default ListSpecies;
