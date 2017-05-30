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
            maxW : 1000000,
            minW : 0,
            maxA : 1000000,
            minA : 0
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
      localStorage.setItem(`people/${id}`, !prev);
      let color = prev ? "yellow" : "black";
      e.target.style=`display: inline-block; color: rgba(0, 0, 0, 1); fill: ${color}; height: 24px; width: 24px; user-select: none; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;`

    }

    getfav(id){
      return localStorage.getItem(`people/${id}`) === "true";
    }

    componentWillReceiveProps(nextProps){
      this.setState({term : nextProps.term});
      this.setState({listPeople : this.makeList()});
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
      }).catch(err => console.log(err));
    }

        makeList(){
            if (!this.state.data)  return <CircularProgress />;
            let data2 = this.state.data.filter(
              (dat) =>{
                if (!this.state.term || dat.name.toUpperCase().match(this.state.term.toUpperCase()) &&
                    (parseFloat(this.state.filter.minA) <= parseFloat(dat.age)) &&
                    (parseFloat(this.state.filter.maxA) >= parseFloat(dat.age)) &&
                    (parseFloat(this.state.filter.minW) <= parseFloat(dat.weight)) &&
                    (parseFloat(this.state.filter.maxW) >= parseFloat(dat.weight))
                ) return dat;
              }
            )

            let Items = data2.map(
              (person) => {
                var star = <StarBorder color={this.getfav(person.key) ? "yellow" : "black"} onClick = {(e) => {this.fav(e, person.key)}}  />
                if (!this.state.mobile){
                    let url = person.url.substring(27).slice(0, -1);
                    return (
                    <ListItem
                    primaryText ={ <Link to={"/people/"+url} style={{ textDecoration: 'none' }}> {person.name} </Link> }
                    secondaryText= {person.gender}
                    rightIcon = {<IconButton >{star}</IconButton>}
                    /> );
                }
                else{
                    let url = person.url.substring(27).slice(0, -1);
                    return (
                    <GridTile
                    title = { <Link to={'/people/' + url} style={{ textDecoration: 'none' }} >{person.name}</Link> }
                    subtitle= {person.gender}
                    actionIcon={<IconButton >{star}</IconButton>}

                    />  );
                  }
              });

              if (!this.state.mobile) return <List> {Items} </List>;
              return <GridList> {Items} </GridList>;
          }


    render(){
      console.log("render");

      return (
            <div>
            <Filter updateFilter = {(filter) => this.setState({filter : filter})}/>
            {this.makeList()}
            </div>
          );
    }
}

export default ListPeople;
