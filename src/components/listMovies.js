import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';
import CircularProgress from 'material-ui/CircularProgress';
import {Link} from 'react-router-dom'
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconButton from 'material-ui/IconButton';
import axios from 'axios';

class ListMovies extends Component{
    constructor(props){
        super(props);
        this.state = {
          listMovies : <CircularProgress />
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
      localStorage.setItem(`movie/${id}`, !this.getfav(id));
      let color = this.getfav(id) ? "yellow" : "black";
      e.target.style=`display: inline-block; color: rgba(0, 0, 0, 0.87); fill: ${color}; height: 24px; width: 24px; user-select: none; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;`
    }
    getfav(id){
      return localStorage.getItem(`movie/${id}`) === "true";
    }

    componentDidMount(){
        window.addEventListener("resize", ()=> {
          this.updateDimensions();
        });
        this.updateDimensions();
        axios.get(`https://swapi.co/api/films/`).then(response => {
            let data = response.data.results;
            for (let j=0; j<data.length; j++) data[j].key = data[j].url.substring(26).slice(0, -1);
            let Items = data.map(
              (movie) => {
            var star = <StarBorder color={this.getfav(movie.key) ? "yellow" : "black"} onClick = {(e) => {this.fav(e, movie.key)}}  />
                if (!this.state.mobile){
                  let url = movie.url.substring(26).slice(0, -1);
                  return (
                  
                    <ListItem
                    primaryText = {<Link to={'/movies/' + url} style={{ textDecoration: 'none' }} key={movie.key}> {movie.title}</Link>}
                    secondaryText= {movie.episode_id}
                  rightIcon = {<IconButton >{star}</IconButton>}
                    />
                   );
                }
                else{
                  let url = movie.url.substring(26).slice(0, -1);
                  return (
                  
                  <GridTile
                  title = {<Link to={'/movies/' + url} style={{ textDecoration: 'none' }} key={movie.key}>{movie.title}</Link>}
                  subtitle= {movie.episode_id}
                  actionIcon={<IconButton >{star}</IconButton>}
                  />  );
                  }
                }
            );
            if (!this.state.mobile) this.setState({listMovies:<List> {Items} </List>});
            else this.setState({listMovies : <GridList>{Items}</GridList>})
          }
        ).catch( err => console.log(err));
      }


    render(){
      return (<div>{this.state.listMovies}</div>);
    }
}

export default ListMovies;
