import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import {ListItem} from 'material-ui/List';
import axios from 'axios';

class vehicleDetail extends Component{
    constructor(match){
    super(match);
        this.state = {
            params : match.match.params.id,
            data : <CircularProgress />,
            pilots : <CircularProgress />,
            movieInfo : <CircularProgress />
        }
    }

    componentDidMount(){
      axios.get(`http://swapi.co/api/vehicles/${this.state.params}/`).then((response) => {
        this.setState({data : response.data.name});

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

          let peoplePromises = [];
          for (let i=0; i<response.data.pilots.length; i++)  peoplePromises[i] = axios.get(response.data.pilots[i]);
          axios.all(peoplePromises).then( response2 => {
              let people = response2.map(result => {
              let url = result.data.url.substring(27).slice(0, -1);
              return <ListItem><Link to={'/people/'+url } style={{ textDecoration: 'none' }} >{result.data.name}</Link></ListItem>;
            })

            this.setState({pilots : <ListItem primaryText="Pilots" nestedItems={people}/>});
          });




      }).catch((error) => {console.log(error)});
      let lastFav = localStorage.getItem(`vehicles/${this.state.params}`);
      this.setState({favorite : (lastFav === "true")});
    }

    favorUnfavor(){
       let fav = this.state.favorite;
       this.setState({favorite : !fav});
       localStorage.setItem(`vehicles/${this.state.params}`, !fav);
    }

    render() {
      return (<div>
        <Link to="/vehicles/"> Voltar </Link>
        <div onClick ={() => this.favorUnfavor()}>favorito? {this.state.favorite === true ? "true" : "false"}</div>
         {this.state.data}
         {this.state.pilots}
         {this.state.movieInfo}
         </div>

      )
    };
}
export default vehicleDetail;
