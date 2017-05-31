import React, {Component} from 'react';
import Slider from 'material-ui/Slider';
import {Tabs, Tab} from 'material-ui/Tabs'

class Filter extends Component{
  constructor(props){
    super(props);
    this.state={
      maxW : 200,
      minW : 0,
      maxH : 1000,
      minH : 0
    }
  }

  maxWChange = (event, value) => {
    this.setState({maxW : 200 - value});
    this.props.updateFilter(this.state);
  }
  minWChange = (event, value) => {
    this.setState({minW : value});
    this.props.updateFilter(this.state);
  }
  maxHChange = (event, value) => {
    this.setState({maxH : 1000 - value});
    this.props.updateFilter(this.state);
  }
  minHChange = (event, value) => {
    this.setState({minH : value});
    this.props.updateFilter(this.state);
  }

  render(){
    return(
      <div>
        <Tabs style={{width:"100%"}}>
          <Tab label = "Weight">
            <div style={{marginLeft: "5%", width: "50%"}}>
              <Slider name = "minimum weight" style={{width:"80%"}} min={0} max={200} onChange={this.minWChange}/>
              <Slider name = "maximum weight" style={{width:"80%"}} min={0} max={200} onChange={this.maxWChange} axis="x-reverse"/>
              <div> {this.state.minW} &lt; Weight &lt; {this.state.maxW}</div>
            </div>
          </Tab>
          <Tab label = "Height">
            <div style={{marginLeft: "55%"}}>
              <Slider name = "minimum Height" style={{width:"80%"}} min={0} max={1000} onChange={this.minHChange}/>
              <Slider name = "maximum Height" style={{width:"80%"}} min={0} max={1000} onChange={this.maxHChange} axis="x-reverse"/>
              <div> {this.state.minH} &lt; Height &lt; {this.state.maxH}</div>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Filter
