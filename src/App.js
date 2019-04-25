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

    calculateHours = input => {
        let timeTester = /(\d?\d:\d\d(\s[AaPp][Mm]\s)?\sTO\s\d?\d:\d\d(\s[AaPp][Mm]\s)?)/g;
        var result = input.split(timeTester);
        console.dir(result);
        result.map(function(v, k){
            if(typeof v =="string" && v.match(timeTester)){
                var times = v.split(" TO ");
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
                result[k] = hours;
            }else if(typeof v =="string" && v.match(/[AaPp][Mm]/)){
                result[k] = "";
            }
        });
        result = result.join("");
        console.dir(result);
        return result;
    };

    handleEquals = () => {
        var input = this.state.input;
        var result = this.calculateHours(input);
        this.setState({
            input: math.eval(result)
        });
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
                  <TimeButton type="time-symbol" handleClick={this.addToInput}> AM </TimeButton>
                  <TimeButton type="operator" handleClick={this.addToInput}>+</TimeButton>
                  <TimeButton type="operator" handleClick={this.addToInput}>/</TimeButton>
              </div>
              <div className="row">
                  <TimeButton handleClick={this.addToInput}>4</TimeButton>
                  <TimeButton handleClick={this.addToInput}>5</TimeButton>
                  <TimeButton handleClick={this.addToInput}>6</TimeButton>
                  <TimeButton type="time-symbol" handleClick={this.addToInput}> PM </TimeButton>
                  <TimeButton type="operator" handleClick={this.addToInput}>-</TimeButton>
                  <TimeButton type="operator" handleClick={this.addToInput}>(</TimeButton>
              </div>
              <div className="row">
                  <TimeButton handleClick={this.addToInput}>1</TimeButton>
                  <TimeButton handleClick={this.addToInput}>2</TimeButton>
                  <TimeButton handleClick={this.addToInput}>3</TimeButton>
                  <TimeButton type="time-symbol" handleClick={this.addToInput}> TO </TimeButton>
                  <TimeButton type="operator" handleClick={this.addToInput}>*</TimeButton>
                  <TimeButton type="operator" handleClick={this.addToInput}>)</TimeButton>
              </div>
              <div className="row">
                  <TimeButton type="time-symbol" handleClick={this.addToInput}>:</TimeButton>
                  <TimeButton handleClick={this.addToInput}>0</TimeButton>
                  <TimeButton handleClick={this.addToInput}>00</TimeButton>
                  <TimeButton handleClick={() => this.handleEquals()}>=</TimeButton>
                  <ClearButton handleClear={() => this.setState({input: ""})}>C</ClearButton>
                  <ClearButton handleClear={() => this.setState({input: this.state.input.slice(0,-1)})}>{`<--`}</ClearButton>
              </div>
          </div>
      </div>
    );
  }
}

export default App;
