import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField'

class NavBar extends Component {
<<<<<<< HEAD

  handleChange = (event) =>{
    console.log(event.target.value);
  }
=======
>>>>>>> 00bddd9904b0db1aa4931ff667c93ab08c8be1aa

  render(){
    return (
      <div>
      <AppBar title="Search" showMenuIconButton = {this.props.mobile}
<<<<<<< HEAD
         iconElementRight = {<div> <TextField hintText = "Search tool" onChange={this.handleChange}/> </div>}
         onLeftIconButtonTouchTap ={ () => this.props.onToggleLeftButton()} />
=======
        onLeftIconButtonTouchTap ={ () => this.props.onToggleLeftButton()}
      />
>>>>>>> 00bddd9904b0db1aa4931ff667c93ab08c8be1aa
      </div>
    );
  }
}

export default NavBar;
