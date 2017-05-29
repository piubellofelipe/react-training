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
            <div style={{position : 'fixed', width:'100%', marginTop: 0}}>
              <NavBar mobile = {this.state.mobile}
                      onToggleLeftButton ={ () => {this.setState({LeftDrawerOpen: !this.state.LeftDrawerOpen})}}
                      open = {this.state.LeftDrawerOpen}
                />
            </div>
            <div>
              <LeftDrawer mobile = {this.state.mobile}
                          open = {this.state.LeftDrawerOpen}
                          onSelectCategory = {() => {this.setState({LeftDrawerOpen : false})} }
              />
            </div>
            <div>
                <div style={{"marginLeft" : this.state.routeMargin, 'paddingTop' : 64}}>
                  <Route exact path="/people/" component={ListPeople}/>
                  <Route exact path="/movies/" component={ListMovies} />
                  <Route exact path="/species/" component={ListSpecies} />
                  <Route exact path="/vehicles/" component={ListVehicles} />
                  <Route exact path="/planets/" component={ListPlanets} />
                  <Route path="/people/:id" component={personDetail}/>
                  <Route path="/species/:id" component={specieDetail}/>
                  <Route path="/movies/:id" component={movieDetail}/>
                  <Route path="/vehicles/:id" component={vehicleDetail}/>
                  <Route path="/planets/:id" component={planetDetail}/>
                </div>
            </div>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }

}

export default App;
