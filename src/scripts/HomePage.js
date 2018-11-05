import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./HomePage.css";
import Settings from './Settings.js'

class HomePage extends Component { 
    constructor(props) {
        super(props)
        this.state = {
            popupButtons: false,
            showSettings: false
        }
        this.displayPopups = this.displayPopups.bind(this)
    }

    displayPopups = () => {
        this.setState({
            popupButtons: !this.state.popupButtons
        })
    }

    gameTypeChoice = (choice) => {
        this.props.gameType(choice)
       // this.setState ({gameType: choice})
    }

    setVolume(target, bool){
        this.props.setVolume(target, bool)
    }

    render() {
        return (

            <div className="container1">

                <h1 className="title1">Potter Fight</h1>

                    
                <button onClick={() => this.displayPopups()} className="newGame">NEW GAME</button>

                {
                     this.state.popupButtons ? 
                    <div className="hidden">
                    <Link to="/HouseSelection"><button onClick={()=> this.gameTypeChoice("1v1")}>1 VS 1</button></Link>
                    <Link to="/HouseSelection"><button onClick={()=> this.gameTypeChoice("tournament")}>TOURNAMENT</button></Link>
                    </div> 
                    : 
                    <div></div>
                }

                <button className="settings">SETTINGS</button>
                <Settings 
                    isMusicOn={this.setVolume}
                    isSoundOn={this.setVolume}/>
                />
            </div>
        )
    }
}

export default HomePage