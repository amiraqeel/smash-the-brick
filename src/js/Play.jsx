import React from 'react';
import '../css/Play.css';
import Intro from './Intro';
declare var $: any;

class Play extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            level: 1,
            display: "initial",
            animationSpeed: 2500,
            brickSpeed: 1000,
            height: 0,
            top: 0
        };
        this.brick = "";
    }
    componentDidMount() {
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $("#area").width("30%");
        }
        $("#area").css("height", window.innerHeight - 1);
        $("#rect0,#rect1,#rect2").css({ "visibility": "hidden", "height": window.innerHeight / 4 });
        $("#rect0,#rect1,#rect2").width($("#area").width() / 3);
        $("#rect0,#rect1,#rect2").css("top", 0 - 2 * $("#stats").height() - $("#rect0").height());
        this.setState({
            height: $("#area").height() - $("#rect0").height() - $("#stats").height() + 2,
            top: 0 - 2 * $("#stats").height() - $("#rect0").height()
        }, () => { console.log(this.state.top); });
        $('#myModal').modal({
            backdrop: 'static',
            keyboard: false,
            show: false
        });
        $("#area").on('click tap', (event) => {
            if (event.target.id === "area")
                this.end();
            else return;
        });
        $("#rect0,#rect1,#rect2").on('click tap', (event) => {
            this.hideBrick(event);
        });
        this.brick = setInterval(this.showBrick, this.state.brickSpeed);
    }
    showBrick = () => {
        let a = Math.floor(Math.random() * 3);
        $(`#rect${a}`).animate({ top: this.state.height }, this.state.animationSpeed, "linear", this.end);
        $(`#rect${a}`).css("visibility", "visible");
    }
    end = () => {
        clearInterval(this.brick);
        $("#rect0,#rect1,#rect2").off();
        $("#rect0,#rect1,#rect2").stop(true);
        $("#dscore").html(`SCORE : ${this.state.score}`);
        $("#dlevel").html(`LEVEL : ${this.state.level}`);
        setTimeout(() => { $('#myModal').modal('show'); }, 500);
    }
    hideBrick = (event) => {
        let id = event.currentTarget.id;
        $(`#${id}`).css("visibility", "hidden");
        $(`#${id}`).stop(true);
        $(`#${id}`).animate({ top: this.state.top }, 0.1);
        this.setState((state) => {
            return { score: ++state.score };
        }, () => {
            $("#score").html(`SCORE : ${this.state.score}`);
        });
        if (this.state.score % 10 === 0)
            this.level();
    }
    level = () => {
        this.setState((state) => {
            return {
                level: ++state.level,
                animationSpeed: state.animationSpeed - 100,
                brickSpeed: state.brickSpeed - 50
            };
        }, () => {
            $("#level").html(`LEVEL : ${this.state.level}`);
        });
        clearInterval(this.brick);
        this.brick = setInterval(this.showBrick, this.state.brickSpeed);
    }
    replay = (val) => {
        $('#myModal').modal('hide');
        this.setState({ display: val }, () => { console.log("display"); });
    }
    render() {
        if (this.state.display !== "initial") {
            return <Intro display={this.state.display} />;
        }
        return <div id="area" className="bg-success border border-dark rounded-lg mx-auto">
            <div className="d-flex flex-column">
                <div id="stats" className="d-flex flex-row bg-dark text-monospace text-light justify-content-around mt-n1">
                    <div id="score" className="flex-fill mr-5 ml-3">SCORE : 0</div>
                    <div id="level" className="flex-fill ml-4">LEVEL : 1</div>
                </div>
                <div className="d-flex flex-row">
                    <div id="rect0" className="ml-1"></div>
                    <div id="rect1" className="ml-1"></div>
                    <div id="rect2" className="ml-1 mr-1"></div>
                </div>
            </div>
            <div className="modal fade" id="myModal">
                <div className="modal-dialog modal-dialog-centered w-75 mx-auto">
                    <div className="modal-content">
                        <div className="d-flex flex-column text-center text-monospace mb-2">
                            <h1 className="mt-2">trop tôt !!</h1>
                            <div id="dscore"></div>
                            <div id="dlevel"></div>
                            <button className="btn btn-block btn-outline-success mx-auto w-75 mt-2" onClick={() => this.replay('play')}>PLAY AGAIN</button>
                            <button className="btn btn-block btn-outline-danger mx-auto w-75 mt-3" onClick={() => this.replay('intro')}>MAIN MENU</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default Play;