import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';
import CircularProgress from 'material-ui/CircularProgress';
import {Link} from 'react-router-dom'
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconButton from 'material-ui/IconButton';
import axios from 'axios';
import Filter from './filters';

class ListPeople extends Component{
    constructor(props){
        super(props);
        this.state = {
          term : props.term,
          filter : {
            maxW : 200,
            minW : 0,
            maxH : 1000,
            minH : 0
          }
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

    fav(e, id){
      let prev = this.getfav(id);
      localStorage.setItem(`people/fav/${id}`, !prev);
      this.setState({nothing : id})
  }

    getfav(id){
      return localStorage.getItem(`people/fav/${id}`) === "true";
    }

    componentWillReceiveProps(nextProps){
      this.setState({term : nextProps.term});
    }

    componentDidMount(){
      window.addEventListener("resize", ()=> {
            this.updateDimensions();
      });

      this.updateDimensions();

      let promises = [];
      for (let i=1; i<10; i++)
        promises[i-1] = axios.get(`https://swapi.co/api/people/?page=${i}`);
      axios.all(promises).then(response => {
        if (response.length === 9){
          let data = response[0].data.results;
          for (let j=0; j<8; j++)
            data = data.concat(response[j+1].data.results);
          for (let j=0; j<data.length; j++)
            data[j].key = data[j].url.substring(27).slice(0, -1);
          this.setState({data : data})
        }
      });
    }

    makeList(){
      if (!this.state.data)  return <CircularProgress />;
      let data2 = this.state.data.filter(
        (dat) =>{
          if ( (!this.state.term || dat.name.toUpperCase().match(this.state.term.toUpperCase())) &&
                (parseFloat(this.state.filter.minH) <= parseFloat(dat.height)) &&
                (parseFloat(this.state.filter.maxH) >= parseFloat(dat.height)) &&
                (parseFloat(this.state.filter.minW) <= parseFloat(dat.mass)) &&
                (parseFloat(this.state.filter.maxW) >= parseFloat(dat.mass))
          ){
              return dat;
          }
          return false;
        }
      );
      let Items = data2.map(
        (person) => {
          if (!this.state.mobile){
              let url = person.url.substring(27).slice(0, -1);
              return (
              <ListItem key={person.key}
              primaryText ={ <Link to={"/people/"+url} style={{ textDecoration: 'none' }}> {person.name} </Link> }
              secondaryText= {person.gender}
              rightIcon = {<IconButton >{this.getStar(person.key)}</IconButton>}
              /> );
          }
          else{
            let url = person.url.substring(27).slice(0, -1);
            return (
              <GridTile
              key={person.key}
              title = {<Link to={'/people/' + url} style={{ textDecoration: 'none' }} >{person.name}</Link>}
              subtitle= {person.gender}
              actionIcon={<IconButton >{this.getStar(person.key)}</IconButton>}>
              <img src={localStorage.getItem(`people/photos/${person.key}`)} alt="Not available" />
              </GridTile>
            );
          }
        });

        if (!this.state.mobile) return <List> {Items} </List>;
        return <GridList>{Items}</GridList>
    }

    getStar(key){
      return <StarBorder color={this.getfav(key) ? "yellow" : "black"} onClick = {(e) => {this.fav(e, key)}}  />
    }


    render(){
      return (
            <div>
            <Filter updateFilter = {(filter) => this.setState({filter : filter})}/>
            <div>{this.makeList()}</div>
            </div>
          );
    }
}

export default ListPeople;
