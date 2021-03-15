import React, { useState } from 'react'
import Sketch from 'react-p5'
import { useDispatch, useSelector } from 'react-redux'
import { selectPlanets, editPlanet, addPlanet } from './redux/planetsSlice'

// https://www.youtube.com/watch?v=pgFnZyL8zEA
// strukurera om min store så att planeterna är objekt.

function SketchApp (props) {

  const planets = useSelector(selectPlanets)
  const dispatch = useDispatch()
  const [mouseVel, setMouseVel] = useState({x: 0, y: 0})
  const [pressTime, setPressTime] = useState()
  const G = 10

  function getPlanet (name) {
    return planets.find(planet => planet.name === name)
  }

  function setup(p5, canvasParentRef) {
    p5.createCanvas(1000,900).parent(canvasParentRef)
    p5.noStroke()
    p5.background(18, 25, 38)
    p5.fill(119, 126, 140)
    dispatch(editPlanet({name: 'Earth', x: p5.width/2, y: p5.height/2}))

    const theta = p5.random(p5.TWO_PI)
    const moonPos = p5.createVector(250*p5.cos(theta), 250*p5.sin(theta))
    dispatch(addPlanet({name: 'moon', x: moonPos.x + p5.width/2, y: moonPos.y + p5.height/2, size: getPlanet('Earth').size/3.66, vel: {x: 1, y: 1} }))
  }

  function mouseReleased (p5) {
    if (props.canPlacePlanet && p5.mouseX > 0) {
      const deltaTime = (pressTime - Date.now())
      const xVel = 4 * (mouseVel.x - p5.mouseX) / deltaTime
      const yVel = 4 * (mouseVel.y - p5.mouseY) / deltaTime
      dispatch(addPlanet({name: props.planetName, x: p5.mouseX, y: p5.mouseY, size: props.wantedSize, vel: {x: xVel, y: yVel}}))
    }
  }

  function mousePressed (p5) {
    setMouseVel({x: p5.mouseX, y: p5.mouseY})
    setPressTime(Date.now())
  }

  function planetPlacement (p5) {
    for (const planet of planets) {
      p5.textAlign(p5.CENTER)
      p5.text(planet.name, planet.x, planet.y + (planet.size / 2) + 20)
      p5.ellipse(planet.x, planet.y, planet.size)
    }
  }

  function planetUpdate (p5) {
    for (const planet of planets) {
      if (planet.vel) {

        const earthDistX = (getPlanet('Earth').x - planet.x)
        const earthDistY = (getPlanet('Earth').y - planet.y)
        const earthDist = p5.dist(getPlanet('Earth').x, getPlanet('Earth').y, planet.x, planet.y )

        const F = (G * getPlanet('Earth').size * planet.size) / (earthDist* earthDist)

        let earthForceVector = p5.createVector(earthDistX, earthDistY)
        earthForceVector.normalize()
        earthForceVector.mult( F / planet.size )
        let velVector = earthForceVector.copy()
        velVector.rotate(p5.HALF_PI)
        velVector.normalize()
        velVector.mult( Math.sqrt(2) * Math.sqrt( (G * getPlanet('Earth').size) / earthDist ) )

        dispatch(editPlanet({name: planet.name, x: (planet.x + earthForceVector.x + velVector.x), y: (planet.y + earthForceVector.y + velVector.y) }))
      }
    }
  }

  function draw (p5) {
    p5.background(18, 25, 38)
    planetPlacement(p5)
    planetUpdate(p5)
    p5.ellipse(p5.mouseX, p5.mouseY, props.wantedSize)
  }

  return <Sketch setup={setup} draw={draw} mouseReleased={mouseReleased} mousePressed={mousePressed} />
}

export default SketchApp