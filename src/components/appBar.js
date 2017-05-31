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
      category : "people"
    }
  }

  handleChange = (event) =>{
    this.setState({term:event.target.value});
  }
  handleChangeCategory = (event, key, value) =>{
    this.setState({category : value});
  }
  applySearch(){
    this.props.applySearch(this.state.term);
  }

  render(){
    return (
      <div>
      <AppBar title="Search" showMenuIconButton = {this.props.mobile}
         iconElementRight = {
           <div style={{display : "flex"}}>
             <div >
                <TextField hintText = "Search" style={{width:"50%"}} onChange={this.handleChange}/>
                <IconButton>
                  <Link  to={`/search/${this.state.category}/${this.state.term}`}>
                    <StarBorder onClick={() => this.applySearch()}/>
                  </Link>
                </IconButton>
              </div>
              <div style={{flex : 1, zIndex : 10 }}>
                <DropDownMenu value={this.state.category} onChange={this.handleChangeCategory}>
                  <MenuItem value={"people"} label={"People"} primaryText="People"/>
                  <MenuItem value={"movies"} label={"Movies"} primaryText="Movies"/>
                  <MenuItem value={"vehicles"} label={"Vehicles"} primaryText="Vehicles"/>
                  <MenuItem value={"species"} label={"Species"} primaryText="Species"/>
                  <MenuItem value={"planets"} label={"Planets"} primaryText="Planets"/>
                </DropDownMenu>
              </div>
           </div>
         }
        onLeftIconButtonTouchTap ={ () => this.props.onToggleLeftButton()} />
      </div>
    );
  }
}

export default NavBar;
