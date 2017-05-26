import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';
import {Link} from 'react-router-dom'

import axios from 'axios';

class ListPeople extends Component{
    constructor(props){
        super(props);
        this.state = {
          listPeople : "loading..."
        }
    }

    componentDidMount(){
      let promises = [];
      for (let i=1; i<10; i++){
        promises[i-1] = axios.get(`https://swapi.co/api/people/?page=${i}`)
        axios.all(promises).then(response => {
          if (response.length === 9){
            let data = response[0].data.results;
            for (let j=0; j<8; j++)
              data = data.concat(response[j+1].data.results);
            let Items = data.map(
              (person) => {
                if (!this.props.mobile){
                  let url = "/people/"+person.name;
                  return (
                  <Link to={url} style={{ textDecoration: 'none' }} > <ListItem
                  primaryText = {person.name}
                  secondaryText= {person.gender}
                  /> </Link> );
                }
                else{
                  let url = "/people/"+person.name;
                  return (
                  <Link to={url} style={{ textDecoration: 'none' }} >
                  <GridTile
                  title = {person.name}
                  subtitle= {person.gender}
                  /> </Link> );
                }
              }
              );
            if (!this.props.mobile) this.setState({listPeople:<List> {Items} </List>});
            else this.setState({listPeople : <GridList cols={2} cellHeight={200} padding={1}> {Items} </GridList>})
          }
        }).catch( err => console.log(err));
      }
    }

    render(){
      return (<div>{this.state.listPeople}</div>);
    }
}

export default ListPeople;
