import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import './App.css';
import SketchApp from './sketch'
// import { addPlanet, editPlanet } from './redux/planetsSlice'
 
function App() {

  // const dispatch = useDispatch()

  const [planetName, setPlanetName] = useState('')
  // const [canPlacePlanet, setCanPlacePlanet] = useState(true)
  const [wantedSize, setWantedSize] = useState(20)
  
  return (
    <div className="App">
      <div id="container">
        <div id='right-element'>
          <SketchApp canPlacePlanet={true} planetName={planetName} wantedSize={wantedSize} />
        </div>
        <div id='left-element'>
          <div id="btn-panel">
            <div>
              Name:
              <input id='name-input' type="text" onChange={(e) => setPlanetName(e.target.value)}/>
            </div>
            {/*
            <div id="btn" onClick={() => dispatch(addPlanet({name: planetName, x: 300, y: 100, size: wantedSize})) }>
              Add Planet
            </div>
            <div id="btn" onClick={() => dispatch(editPlanet({name: planetName, y: 10})) }>
              move planet down
            </div>
            <div id="btn" onClick={() => setCanPlacePlanet(!canPlacePlanet) }>
              Placement = {String(canPlacePlanet)}
            </div>
            */}
            <div>
              Planet size:
              <input id='name-input' type="number" min='10' max='100' onChange={(e) => setWantedSize(e.target.value)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
