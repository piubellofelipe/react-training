import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import {ListItem} from 'material-ui/List';
import axios from 'axios';

class specieDetail extends Component{
    constructor(match){
    super(match);
        this.state = {
            params : match.match.params.id,
            data : <CircularProgress />,
            movieInfo : <CircularProgress />,
            peopleInfo : <CircularProgress />
        }
    }

    componentDidMount(){
      axios.get(`http://swapi.co/api/species/${this.state.params}/`).then((response) => {
        this.setState({data : response.data.name});


        let peoplePromises = [];
        for (let i=0; i<response.data.people.length; i++)  peoplePromises[i] = axios.get(response.data.people[i]);
        axios.all(peoplePromises).then( response2 => {
          let people = response2.map(result => {
            let url = result.data.url.substring(27).slice(0, -1);
            return <ListItem><Link to={'/people/'+url } style={{ textDecoration: 'none' }} >{result.data.name}</Link></ListItem>;
          });
          let peopleList = <ListItem primaryText = "People" nestedItems={people}/>
          this.setState({peopleInfo : peopleList});
        });
          let filmsPromises = [];
          for (let i=0; i<response.data.films.length; i++)  filmsPromises[i] = axios.get(response.data.films[i]);
          axios.all(filmsPromises).then( response2 => {
            let films = response2.map(result => {
              let url = result.data.url.substring(26).slice(0, -1);
              return <ListItem><Link to={'/movies/'+url } style={{ textDecoration: 'none' }} >{result.data.title}</Link></ListItem>;
            });
            let filmsList = <ListItem primaryText = "Movies" nestedItems={films}/>
            this.setState({movieInfo : filmsList});
          });


      });
      let lastFav = localStorage.getItem(`species/${this.state.params}`);
      this.setState({favorite : (lastFav === "true")});
    }


    favorUnfavor(){
       let fav = this.state.favorite;
       this.setState({favorite : !fav});
       localStorage.setItem(`species/${this.state.params}`, !fav);
    }

    render() {
      return (<div>
        <Link to="/species/"> Voltar </Link>
         {this.state.data}
         <div onClick ={() => this.favorUnfavor()}>favorito? {this.state.favorite === true ? "true" : "false"}</div>
         {this.state.peopleInfo}
         {this.state.movieInfo}
         </div>

      )
    };
}
export default specieDetail;
