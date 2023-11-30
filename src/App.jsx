import { Bodies, Engine, Render, Runner, World } from "matter-js";
import { useState, useEffect, useRef } from "react";
import "./App.css";
import FRUITS from "./fruits";

function App() {
  const engine = Engine.create();
  const world = engine.world;
  // const canvasWidth = 730;
  // const canvasCenter = canvasWidth / 2;

  const render = Render.create({
    engine,
    element: document.body,
    options: {
      wireframes: false,
      background: "#F7F4C8",
      width: 600,
      height: 800,
      showAxes: false
    },
  });

  useEffect(() => {
    // const cw = document.body.clientWidth;
    // const ch = document.body.clientHeight;
    const leftWall = Bodies.rectangle(15, 395, 30, 790, {
      isStatic: true,
      render: { fillStyle: "#E6B143" },
    });
    const rightWall = Bodies.rectangle(585, 395, 30, 790, {
      isStatic: true,
      render: { fillStyle: "#E6B143" },
    });
    const ground = Bodies.rectangle(310, 770, 620, 60, {
      isStatic: true,
      render: { fillStyle: "#E6B143" },
    });
    const topLine = Bodies.rectangle(310, 150, 620, 2, {
      isStatic: true,
      render: { fillStyle: "#E6B143" },
    });

    // const leftWall = Bodies.rectangle(15, 395, 30, 790, {
    //   isStatic: true,
    //   render: { fillStyle: "#E6B143" },
    // });
    // const rightWall = Bodies.rectangle(650, 395, 30, 790, {
    //   isStatic: true,
    //   render: { fillStyle: "#E6B143" },
    // });
    // const ground = Bodies.rectangle(canvasCenter, 820, canvasWidth, 60, {
    //   isStatic: true,
    //   render: { fillStyle: "#E6B143" },
    // });
    // const topLine = Bodies.rectangle(canvasCenter, 150, canvasWidth, 2, {
    //   isStatic: true,
    //   render: { fillStyle: "#E6B143" },
    // });

    World.add(world, [leftWall, rightWall, ground, topLine]);

    Render.run(render);
    Runner.run(engine);

    // return () => {
    //   Render.stop(render);
    //   Runner.stop(engine);
    //   World.clear(world);
    //   Engine.clear(engine);
    // }

  }, []);

  function addFruit() {
    const index = 7;
    const fruit = FRUITS[index];

    const body = Bodies.circle(300, 50, fruit.radius, {
      index: index,
      render: {
        sprite: { texture: `${fruit.name}.png` },
      },
    });

    World.add(world, body);
  }

  addFruit();
}

export default App;
