import React, {Component} from 'react';
import ListPeople from './listPeople'
import ListMovies from './listMovies'
import ListVehicles from './listVehicles'
import ListSpecies from './listSpecies'
import ListPlanets from './listPlanets'

class search extends Component {
    constructor(match){
    console.log(match);
        super(match);
        this.state = {
          term : match.match.params.term,
          category : match.match.params.category
        }
    }

    componentWillReceiveProps(nextProps){
      this.setState({term : nextProps.match.params.term, category : nextProps.match.params.category});
    }

    makeSearch(){
      if (this.state.category === "people"){
        return <ListPeople term={this.state.term}/>
      }
      if (this.state.category === "movies"){
        return <ListMovies term={this.state.term}/>
      }
      if (this.state.category === "vehicles"){
        return <ListVehicles term={this.state.term}/>
      }
      if (this.state.category === "species"){
        return <ListSpecies term={this.state.term}/>
      }
      if (this.state.category === "planets"){
        return <ListPlanets term={this.state.term}/>
      }

    }


  render(){
    return (
      <div>{this.makeSearch()}</div>
    );
  }
}

export default search;
