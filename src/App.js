import React, { Component } from 'react';
import './App.css';
import Fight from './scripts/Fight';
import HouseSelection from './scripts/HouseSelection';
//import Char from'./scripts/Char';
import { Route, Switch, BrowserRouter } from 'react-router-dom';


class App extends Component { 
  constructor() {
    super();
    this.state = {
      playersHouse: [],
    }
  }

  /*
  <Route exact path="/" component={Home} />
  <Route path="/settings" component={Settings} />
  <Route path="/instructions" component={Instructions} />
  <Route path="/house" component={HouseSelection} />
  <Route path="/arena" component={ArenaSelection} />
  <Route path="/victory" component={Victory} />
  */



  finalSelection = (players) => {
    this.setState({ fightersHouse: players})
  }
 
  render() {
    console.log("PlayerHouse", this.state.fightersHouse)
    //console.log(this.state.playersHouse)
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              exact path="/"
              render={() => (
                <HouseSelection
                finalSelection={this.finalSelection}
                />)}
            />
            <Route
              path="/fight"
              render={() => (
                <Fight
                  fightersHouse={this.state.fightersHouse}
                />)}
            />
          
          </Switch>
        </BrowserRouter>
        
      </div>
    );
  }
}

export default App;