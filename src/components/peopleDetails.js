import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import {ListItem} from 'material-ui/List';
import axios from 'axios';


class personDetail extends Component{
    constructor(match){
    super(match);
        this.state = {
            params : match.match.params.id,
            personInfo : <CircularProgress />,
            movieInfo : <CircularProgress />,
            speciesInfo : <CircularProgress />,
            vehicleInfo : <CircularProgress />,
            starshipsInfo : <CircularProgress />
        }
    }

    favorUnfavor(){
           let fav = this.state.favorite;
           this.setState({favorite : !fav});
           localStorage.setItem(`people/${this.state.params}`, !fav);
    }

    componentDidMount(){
      axios.get(`http://swapi.co/api/people/${this.state.params}/`).then((response) => {
        let personInfo = <ListItem> {response.data.name}, {response.data.height}, {response.data.hair_color} </ListItem>
        this.setState({personInfo});

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

          let vehiclePromises = [];
          for (let i=0; i<response.data.vehicles.length; i++)  vehiclePromises[i] = axios.get(response.data.vehicles[i]);
          axios.all(vehiclePromises).then( response2 => {
              let vehicles = response2.map(result => {
                let url = result.data.url.substring(29).slice(0, -1);
                return <ListItem><Link to={'/vehicles/'+url } style={{ textDecoration: 'none' }}  >{result.data.name}</Link></ListItem>;
            })
            this.setState({vehicleInfo : <ListItem primaryText="Vehicles" nestedItems={vehicles}/>});
          });

          let starshipsPromises = [];
          for (let i=0; i<response.data.starships.length; i++)  starshipsPromises[i] = axios.get(response.data.starships[i]);
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
      let lastFav = localStorage.getItem(`people/${this.state.params}`);
      this.setState({favorite : (lastFav === "true")});

    }

    render() {
      return (<div>
        <Link to="/people/"> Voltar </Link>
        <div onClick ={() => this.favorUnfavor()}> favorito? {this.state.favorite === true ? "true" : "false"} </div>
        {this.state.personInfo}
        {this.state.movieInfo}
        {this.state.starshipsInfo}
        {this.state.speciesInfo}
        {this.state.vehicleInfo}

         </div>

      )
    };
}
export default personDetail;
