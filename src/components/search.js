import React, {Component} from 'react';
import ListPeople from './listPeople';

class search extends Component {
    constructor(match){
    super(match);
        this.state = {
          term : "ana"
        }
    }

    componentWillReceiveProps(nextProps){
      this.setState({term : nextProps.match.params.term, peopleData : <listPeople term={nextProps.match.params.term} />});
    }



  render(){
    return (
        <div><ListPeople term={this.state.term}/></div>
    );
  }
}

export default search;
