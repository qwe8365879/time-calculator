import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { TimeButton } from './components/TimeButton';
import { Input } from './components/Input';
import { ClearButton } from './components/ClearButton';
import * as math from 'mathjs';
import * as moment from 'moment';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: ""
        }
    }

    addToInput = val => {
        this.setState({
            input: this.state.input + val
        });
    };

    handleEquals = () => {
        var input = this.state.input;
        if(input.match(/\d?\d:\d\d(\sAM\s)?\sTO\s\d?\d:\d\d(\sPM\s)?/)){
            var times = this.state.input.split(" TO ");
            var start = times[0].trim();
            var end = times[1].trim();
            if(start.match(/[AaPp][Mm]/)){
                start = moment(start, 'hh:mm a');
            }else{
                start = moment(start, 'hh:mm')
            }
            if(end.match(/[AaPp][Mm]/)){
                end = moment(end, 'hh:mm a');
            }else{
                end = moment(end, 'hh:mm')
            }
            var hours = moment.duration(end.diff(start)).asHours();
            this.setState({
                input: hours
            });
            console.dir(start.format('YYYY-MM-DD HH:mm'));
            console.dir(end.format('YYYY-MM-DD HH:mm'));
        }else{
            this.setState({
                input: "Wrong Input"
            });
        }
    };

  render() {
    return (
      <div className="App">
          <div className="calculator-wrapper">
              <Input input={this.state.input}></Input>
              <div className="row">
                  <TimeButton handleClick={this.addToInput}>7</TimeButton>
                  <TimeButton handleClick={this.addToInput}>8</TimeButton>
                  <TimeButton handleClick={this.addToInput}>9</TimeButton>
                  <TimeButton handleClick={this.addToInput}> AM </TimeButton>
              </div>
              <div className="row">
                  <TimeButton handleClick={this.addToInput}>4</TimeButton>
                  <TimeButton handleClick={this.addToInput}>5</TimeButton>
                  <TimeButton handleClick={this.addToInput}>6</TimeButton>
                  <TimeButton handleClick={this.addToInput}> PM </TimeButton>
              </div>
              <div className="row">
                  <TimeButton handleClick={this.addToInput}>1</TimeButton>
                  <TimeButton handleClick={this.addToInput}>2</TimeButton>
                  <TimeButton handleClick={this.addToInput}>3</TimeButton>
                  <TimeButton handleClick={this.addToInput}> TO </TimeButton>
              </div>
              <div className="row">
                  <TimeButton handleClick={this.addToInput}>:</TimeButton>
                  <TimeButton handleClick={this.addToInput}>0</TimeButton>
                  <TimeButton handleClick={() => this.handleEquals()}>=</TimeButton>
                  <ClearButton handleClear={() => this.setState({input: ""})}>C</ClearButton>
              </div>
          </div>
      </div>
    );
  }
}

export default App;
