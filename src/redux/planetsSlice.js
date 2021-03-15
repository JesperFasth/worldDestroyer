import { createSlice } from "@reduxjs/toolkit";

const earth = {
  name: 'Earth',
  size: 100,
  x: 200,
  y: 200,
}

const planetsSlice = createSlice({
  name: 'planets',
  initialState: [earth],
  reducers: {
    addPlanet: (state, action) => {

      const nameList = state.map(planet => planet.name)
      var name = action.payload.name || 'planet'

      while( nameList.includes(name) ){
        if ( !isNaN(parseInt(name.slice(-1))) ) {
          const tmpInt = parseInt(name.slice(-1)) + 1
          name = name.slice(0, -1) + tmpInt
        } else {
          name = name + 1
        }
      }

      const planetX = {
        name: name,
        size: action.payload.size || 10,
        x: action.payload.x || 0,
        y: action.payload.y || 0,
        vel: action.payload.vel
      }
      state.push(planetX)
    },
    editPlanet: (state, action) => {
      if(action.payload.name){
        if (action.payload.size) {
          state[state.findIndex(planet => planet.name === action.payload.name)].size = action.payload.size
        }
        if (action.payload.x || action.payload.x === 0) {
          state[state.findIndex(planet => planet.name === action.payload.name)].x = action.payload.x
        }
        if (action.payload.y || action.payload.y === 0) {
          state[state.findIndex(planet => planet.name === action.payload.name)].y = action.payload.y
        }
        if (action.payload.vel) {
          state[state.findIndex(planet => planet.name === action.payload.name)].vel = action.payload.vel
        }
      }
    }
  }
})

export const { addPlanet, editPlanet } = planetsSlice.actions

export const selectPlanets = state => state.planets

export default planetsSlice.reducer