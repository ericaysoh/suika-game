import { Bodies, Body, Engine, Events, Render, Runner, World } from "matter-js";
import { useState, useEffect, useRef } from "react";
import "./App.css";
import FRUITS from "./fruits";
// import counterBox from "./counter";

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
      height: 700,
      // showAxes: false
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
    const ground = Bodies.rectangle(310, 670, 620, 60, {
      isStatic: true,
      render: { fillStyle: "#E6B143" },
    });
    const topLine = Bodies.rectangle(310, 120, 620, 2, {
      name: "topLine",
      isStatic: true,
      isSensor: true,
      render: { fillStyle: "#E6B143" },
    });

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

  let currentBody = null;
  let currentFruit = null;
  let disableAction = false;
  let interval = null;

  function addFruit() {
    const index = Math.floor(Math.random() * 5);
    const fruit = FRUITS[index];

    const body = Bodies.circle(300, 50, fruit.radius, {
      index: index,
      isSleeping: true, // prevents new fruits from falling automatically
      render: {
        sprite: { texture: `${fruit.name}.png` },
      },
      restitution: 0.2,
      // frictionAir: 0.01
    });

    currentBody = body;
    currentFruit = fruit;

    World.add(world, body);
  }


  // vanilla JS:
  window.onkeydown = (event) => {
    if (disableAction) {
      return;
    }
    
    switch (event.code) {

      case "KeyA":
        if (interval) return;
        interval = setInterval(() => {
          if (currentBody.position.x - currentFruit.radius > 30)
            Body.setPosition(currentBody, {
              x: currentBody.position.x - 2,
              y: currentBody.position.y
            });
        }, 5)
        break;

      case "KeyD":
        if (interval) return;
        interval = setInterval(() => {
          if (currentBody.position.x + currentFruit.radius < 590)
          Body.setPosition(currentBody, {
            x: currentBody.position.x + 2,
            y: currentBody.position.y
          });
        })
        break;

      case "KeyS":
        currentBody.isSleeping = false;
        disableAction = true;
        setTimeout(() => {
          addFruit();
          disableAction = false;
        }, 1000); // using setTimeout to control flow of adding fruit body
        break;
    }
  }

  // helps the fruits to glide smoothly (along with the interval/setInterval under the setkeydown switch cases)
  window.onkeyup = (event) => {
    switch (event.code) {
      case "KeyA":
      case "KeyD":
        clearInterval(interval);
        interval = null;
    }
  }

  const [ score, setScore ] = useState(0);
  // const [ count, setCount ] = useState(0);
  // const counterRef = useRef();
  // const idx = useRef(0);
  // const countRef = useRef(0);
  let count = 0;
  Events.on(engine, "collisionStart", (event) => {
    event.pairs.forEach((collision) => {
      if (collision.bodyA.index === collision.bodyB.index) {
        const index = collision.bodyA.index;
        if (index === FRUITS.length - 1) { // checks if fruit is watermelon - no need to make another fruit if so
          return;
        }
        
        World.remove(world, [collision.bodyA, collision.bodyB]);
        const newFruit = FRUITS[index+1];
        const newBody = Bodies.circle(
          collision.collision.supports[0].x, // the x coordinate of the collision point
          collision.collision.supports[0].y, // the y coordinate of the collision point
          newFruit.radius,
          {
            render: {
              sprite: { texture: `${newFruit.name}.png` },
            },
            index: index+1
          }
        );
        World.add(world, newBody)
        // let currCount = count;
        // setCount(currCount += (index+1)*3)
        // setCount((prevCount) => prevCount + (index+1)*3)
        // Counter(index);
        count += (index+1)*3
      }

      if (!disableAction && (collision.bodyA.name === "topLine" || collision.bodyB.name === "topLine")) {
        alert(`Game over. Your score is ${count}`);
        setScore(count);
        // setScore(JSON.parse(window.localStroage.getItem('score')));
      }
    });
  });

  // useEffect(() => {
  //   setScore(window.localStorage.setItem('score', count));
  // }, [count])

  // function Counter(index) {
  //   const [ count, setCount ] = useState(0);
  //   console.log('countttt', count)
  //   let currCount = count;
  //   setCount(currCount += (index+1)*3);
  //   return (
  //     <div></div>
  //   );
  // }

  addFruit();
  
  return (
    <div>
      <div>
      {/* Current score: {JSON.parse(window.localStroage.getItem('score'))} */}
      Current score: {score}
      {/* <Counter count={count}/> */}
      {/* {counterRef.current || <Counter ref={counterRef} count={count}/>} */}
      </div>
    </div>
  )
}

// function Counter({ count }) {
//   return (
//     <div>
//       {/* Display the count */}
//       Count: {count}
//     </div>
//   );
// }

export default App;
