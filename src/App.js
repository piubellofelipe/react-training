import React, { Component } from 'react';
import NavBar from './components/appBar';
import LeftDrawer from './components/drawer'
import ListPeople from './components/listPeople'
import ListMovies from './components/listMovies'
import ListVehicles from './components/listVehicles'
import ListSpecies from './components/listSpecies'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter, Route} from 'react-router-dom';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mobile : false,
      windowWidth : 0,
      windowHeight: 0,
      LeftDrawerOpen : false
    }
  }

  updateDimensions() {
        let w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
            height = w.innerHeight || documentElement.clientHeight || body.clientHeight,
            mobile = width < 740;

       this.setState({windowWidth: width, windowHeight: height, mobile: mobile});
//         console.log(width + ' x ' +height);
//        if (mobile && this.state.menuOpen)
//            this.toggleMenu();
    }

    componentDidMount() {
       window.addEventListener("resize", ()=> {
            this.updateDimensions();
        });
        this.updateDimensions();
    }

  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter >
          <div>
            <div>
              <NavBar mobile = {this.state.mobile}
                      onToggleLeftButton ={ () => {this.setState({LeftDrawerOpen: !this.state.LeftDrawerOpen})}}
                      open = {this.state.LeftDrawerOpen}
              />
            </div>
            <div>
              <LeftDrawer mobile = {this.state.mobile}
                          open = {this.state.LeftDrawerOpen}
              />
            </div>
            <div>
                <div>
                  <Route exact path="/people" component={ListPeople} />
                  <Route path="/movies" component={ListMovies} />
                  <Route path="/species" component={ListSpecies} />
                  <Route path="/vehicles" component={ListVehicles} />
                </div>
            </div>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
