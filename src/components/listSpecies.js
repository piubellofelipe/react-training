import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';
import CircularProgress from 'material-ui/CircularProgress';
import {Link} from 'react-router-dom'
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconButton from 'material-ui/IconButton';
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
    fav(e, id){
      localStorage.setItem(`species/${id}`, !this.getfav(id));
      let color = this.getfav(id) ? "yellow" : "black";
      e.target.style=`display: inline-block; color: rgba(0, 0, 0, 0.87); fill: ${color}; height: 24px; width: 24px; user-select: none; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;`
    }
    getfav(id){
      return localStorage.getItem(`species/${id}`) === "true";
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
            for (let j=0; j<data.length; j++) data[j].key = data[j].url.substring(28).slice(0, -1);
            let Items = data.map(
              (specie) => {
            var star = <StarBorder color={this.getfav(specie.key) ? "yellow" : "black"} onClick = {(e) => {this.fav(e, specie.key)}}  />
                if (!this.state.mobile){
                  let url = "/species/"+specie.url.substring(28).slice(0, -1);
                  return (
                  <ListItem
                  primaryText = {<Link to={url} style={{ textDecoration: 'none' }} key={specie.key}>{specie.name}</Link>}
                  secondaryText= {specie.language}
                  rightIcon = {<IconButton >{star}</IconButton>}
                  />);
                }
                else{
                  let url = "/species/"+specie.url.substring(28).slice(0, -1);
                  return (
                 <GridTile
                  title =  {<Link to={url} style={{ textDecoration: 'none' }} key={specie.key}> {specie.name}</Link> }
                  subtitle= {specie.language}
                  actionIcon={<IconButton >{star}</IconButton>}
                  /> );
                }
              }
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
