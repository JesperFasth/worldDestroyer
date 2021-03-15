import { configureStore } from '@reduxjs/toolkit'
import planetReducer from './planetsSlice'

const store = configureStore({
  reducer: {
    planets: planetReducer
  }
})

export default store