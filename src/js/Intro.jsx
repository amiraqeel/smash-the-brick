import React from 'react';
import '../css/Intro.css';
import Play from './Play';
import Instruction from './Instruction';

class Intro extends React.Component {
  constructor(props) {
    super(props);
    this.state = { display: props.display };
  }
  change = (val) => {
    this.setState({ display: val }, () => { console.log("display"); });
  }
  render() {
    if ("play" === this.state.display) {
      return <Play />;
    }
    else if ("instructions" === this.state.display) {
      return <Instruction />;
    }
    return <div id="main" className="container mx-auto text-center shadow shadow-lg p-5">
      <div className="d-flex flex-column">
        <div id="heading" className="display-4">Smash the Brick !</div>
        <button id="btn" className="btn text-monospace mx-auto mt-5 btn-outline-warning bg-light text-danger" onClick={() => this.change('play')}>PLAY</button>
        <button id="btn" className="btn text-monospace btn-outline-warning bg-light text-danger mx-auto mt-5" onClick={() => this.change('instructions')}>INSTRUCTIONS</button>
      </div>
    </div>;
  }
}

export default Intro;
