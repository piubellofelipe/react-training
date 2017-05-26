import React, { Component } from 'react';
import NavBar from './components/appBar';
import LeftDrawer from './components/drawer'
import ListPeople from './components/listPeople'
import ListMovies from './components/listMovies'
import ListVehicles from './components/listVehicles'
import ListSpecies from './components/listSpecies'
import ListPlanets from './components/listPlanets'
import axios from 'axios'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter, Route} from 'react-router-dom';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mobile : false,
      windowWidth : 0,
      windowHeight: 0,
      LeftDrawerOpen : false,
      routeMargin: 0,
    }
  }

  updateDimensions() {
        let w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
            height = w.innerHeight || documentElement.clientHeight || body.clientHeight,
            mobile = width < 740,
            routeMargin = 0;
            if (!mobile) routeMargin = 256;

       this.setState({windowWidth: width, windowHeight: height, mobile: mobile, LeftDrawerOpen : !mobile, routeMargin: routeMargin});
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
              <NavBar mobile = {this.state.mobile}
                      onToggleLeftButton ={ () => {this.setState({LeftDrawerOpen: !this.state.LeftDrawerOpen})}}
                      open = {this.state.LeftDrawerOpen}
                />
            <div>
              <LeftDrawer mobile = {this.state.mobile}
                          open = {this.state.LeftDrawerOpen}
                          onSelectCategory = {() => {this.setState({LeftDrawerOpen : false})} }
              />
            </div>
            <div>
                <div style={{"marginLeft" : this.state.routeMargin}}>
                  <Route path="/people" component={() => <ListPeople mobile = {this.state.mobile}/>} />
                  <Route path="/movies" component={ListMovies} />
                  <Route path="/species" component={ListSpecies} />
                  <Route path="/vehicles" component={ListVehicles} />
                  <Route path="/planets" component={ListPlanets} />
                </div>
            </div>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }

}

export default App;
