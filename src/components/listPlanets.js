import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom';
import {GridList, GridTile} from 'material-ui/GridList';
import CircularProgress from 'material-ui/CircularProgress';
import axios from 'axios';
import Toggle from 'material-ui/Toggle';


class ListPlanets extends Component{
    constructor(props){
        super(props);
        this.state = {
          listPlanets : <CircularProgress />
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

      fav(id){
        localStorage.setItem(`people/${id}`, !this.getfav(id));
      }
      getfav(id){
        return localStorage.getItem(`people/${id}`) === "true";
      }

    componentDidMount(){
      window.addEventListener("resize", ()=> {
        this.updateDimensions();
      });
      this.updateDimensions();
      let promises = [];
      for (let i=1; i<8; i++){
        promises[i-1] = axios.get(`https://swapi.co/api/planets/?page=${i}`)
        axios.all(promises).then(response => {
          if (response.length === 7){
            let data = response[0].data.results;
            for (let j=0; j<6; j++)
              data = data.concat(response[j+1].data.results);
<<<<<<< HEAD
            for (let j=0; j<data.length; j++) data[j].key = data[j].url.substring(28).slice(0, -1);
            let Items = data.map(
              (planet) => {
                if (!this.state.mobile){
                  let url = planet.url.substring(28).slice(0, -1);
                    return (
                    <Link to={'/planets/' + url} style={{ textDecoration: 'none' }} key={planet.key}> <ListItem
                    primaryText = {planet.name}
                    secondaryText= {planet.climate}
                    rightToggle={<Toggle defaultToggled = {this.getfav(planet.key)} onToggle={() => this.fav(planet.key)} />}
                    /> </Link> );
                }
                else{
                  let url = planet.url.substring(28).slice(0, -1);
                    return (
                    <Link to={'/planets/' + url} style={{ textDecoration: 'none' }} key={planet.key}> <GridTile
                    title = {planet.name}
                    subtitle= {planet.climate}
                    /> </Link> );
                  }
                }
=======
            for (let j=0; j<data.length; j++) data[j].key = j+1;
            let Items = data.map(
              (planet) => {
                let url = "/planets/"+planet.key;
                return (
                <Link to={url} style={{ textDecoration: 'none' }} key={planet.key}> <ListItem
                primaryText = {planet.name}
                secondaryText= {planet.climate}
                /> </Link> );}

>>>>>>> 00bddd9904b0db1aa4931ff667c93ab08c8be1aa
              );
              if (!this.state.mobile) this.setState({listPlanets:<List> {Items} </List>});
              else this.setState({listPlanets : <GridList>{Items}</GridList>})
          }
        }).catch( err => console.log(err));
      }
    }

    render(){
      return (<div>{this.state.listPlanets}</div>);
    }
}

export default ListPlanets;
