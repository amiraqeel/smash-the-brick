import React from 'react';
import '../css/Intro.css';
import Play from './Play';

class Instruction extends React.Component {
    constructor(props) {
        super(props);
        this.state = { display: "instructions" };
    }
    change = (val) => {
        this.setState({ display: val }, () => { console.log("display"); });
    }
    render() {
        if ("play" === this.state.display) {
            return <Play />;
        }
        return <div id="main" className="container mx-auto text-center shadow shadow-lg p-5">
            <div className="d-flex flex-column">
                <div id="heading" className="display-4">Instruction</div>
                <ul className="list-group list-group-flush border border-dark rounded-lg text-primary mt-3">
                    <li className="list-group-item">Smash the bricks to score points.</li>
                    <li className="list-group-item"><img className="border border-dark rounded-sm"
                        src="/bricks.jpg" width="30" height="40" alt="brick"></img>&nbsp;&nbsp;= 1 Point</li>
                    <li className="list-group-item">Avoid tapping the <span class="bg-success text-success border border-dark rounded-sm">green</span> area.</li>
                    <li className="list-group-item">Difficulty increases at each level.</li>
                </ul>
                <button id="btn" className="btn text-monospace mx-auto mt-3 btn-outline-warning bg-light text-danger" onClick={() => { this.change('play') }}>PLAY</button>
            </div>
        </div>;
    }
}

export default Instruction;