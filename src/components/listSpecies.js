import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom';
import {GridList, GridTile} from 'material-ui/GridList';
import CircularProgress from 'material-ui/CircularProgress';
import axios from 'axios';

class ListSpecies extends Component{
    constructor(props){
        super(props);
        this.state = {
          listSpecies : <CircularProgress />
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
        promises[i-1] = axios.get(`https://swapi.co/api/species/?page=${i}`)
        axios.all(promises).then(response => {
          if (response.length === 4){
            let data = response[0].data.results;
            for (let j=0; j<3; j++)
              data = data.concat(response[j+1].data.results);
            for (let j=0; j<data.length; j++) data[j].key = j;
            let Items = data.map(
              (specie) => {
<<<<<<< HEAD
                if (!this.state.mobile){
                  let url = "/species/"+specie.url.substring(28).slice(0, -1);
                  return (
                  <Link to={url} style={{ textDecoration: 'none' }} key={specie.key}> <ListItem
                  primaryText = {specie.name}
                  secondaryText= {specie.language}
                  /> </Link> );
                }
                else{
                  let url = "/species/"+specie.url.substring(28).slice(0, -1);
                  return (
                  <Link to={url} style={{ textDecoration: 'none' }} key={specie.key}> <GridTile
                  title = {specie.name}
                  subtitle= {specie.language}
                  /> </Link> );
                }
              }
=======
                let url = "/species/"+specie.key;
                return (
                <Link to={url} style={{ textDecoration: 'none' }} key={specie.key}> <ListItem
                primaryText = {specie.name}
                secondaryText= {specie.language}
                /> </Link> );}

>>>>>>> 00bddd9904b0db1aa4931ff667c93ab08c8be1aa
              );
              if (!this.state.mobile) this.setState({listSpecies:<List> {Items} </List>});
              else this.setState({listSpecies : <GridList>{Items}</GridList>})
          }
        }).catch( err => console.log(err));
      }
    }

    render(){
      return (<div>{this.state.listSpecies}</div>);
    }
}

export default ListSpecies;
