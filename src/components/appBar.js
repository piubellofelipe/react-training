import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconButton from 'material-ui/IconButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router-dom';




class NavBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      term : "",
      value : 0
    }
  }

  handleChange = (event) =>{
    this.setState({term:event.target.value});
  }
  handleChangeCategory = (event) =>{
    console.log(event.target.value);
  }
  applySearch(){
    this.props.applySearch(this.state.term);
  }

  render(){
    return (
      <div>
      <AppBar title="Search" showMenuIconButton = {this.props.mobile}
         iconElementRight = {
           <div>
              <TextField hintText = "Search tool" onChange={this.handleChange}/>
              <IconButton>
                <Link  to={"/search/people/"+this.state.term}>
                  <StarBorder onClick={() => this.applySearch()}/>
                </Link>
              </IconButton>
           </div>
         }
        onLeftIconButtonTouchTap ={ () => this.props.onToggleLeftButton()} />
      </div>
    );
  }
}

export default NavBar;
