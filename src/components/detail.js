import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Detail extends Component{
    constructor(match){
    super(match);
        console.log(match);
        this.state = {
            params : match.match.params.id
        }
    }

    componentDidMount(){

    }
    
    render() {
    return (<div>
    <Link to="/people/"> Voltar </Link>
     {this.state.params} </div>
    )};
}
export default Detail;