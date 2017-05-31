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
      localStorage.setItem(`movie/${id}`, !prev);
      this.setState({nothing : id});
    }
    getStar(key){
      return <StarBorder color={this.getfav(key) ? "yellow" : "black"} onClick = {(e) => {this.fav(e, key)}}  />
    }
    getfav(id){
      return localStorage.getItem(`movie/${id}`) === "true";
    }


    componentWillReceiveProps(nextProps){
      this.setState({term : nextProps.term});
    }

    componentDidMount(){
        window.addEventListener("resize", ()=> {
          this.updateDimensions();
        });
        this.updateDimensions();
        axios.get(`https://swapi.co/api/films/`).then(response => {
            let data = response.data.results;
            for (let j=0; j<data.length; j++) data[j].key = data[j].url.substring(26).slice(0, -1);
            this.setState({data : data});
      });
    }

    makeList(){
      if (!this.state.data) return  <CircularProgress />
      let data = this.state.data.filter(
            (dat) =>{
              if ( !this.state.term || dat.title.toUpperCase().match(this.state.term.toUpperCase())){
                  return dat;
              }
              return false;
            }
          );

      let Items = data.map(
        (movie) => {
      var star = <StarBorder color={this.getfav(movie.key) ? "yellow" : "black"} onClick = {(e) => {this.fav(e, movie.key)}}  />
          if (!this.state.mobile){
            let url = movie.url.substring(26).slice(0, -1);
            return (

              <ListItem
              key={movie.key}
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
            key={movie.key}
            title = {<Link to={'/movies/' + url} style={{ textDecoration: 'none' }} key={movie.key}>{movie.title}</Link>}
            subtitle= {movie.episode_id}
            actionIcon={<IconButton >{star}</IconButton>}
            />  );
            }
          }
      );
      if (!this.state.mobile) return <List> {Items} </List>;
      return <GridList>{Items}</GridList>;
}



    render(){
      return (<div>{this.makeList()}</div>);
    }
}

export default ListMovies;
