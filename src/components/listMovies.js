import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom'
import axios from 'axios';

class ListMovies extends Component{
    constructor(props){
        super(props);
        this.state = {
          listMovies : "loading..."
        }
    }

    componentDidMount(){
        axios.get(`https://swapi.co/api/films/`).then(response => {
            let data = response.data.results;
            let Items = data.map(
              (movie) => {
                let url = "/movies/"+movie.name;
                return (
                <Link to={url} style={{ textDecoration: 'none' }} > <ListItem
                primaryText = {movie.title}
                secondaryText= {movie.episode_id}
                /> </Link> );}

              );
            this.setState({listMovies:<List> {Items} </List>});
          }
        ).catch( err => console.log(err));
      }


    render(){
      return (<div>{this.state.listMovies}</div>);
    }
}

export default ListMovies;
