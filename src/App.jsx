import { Bodies, Engine, Render, Runner, World } from 'matter-js';
// import { useState } from 'react'
import './App.css'

function App() {
  const engine = Engine.create();
  const render = Render.create({
    engine,
    element: document.body,
    options: {
      wireframes: false,
      background: "#F7F4C8",
      width: 420,
      height: 850,
    }
  });

  const world = engine.world;
  const leftWall = Bodies.rectangle(15, 395, 30, 790, {
    isStatic: true,
    render: { fillStyle: "#E6B143"}
  });

  World.add(world, [leftWall])

  // return (
    // <>
    Render.run(render)
    Runner.run(engine)
    // </>
  // )
}

export default App
