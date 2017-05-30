import React, { Component } from 'react';
import NavBar from './components/appBar';
import LeftDrawer from './components/drawer'
import ListPeople from './components/listPeople'
import ListMovies from './components/listMovies'
import ListVehicles from './components/listVehicles'
import ListSpecies from './components/listSpecies'
import ListPlanets from './components/listPlanets'
import personDetail from './components/peopleDetails'
import vehicleDetail from './components/vehicleDetails'
import specieDetail from './components/specieDetails'
import planetDetail from './components/planetDetails'
import movieDetail from './components/movieDetails'
import search from './components/search.js'

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
      searchTerm : ""
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
            <div style={{position : 'fixed', width:'100%', marginTop: 0, zIndex : 10000}}>
              <NavBar mobile = {this.state.mobile}
                      onToggleLeftButton ={ () => {this.setState({LeftDrawerOpen: !this.state.LeftDrawerOpen})}}
                      open = {this.state.LeftDrawerOpen}
                      applySearch={(term) => this.setState({searchTerm : term})}
                />
            </div>
            <div>
              <LeftDrawer mobile = {this.state.mobile}
                          open = {this.state.LeftDrawerOpen}
                          onSelectCategory = {() => {this.setState({LeftDrawerOpen : false})} }
              />
            </div>
            <div>
                <div style={{"marginLeft" : this.state.routeMargin, 'paddingTop' : "64", 'position' : 'relative'}}>
                  <Route exact path="/people/" render={(props) => (<ListPeople {...props} mobile = {this.state.mobile}/>)}/>
                  <Route exact path="/movies/" render={(props) => (<ListMovies/>)} />
                  <Route exact path="/species/" render={(props) => (<ListSpecies/>)} />
                  <Route exact path="/vehicles/" render={(props) => (<ListVehicles/>)} />
                  <Route exact path="/planets/" render={(props) => (<ListPlanets/>)} />
                  <Route path="/people/:id" component={personDetail}/>
                  <Route path="/species/:id" component={specieDetail}/>
                  <Route path="/movies/:id" component={movieDetail}/>
                  <Route path="/vehicles/:id" component={vehicleDetail}/>
                  <Route path="/planets/:id" component={planetDetail}/>
                  <Route path="/search/:category/:term" component={search} />
                </div>
            </div>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }

}

export default App;
