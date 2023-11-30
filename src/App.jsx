import { Bodies, Engine, Render, Runner, World } from 'matter-js';
import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const engine = Engine.create();
  useEffect(() => {

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
    const rightWall = Bodies.rectangle(605, 395, 30, 790, {
      isStatic: true,
      render: { fillStyle: "#E6B143"}
    });
    const ground = Bodies.rectangle(310, 820, 620, 60, {
      isStatic: true,
      render: { fillStyle: "#E6B143"}
    });
    const topLine = Bodies.rectangle(310, 150, 620, 2, {
      isStatic: true,
      render: { fillStyle: "#E6B143"}
    });

    World.add(world, [leftWall, rightWall, ground, topLine])

    // return (
      // <>
      Render.run(render)
      Runner.run(engine)
      // </>
    // )
    // return (
    //   world
    // )
  })
}

export default App
