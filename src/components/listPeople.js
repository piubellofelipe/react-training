import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';
import CircularProgress from 'material-ui/CircularProgress';
import {Link} from 'react-router-dom'
import ActionInfo from 'material-ui/svg-icons/action/info';
import Toggle from 'material-ui/Toggle';


import axios from 'axios';

class ListPeople extends Component{
    constructor(props){
        super(props);
        this.state = {
          listPeople : <CircularProgress />
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

    componentWillUnmount(){
      window.removeEventListener("resize", () => {
        this.updateDimensions();
      });
    }


    fav(id){
      localStorage.setItem(`people/${id}`, !this.getfav(id));
    }
    getfav(id){
      return localStorage.getItem(`people/${id}`) === "true";
    }

    componentDidMount(){
      window.addEventListener("resize", ()=> {
        this.updateDimensions();
      });
      this.updateDimensions();

      let promises = [];
      for (let i=1; i<10; i++){
        promises[i-1] = axios.get(`https://swapi.co/api/people/?page=${i}`)
        axios.all(promises).then(response => {
          if (response.length === 9){
            let data = response[0].data.results;
            for (let j=0; j<8; j++)
              data = data.concat(response[j+1].data.results);

            for (let j=0; j<data.length; j++)
              data[j].key = data[j].url.substring(27).slice(0, -1);
            let Items = data.map(
              (person) => {
                if (!this.state.mobile){
                  let url = person.url.substring(27).slice(0, -1);

                  return (

                  <ListItem
                  primaryText ={ <Link to={"/people/"+url} style={{ textDecoration: 'none' }}> {person.name} </Link> }
                  secondaryText= {person.gender}

                  rightToggle={<Toggle defaultToggled = {this.getfav(person.key)} onToggle={() => this.fav(person.key)} />}
                  /> );
                }
                else{
                  let url = person.url.substring(27).slice(0, -1);
                  return (
                  <Link to={'/people/' + url} style={{ textDecoration: 'none' }} >
                  <GridTile
                  title = {person.name}
                  subtitle= {person.gender}
                  /> </Link> );
                }
              }
              );
            if (!this.state.mobile) this.setState({listPeople:<List> {Items} </List>});
            else this.setState({listPeople : <GridList>{Items}</GridList>})
          }
        }).catch( err => console.log(err));
      }
    }

    render(){
      return (<div>{this.state.listPeople}</div>);
    }
}

export default ListPeople;
