import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star';
import CircularProgress from 'material-ui/CircularProgress';
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

    componentDidMount(){
        window.addEventListener("resize", ()=> {
          this.updateDimensions();
        });
        this.updateDimensions();
        axios.get(`https://swapi.co/api/films/`).then(response => {
            let data = response.data.results;
            for (let j=0; j<data.length; j++) data[j].key = j+1;
            let Items = data.map(
              (movie) => {
                if (!this.state.mobile){
                  let url = movie.url.substring(26).slice(0, -1);
                  return (
                  <Link to={'/movies/' + url} style={{ textDecoration: 'none' }} key={movie.key}>
                    <ListItem
                    primaryText = {movie.title}
                    secondaryText= {movie.episode_id}
                    rightIcon = {<IconButton><StarBorder color = "white"/> </IconButton>}
                    />
                  </Link> );
                }
                else{
                  let url = movie.url.substring(26).slice(0, -1);
                  return (
                  <Link to={'/movies/' + url} style={{ textDecoration: 'none' }} key={movie.key}>
                  <GridTile
                  title = {movie.title}
                  subtitle= {movie.episode_id}
                  actionIcon={<IconButton><StarBorder color = "white"/> </IconButton>}
                  /> </Link> );
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
