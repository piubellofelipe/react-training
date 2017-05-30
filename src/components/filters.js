import React, {Component} from 'react';
import Slider from 'material-ui/Slider';
import {Tabs, Tab} from 'material-ui/Tabs'

class Filter extends Component{
  constructor(props){
    super(props);
    this.state={
      maxW : 100,
      minW : 0,
      maxA : 100,
      minA : 0
    }
  }

  maxWChange = (event, value) => {
    this.setState({maxW : 100 - value});
    this.props.updateFilter(this.state);
  }
  minWChange = (event, value) => {
    this.setState({minW : value});
    this.props.updateFilter(this.state);
  }
  maxAChange = (event, value) => {
    this.setState({maxA : 100 - value});
    this.props.updateFilter(this.state);
  }
  minAChange = (event, value) => {
    this.setState({minA : value});
    this.props.updateFilter(this.state);
  }

  render(){
    return(
      <div>
        <Tabs style={{width:"100%"}}>
          <Tab label = "Weight">
            <div style={{marginLeft: "5%", width: "50%"}}>
              <Slider name = "minimum weight" style={{width:"80%"}} min={0} max={100} onChange={this.minWChange}/>
              <Slider name = "maximum weight" style={{width:"80%"}} min={0} max={100} onChange={this.maxWChange} axis="x-reverse"/>
              <div> {this.state.minW} &lt; Weight &lt; {this.state.maxW}</div>
            </div>
          </Tab>
          <Tab label = "Age">
            <div style={{marginLeft: "55%"}}>
              <Slider name = "minimum age" style={{width:"80%"}} min={0} max={100} onChange={this.minAChange}/>
              <Slider name = "maximum age" style={{width:"80%"}} min={0} max={100} onChange={this.maxAChange} axis="x-reverse"/>
              <div> {this.state.minA} &lt; Age &lt; {this.state.maxA}</div>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Filter
