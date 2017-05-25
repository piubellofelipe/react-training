import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router-dom'

class LeftDrawer extends Component {
    constructor(props) {
      super(props);

    }

    render() {
      return (
        <div>
          <Drawer open={!this.props.mobile || (this.props.mobile && this.props.open)}  containerStyle={{ marginTop: 64}}>
            <MenuItem><Link to="/movies">List movies</Link></MenuItem>
            <MenuItem><Link to="/people">List People</Link></MenuItem>
            <MenuItem><Link to="/vehicles">List Vehicles</Link></MenuItem>
            <MenuItem><Link to="/species">List Species</Link></MenuItem>
          </Drawer>
        </div>
      );
    }
  }

export default LeftDrawer;
