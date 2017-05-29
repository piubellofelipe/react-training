import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';
import axios from 'axios';

class movieDetail extends Component{
    constructor(match){
    super(match);
        this.state = {
            params : match.match.params.id,
            movieInfo : <CircularProgress />,
            peopleInfo : <CircularProgress />,
            vehicleInfo : <CircularProgress />,
            planetsInfo : <CircularProgress />,
            starhipsInfo : <CircularProgress />,
            speciesInfo : <CircularProgress />


        }
    }

    componentDidMount(){
      axios.get(`http://swapi.co/api/films/${this.state.params}/`).then((response) => {
        this.setState({movieInfo : response.data.title});

        let peoplePromises = [];
        for (let i=0; i<response.data.characters.length; i++)  peoplePromises[i] = axios.get(response.data.characters[i]);
        axios.all(peoplePromises).then( response2 => {
            let people = response2.map(result => {
            let url = result.data.url.substring(27).slice(0, -1);
            return <ListItem><Link to={'/people/'+url } style={{ textDecoration: 'none' }} >{result.data.name}</Link></ListItem>;
          })

          this.setState({peopleInfo : <ListItem primaryText="Characters" nestedItems={people}/>});
        });

        let vehiclePromises = [];
        for (let i=0; i<response.data.vehicles.length; i++)  vehiclePromises[i] = axios.get(response.data.vehicles[i]);
        axios.all(vehiclePromises).then( response2 => {
            let vehicles = response2.map(result => {
              let url = result.data.url.substring(27).slice(0, -1);
              return <ListItem><Link to={'/vehicle/'+url } style={{ textDecoration: 'none' }}  >{result.data.name}</Link></ListItem>;
          })
          this.setState({vehicleInfo : <ListItem primaryText="Vehicles" nestedItems={vehicles}/>});
        });

        let planetPromises = [];
        for (let i=0; i<response.data.planets.length; i++)  planetPromises[i] = axios.get(response.data.planets[i]);
        axios.all(planetPromises).then( response2 => {
            let planets = response2.map(result => {
              let url = result.data.url.substring(28).slice(0, -1);
              return <ListItem><Link to={'/planets/'+url } style={{ textDecoration: 'none' }} >{result.data.name}</Link></ListItem>;
          })
          this.setState({planetsInfo : <ListItem primaryText="Planets" nestedItems={planets}/>});
        });

        let starshipsPromises = [];
        for (let i=0; i<response.data.planets.length; i++)  starshipsPromises[i] = axios.get(response.data.starships[i]);
        axios.all(starshipsPromises).then( response2 => {
            let starships = response2.map(result => {
              return <ListItem>{result.data.name}</ListItem>;
          })
          this.setState({starshipsInfo : <ListItem primaryText="Starhips" nestedItems={starships}/>});
        });

        let speciesPromises = [];
        for (let i=0; i<response.data.species.length; i++)  speciesPromises[i] = axios.get(response.data.species[i]);
        axios.all(speciesPromises).then( response2 => {
            let species = response2.map(result => {
              let url = result.data.url.substring(28).slice(0, -1);
              return <ListItem><Link to={'/species/'+url } style={{ textDecoration: 'none' }}  >{result.data.name}</Link></ListItem>;
          })
          this.setState({speciesInfo : <ListItem primaryText="Species" nestedItems={species}/>});
        });




      });


      let lastFav = localStorage.getItem(`movie/${this.state.params}`);
      this.setState({favorite : (lastFav === "true")});





    }



    favorUnfavor(){
       let fav = this.state.favorite;
       this.setState({favorite : !fav});
       localStorage.setItem(`movie/${this.state.params}`, !fav);
    }

    render() {
      return (<div>
        <Link to="/movies/"> Voltar </Link>
        <div onClick ={() => this.favorUnfavor()}>favorito? {this.state.favorite === true ? "true" : "false"}</div>
        <List>
          {this.state.movieInfo}
          {this.state.peopleInfo}
          {this.state.vehicleInfo}
          {this.state.planetsInfo}
          {this.state.speciesInfo}
          {this.state.starshipsInfo}
        </List>
         </div>

      )
    };
}
export default movieDetail;
