import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField'

class NavBar extends Component {

  handleChange = (event) =>{
    console.log(event.target.value);
  }

  render(){
    return (
      <div>
      <AppBar title="Search" showMenuIconButton = {this.props.mobile}
         iconElementRight = {<div> <TextField hintText = "Search tool" onChange={this.handleChange}/> </div>}
         onLeftIconButtonTouchTap ={ () => this.props.onToggleLeftButton()} />
      </div>
    );
  }
}

export default NavBar;
