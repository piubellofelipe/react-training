import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';
import CircularProgress from 'material-ui/CircularProgress';
import {Link} from 'react-router-dom'
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconButton from 'material-ui/IconButton';
import axios from 'axios';


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

    fav(e, id){
      localStorage.setItem(`planets/${id}`, !this.getfav(id));
      let color = this.getfav(id) ? "yellow" : "black";
      e.target.style=`display: inline-block; color: rgba(0, 0, 0, 0.87); fill: ${color}; height: 24px; width: 24px; user-select: none; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;`
    }
      getfav(id){
        return localStorage.getItem(`planets/${id}`) === "true";
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
            for (let j=0; j<data.length; j++) data[j].key = data[j].url.substring(28).slice(0, -1);
            let Items = data.map(
              (planet) => {
            var star = <StarBorder color={this.getfav(planet.key) ? "yellow" : "black"} onClick = {(e) => {this.fav(e, planet.key)}}  />
                if (!this.state.mobile){
                  let url = planet.url.substring(28).slice(0, -1);
                    return (
                   <ListItem
                    primaryText = {<Link to={'/planets/' + url} style={{ textDecoration: 'none' }} key={planet.key}> {planet.name} </Link>}
                    secondaryText= {planet.climate}
                  rightIcon = {<IconButton >{star}</IconButton>}
                    />);
                }
                else{
                  let url = planet.url.substring(28).slice(0, -1);
                    return (
                    <GridTile
                    title = {<Link to={'/planets/' + url} style={{ textDecoration: 'none' }} key={planet.key}> {planet.name}</Link>}
                    subtitle= {planet.climate}
                    actionIcon={<IconButton >{star}</IconButton>}
                    />  );
                  }
                }
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
