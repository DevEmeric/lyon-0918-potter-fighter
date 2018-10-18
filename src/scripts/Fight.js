import React, { Component } from 'react';
import Fighter from './Fighter';
import Spell from './Spell';
import Header from './Header';
import Instructions from './Instructions'
import './Fight.css';
import VictoryMessage from "./VictoryMessage"
import Wall from "./wallFight.js"
//import ReactDOM from 'react-dom';

import gryffindorShield from '../image/Gryffindor.png'
import slytherinShield from '../image/Slytherin.png'
import ravenclawShield from '../image/Ravenclaw.png'
import hufflepuffShield from '../image/Hufflepuff.png'




class Fight extends Component {

    constructor() {
        super();

        this.houseStyles = {
            Gryffindor: {
                shield: gryffindorShield,
                barColor: "red",
            },
            Slytherin: {
                shield: slytherinShield,
                barColor: "green",
            },
            Ravenclaw: {
                shield: ravenclawShield,
                barColor: "blue",
            },
            Hufflepuff: {
                shield: hufflepuffShield,
                barColor: "yellow",
            },
        },


            this.state = {

                //Instructions Screen
                displayInstr: false,
                keyInstr: 66,
                turn: 1,


                //Avatar 1
                progress: 100,
                leftavatar: 5,
                topavatar: 5,
                heightavatar: 130,
                widthavatar: 130,
                borderradius: 50,



                //Avatar 2
                progress1: 100,

                righttavatar1: 5,
                topavatar1: 5,
                heightavatar1: 130,
                widthavatar1: 130,
                borderradius1: 50,

                //turn:this.props.turn,

                fighter1: {
                    id: "fighter1",
                    spellCasted: false,
                    rotation: 0,
                    facesRight: true,
                    top: 250,
                    left: 100,
                    life: 100,
                    width: 250,
                    height: 200,
                    attack: 87,      // Attaque: w
                    defense: 81,    // Défense: q
                    rotate: 65,     // Rotate: a
                    moveUp: 69,         // Up: e
                    moveDown: 68,      // Down: d
                    moveLeft: 83,        // Left: s
                    moveRight: 70,       // Right: f
                    house: "Slytherin",
                    //house: this.props.fightersHouse[0],
                    //house:this.getCurrentFighters()[0],
                    castSpell: this.castSpell,
                    move: this.move,
                    rotateFighter: this.rotate
                },
                fighter2: {
                    id: "fighter2",
                    spellCasted: false,
                    rotation: 180,
                    facesRight: false,
                    top: 250,
                    left: 1100,
                    life: 100,
                    width: 250,
                    height: 200,
                    attack: 161,                 // Attaque: ! 
                    defense: 77,               // Défense: m
                    rotate: 80,                // Rotate: p
                    moveUp: 38,                 // Up: Flèche du haut
                    moveDown: 40,               // Down: Flèche du bas
                    moveLeft: 37,               // Left: Flèche de gauche
                    moveRight: 39,              // Right: Flèche de droite
                    house: "Gryffindor",
                    allCharacteristics: this.fighterAndSpellCallback,
                    castSpell: this.castSpell,
                    move: this.move,
                    rotateFighter: this.rotate
                },
                spellfighter1: {
                    left: 0,
                    top: 0,
                    height: 20,
                    width: 20,
                    direction: 10,
                    id: "",
                },
                spellfighter2: {
                    left: 0,
                    top: 0,
                    height: 20,
                    width: 20,
                    direction: -1,
                    id: "",
                },
                modalVictory: false,

            }
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    progressBar = (progress) => {
        return <div className="progressbar">
            <div className="progress" style={{
                width: `${progress}%`,
                backgroundColor: this.houseStyles[this.state.fighter1.house].barColor
            }}>
            </div>
        </div>
    }

    progressBar1 = (progress1) => {
        return <div className="progressbar1">
            <div className="progress1" style={{
                width: `${progress1}%`,
                backgroundColor: this.houseStyles[this.state.fighter2.house].barColor
            }}>
            </div>
        </div>
    }


    castSpell = (fighterID, facesRight) => {
        console.log("shoot");
        let spellID = "spell" + fighterID
        let x = facesRight ? 260 : -30;
        // Apparition du spell
        this.setState({
            [fighterID]: {
                ...this.state[fighterID],
                spellCasted: true,
            }
        })
        /*window.setTimeout = () => {
            this.setState({
                [fighterID]: {
                    ...this.state[fighterID],
                    spellCasted: false,
                }
            }, 2000)
        }*/
        this.setState({
            [spellID]: {
                ...this.state[spellID],
                left: this.state[fighterID].left + x,
                top: this.state[fighterID].top + 80,
                direction: x / Math.abs(x)
            }
        })
        // Spell movement
        let spellIntervall = setInterval(() => {
            console.log("mon set interval de ouf")
            this.setState({
                [spellID]: {
                    ...this.state[spellID],
                    left: this.state[spellID].left + 10 * this.state[spellID].direction,
                }
            })
        }, 10)
        // Destruction of spell
        setTimeout(
            function () {
                clearInterval(spellIntervall);
                this.setState({
                    [fighterID]: {
                        ...this.state[fighterID],
                        spellCasted: false,
                    }
                });
            }
                .bind(this),
            3000
        );
    }

    move = (fighterID, x, y) => {
        this.setState({
            [fighterID]: {
                ...this.state[fighterID],
                top: this.state[fighterID].top + x,
                left: this.state[fighterID].left + y,
            }
        })
    }

    rotate = (fighterID) => {
        console.log("rotate")
        this.setState({
            [fighterID]: {
                ...this.state[fighterID],
                rotation: this.state[fighterID].rotation - 180,
                facesRight: !this.state[fighterID].facesRight,
            }
        })
    }

    hasCollision(object1, object2) {
        if (object1.top < object2.top + object2.width &&
            object1.top + object1.width > object2.top &&
            object1.left < object2.left + object2.height &&
            object1.height + object1.left > object2.left) {
            return true
        }
        else {
            return false
        };
    };


    //Instructions Screen>>>>>>>>>>>>>>>>>>
    handleKeyPress(event) {
        if (event.key === " ") {
            this.Instr()
        }
    }
    Instr = () => {
        this.setState({ displayInstr: !this.state.displayInstr })
    }


    // Fighters selection depending on turn and number of players
    getCurrentFighters = (turn) => {
        console.log("turn : "+turn);
        let i = 0;
        let j = 1;
        switch (this.props.fightersHouse.length) {
            case 3:
                switch (turn) {
                    case 1: { i = 0; j = 1 }; break;
                    case 2: { i = 1; j = 2 }; break;
                    case 3: { i = 0; j = 2 }; break;
                };
                break;
            case 4:
                switch (turn) {
                    case 1: { i = 0; j = 1 }; break;
                    case 2: { i = 2; j = 3 }; break;
                    case 3: { i = 0; j = 2 }; break;
                    case 4: { i = 1; j = 3 }; break;
                    case 5: { i = 0; j = 3 }; break;
                    case 6: { i = 1; j = 2 }; break;
                };
                break;
            default: { i = 0; j = 1 }; break;
        }
        console.log("Fighters selected : ")
        console.log([this.props.fightersHouse[i], this.props.fightersHouse[j]])

        this.setState({
            fighter1: {
                ...this.state.fighter1,
                life: 100,
                house: this.props.fightersHouse[i],
                style: {
                    opacity: 1,
                },
            },
            fighter2: {
                ...this.state.fighter2,
                life: 100,
                house: this.props.fightersHouse[j],
                style: {
                    opacity: 1,
                },
            },
            spellfighter1: {
                ...this.state.spellfighter1,
                id: "spell" + this.props.fightersHouse[i],
            },
            spellfighter2: {
                ...this.state.spellfighter2,
                id: "spell" + this.props.fightersHouse[j],
            },
            progress: 100,
            progress1: 100,
            modalVictory: false,
            turn: turn,
        })

        console.log(this.state.fighter1)
    }


    componentDidMount = () => {
        this.getCurrentFighters(1);
        setInterval(() => {
            const currentState = this.state.progress;
            const currentState1 = this.state.progress1;
            if (this.hasCollision(this.state.spellfighter1, this.state.fighter2)) {
                //window.alert("COLLISIOOOOOOOOOOOOOOOOOOOOOON")
                this.setState({
                    progress1: currentState1 - 50,
                    fighter1: {
                        ...this.state.fighter1,
                        spellCasted: false,
                    },
                    spellfighter1: {
                        ...this.state.spellfighter1,
                        top: 0,
                        left: 0,
                    }
                })
                if (this.state.progress1 === 0 || this.state.progress === 0) {
                    //alert("un joueur est mort") 
                    console.log(this.state.modalVictory)
                    this.setState({
                        modalVictory: !this.state.modalVictory
                    })


                }
            }
            if (this.hasCollision(this.state.spellfighter2, this.state.fighter1)) {
                //window.alert("COLLISIOOOOOOOOOOOOOOOOOOOOOON")
                this.setState({
                    progress: currentState - 50,

                    fighter2: {
                        ...this.state.fighter2,
                        spellCasted: false,
                    },
                    spellfighter2: {
                        ...this.state.spellfighter2,
                        top: 0,
                        left: 0,
                    }
                })
                if (this.state.progress1 === 0 || this.state.progress === 0) {
                    //alert("un joueur est mort") 
                    console.log(this.state.modalVictory)
                    this.setState({
                        modalVictory: !this.state.modalVictory
                    })


                }
            }

        }, 10)
        document.addEventListener("keydown", this.handleKeyPress)
    }

    restartFight = () => {
        console.log("restart fight before setState")
        this.setState({
            fighter1: {
                ...this.state.fighter1,
                life: 100,
                spellCasted: false,
                style: {
                    opacity: 1
                },
                top: 250,
                left: 100,
                facesRight: true,
                rotation: 0,
            },
            fighter2: {
                ...this.state.fighter2,
                life: 100,
                spellCasted: false,
                style: {
                    opacity: 1
                },
                top: 250,
                left: 1100,
                facesRight: false,
                rotation: 180,
            },
            progress:100,
            progress1:100,
            modalVictory: false,
            
        })
        console.log("restart fight after setState")
        console.log(this.state.fighter1)
        console.log(this.state.fighter2)
    }

    nextFight = (turn) => {
        this.getCurrentFighters(turn);
        /*this.setState({
            modalVictory: false,
            progress:100,
            progress1:100,
        })*/
    }



    render() {
 
        console.log(this.state.progress1)
        /*  console.log("Fighter 1 : ")
          console.log(this.state.fighter1)
          console.log("Spell Fighter 1 : ")
          console.log(this.state.spellfighter1)
          console.log("Fighter 2 : ")
          console.log(this.state.fighter2)

          console.log("Fighter 1 : ")
          console.log(this.state.fighter1)
          console.log("Fighter 2 : ")
          console.log(this.state.fighter2)
        /*  console.log("Fighter 2 : ")
          console.log(this.state.fighter2)
          console.log("Spell Fighter 2 : ")
          console.log(this.state.spellfighter2)
  
          */

          console.log("Progress : "+this.state.progress)
          console.log("Progress1 : "+this.state.progress1)


        let avatarStyle = {
            position: "absolute",
            top: this.state.topavatar + "px",
            left: this.state.leftavatar + "px",
            width: this.state.widthavatar + "px",
            height: this.state.heightavatar + "px",
            //borderRadius: this.state.borderradius + "%",
            backgroundImage: `url(${this.houseStyles[this.state.fighter1.house].shield})`,
            backgroundPosition: "right",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
        }

        let avatarId = "avatar" + this.props.house

        let avatarStyle1 = {
            position: "absolute",
            top: this.state.topavatar1 + "px",
            right: this.state.righttavatar1 + "px",
            width: this.state.widthavatar1 + "px",
            height: this.state.heightavatar1 + "px",
            // borderRadius: this.state.borderradius1 + "%",
            backgroundImage: `url(${this.houseStyles[this.state.fighter2.house].shield})`,
            backgroundPosition: "left",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
        }
        let avatarId1 = "avatar" + this.props.house

        let instrStyle = {
            position: "relative",
            top: -20 + "px",
            width: 150 + "px",
            margin: "auto",
            border: 5 + "px" + " " + "solid" + " " + "black",
            lineHeight: 2 + "px",
            opacity: 0.5
        }

        return (
            <div>
                <div>
                    <Wall />
                </div>
            <div id="bodyFight">
                <div className="full">
                    <Header
                    />
                    <div className="avatar" id={avatarId} style={avatarStyle}></div>
                    {this.progressBar(this.state.progress)}

                    <div className="avatar1" id={avatarId1} style={avatarStyle1}></div>
                    {this.progressBar1(this.state.progress1)}
                </div>
                <div>
                    <Fighter                // Player#1
                        fighter={this.state.fighter1}
                    />
                </div>
                <div>
                    <Fighter                // Player#2
                        fighter={this.state.fighter2}
                    />
                </div>
                <div>{
                    this.state.fighter1.spellCasted ?
                        <Spell
                            spell={this.state.spellfighter1}
                        />
                        :
                        <div></div>
                }</div>
                <div>{
                    this.state.fighter2.spellCasted ?
                        <Spell
                            spell={this.state.spellfighter2}
                        />
                        :
                        <div></div>
                }</div>

                <div><div className="spaceInstr" style={instrStyle}><p>INSTRUCTIONS</p><p>Press SPACEBAR</p></div>{
                    this.state.displayInstr ?
                        <Instructions />
                        :
                        <div></div>
                }
                </div>

                <div>{
                    this.state.modalVictory ?
                        <VictoryMessage
                            getCurrentFighters={this.getCurrentFighters}
                            turn={this.state.turn}
                            getCurrentFighter={this.getCurrentFighters}
                            turn={this.state.turn}
                            nextFight={this.nextFight}
                            restartFight={this.restartFight}
                        />
                        :
                        <div></div>
                }</div>

            </div>
            </div>
        );
    }
}

export default Fight;
