import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router-dom'

class LeftDrawer extends Component {

    render() {
      return (
        <div>
          <Drawer open={!this.props.mobile || (this.props.mobile && this.props.open)}  containerStyle={{ marginTop: 68}}>
            <Link to="/people" style={{ textDecoration: 'none' }} 
                  onClick = {() => {this.props.onSelectCategory()}}><MenuItem>People</MenuItem></Link>
            <Link to="/movies" style={{ textDecoration: 'none' }}
                  onClick = {() => {this.props.onSelectCategory()}}><MenuItem>Movies</MenuItem></Link>
            <Link to="/vehicles" style={{ textDecoration: 'none' }}
                  onClick = {() => {this.props.onSelectCategory()}}><MenuItem>Vehicles</MenuItem></Link>
            <Link to="/species" style={{ textDecoration: 'none' }}
                  onClick = {() => {this.props.onSelectCategory()}}><MenuItem>Species</MenuItem></Link>
            <Link to="/planets" style={{ textDecoration: 'none' }}
                  onClick = {() => {this.props.onSelectCategory()}}><MenuItem>Planets</MenuItem></Link>
          </Drawer>
        </div>
      );
    }
  }

export default LeftDrawer;
