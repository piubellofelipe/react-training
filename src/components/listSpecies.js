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
          term : props.term
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
      let prev = this.getfav(id);
      localStorage.setItem(`species/${id}`, !prev);
      this.setState({nothing : id});
    }
    getStar(key){
      return <StarBorder color={this.getfav(key) ? "yellow" : "black"} onClick = {(e) => {this.fav(e, key)}}  />
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
      for (let i=1; i<5; i++)
        promises[i-1] = axios.get(`https://swapi.co/api/species/?page=${i}`)
        axios.all(promises).then(response => {
          if (response.length === 4){
            let data = response[0].data.results;
            for (let j=0; j<3; j++)
              data = data.concat(response[j+1].data.results);
            for (let j=0; j<data.length; j++) data[j].key = data[j].url.substring(28).slice(0, -1);
            this.setState({data : data});
          }
        });
      }


    makeList(){
      if (!this.state.data) return <CircularProgress />
      let data = this.state.data.filter(
        (dat) =>{
          if ( !this.state.term || dat.name.toUpperCase().match(this.state.term.toUpperCase())){
              return dat;
          }
          return false;
        }
      );
      let Items = data.map(
        (specie) => {
            if (!this.state.mobile){
              let url = "/species/"+specie.url.substring(28).slice(0, -1);
              return (
              <ListItem
              key={specie.key}
              primaryText = {<Link to={url} style={{ textDecoration: 'none' }} key={specie.key}>{specie.name}</Link>}
              secondaryText= {specie.language}
              rightIcon = {<IconButton >{this.getStar()}</IconButton>}
              />);
            }
            else{
              let url = "/species/"+specie.url.substring(28).slice(0, -1);
              return (
            <GridTile
              key={specie.key}
              title =  {<Link to={url} style={{ textDecoration: 'none' }} key={specie.key}> {specie.name}</Link> }
              subtitle= {specie.language}
              actionIcon={<IconButton >{this.getStar()}</IconButton>}
              /> );
            }
          }
        );
        if (!this.state.mobile) return <List> {Items} </List>
        else return <GridList>{this.getStar()}</GridList>
    }

    render(){
      return <div>{this.makeList()}</div>
    }
}

export default ListSpecies;
