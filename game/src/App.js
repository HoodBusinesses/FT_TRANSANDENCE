import React, { useState, useEffect, useRef } from "react";
import Matter from "matter-js";
import "./App.css";

const CreatRackets = (Bodies, RacketWidth, RacketHeight, render) => {
  // create the left Racket
  const RacketLeft = Bodies.rectangle(13, 39, RacketWidth, RacketHeight, {
    label: "RacketR",
    isStatic: true,
    restitution: 1,
    friction: 0,
    frictionAir: 0,
    frictionStatic: 0,
    render: {
      fillStyle: "white",
      strokeStyle: "blue",
      lineWidth: 1,
    },
    chamfer: {
      radius: 10,
    },
  });
  // create the right Racket
  const RacketRight = Bodies.rectangle(
    render.options.width - 13,
    render.options.height - 39,
    RacketWidth,
    RacketHeight,
    {
      label: "RacketL",
      isStatic: true,
      restitution: 1,
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
      render: {
        fillStyle: "white",
        strokeStyle: "blue",
        lineWidth: 1,
      },
      chamfer: {
        radius: 10,
      },
    }
  );

  return { RacketLeft, RacketRight };
};

const CreateBallFillWall = (Bodies, render, initialBallPos, ignored) => {
  //draw the Ball
  const Ball = Bodies.circle(initialBallPos.x, initialBallPos.y, 12, {
    restitution: 1,
    friction: 0,
    frictionAir: 0,
    frictionStatic: 0,
    inertia: Infinity,
    render: {
      lineWidth: 2,
      strokeStyle: "blue",
    },
    collisionFilter: {
      mask: ~ignored,
    },
  });
  //draw the Fil
  const Fil = Bodies.rectangle(
    render.options.width / 2,
    render.options.height / 2,
    1,
    render.options.height,
    {
      isStatic: true,
      collisionFilter: {
        category: ignored,
      },
      render: {
        fillStyle: "white",
      },
    }
  );
  //draw walls
  const walls = [
    Bodies.rectangle(render.options.width / 2, 0, render.options.width, 5, {
      isStatic: true,
      restitution: 1,
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
      label: "top",
    }),
    Bodies.rectangle(
      render.options.width / 2,
      render.options.height,
      render.options.width,
      5,
      {
        isStatic: true,
        restitution: 1,
        friction: 0,
        frictionAir: 0,
        frictionStatic: 0,
        label: "bottom",
      }
    ),
    Bodies.rectangle(0, render.options.height / 2, 5, render.options.height, {
      isStatic: true,
      restitution: 1,
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
      label: "left",
    }),
    Bodies.rectangle(
      render.options.width,
      render.options.height / 2,
      5,
      render.options.height,
      {
        isStatic: true,
        restitution: 1,
        friction: 0,
        frictionAir: 0,
        frictionStatic: 0,
        label: "right",
      }
    ),
  ];
  return { Ball, Fil, walls };
};

const ListenKey = (render, RacketRight, RacketLeft, Ball, RacketHeight, Body) => {
  let keys = {};

  //listning to button pressed in the keyboard
  window.addEventListener("keydown", function (event) {
    keys[event.code] = true;
  });
  window.addEventListener("keyup", function (event) {
    keys[event.code] = false;
  });

  //run each key separate
  function RunMovement() {
    let racketSpeed = 9;
    const canvasHeight = render.options.height;
    let drX = 0;
    let drY = 0;
    let dlX = 0;
    let dlY = 0;

    switch (true) {
      case keys["ArrowUp"]: {
        drY -= racketSpeed;
        if (RacketRight.position.y - RacketHeight / 2 > 0)
          Matter.Body.translate(RacketRight, { x: drX, y: drY });
        break;
      }
      case keys["ArrowDown"]: {
        drY += racketSpeed;
        if (RacketRight.position.y + RacketHeight / 2 < canvasHeight)
          Matter.Body.translate(RacketRight, { x: drX, y: drY });
        break;
      }
      case keys["KeyW"]: {
        dlY -= racketSpeed;
        if (RacketLeft.position.y - RacketHeight / 2 > 0)
          Matter.Body.translate(RacketLeft, { x: dlX, y: dlY });
        break;
      }
      case keys["KeyS"]: {
        dlY += racketSpeed;
        if (RacketLeft.position.y + RacketHeight / 2 < canvasHeight)
          Matter.Body.translate(RacketLeft, { x: dlX, y: dlY });
        break;
      }
      case keys["Space"]: {
        Body.setVelocity(Ball, { x: 10, y: 3 });
        break;
      }
      default:
        break;
    }
    //method that helps the browser to draw the object and to run smoothly
    requestAnimationFrame(RunMovement);
  }
  RunMovement();
};

const Collision = (Events, Body, engine, Ball, setScoreA, setScoreB, initialBallPos) => {
  //sounds of the ball hitting the Racket and the wall
  const BallSound = new Audio("./BallSound.mp3");
  const Fail = new Audio("./Fail.mp3");

  Events.on(engine, "collisionStart", (event) => {
    const pairs = event.pairs;
    pairs.forEach((pair) => {
      const { bodyA, bodyB } = pair;
      const ball = Ball;
      let bodyC = 0;
      //identify the other object that the ball will hit
      if (bodyA === ball) bodyC = bodyB;
      else if (bodyB === ball) bodyC = bodyA;

      //apply sound and score depends on the other object
      if (bodyC.label === "left") {
        setScoreA((prevNumber) => prevNumber + 1);
        Fail.play();
        Body.setVelocity(Ball, { x: 0, y: 0 });
        Body.setPosition(Ball, initialBallPos);
      } else if (bodyC.label === "right") {
        setScoreB((prevNumber) => prevNumber + 1);
        Fail.play();
        Body.setVelocity(Ball, { x: 0, y: 0 });
        Body.setPosition(Ball, initialBallPos);
      } else if (bodyC.label === "RacketR" || bodyC.label === "RacketL")
        BallSound.play();
    });
  });
}

export function Game() {
  //initializing the canva and box
  const canva = useRef(null);
  let [scoreA, setScoreA] = useState(0);
  let [scoreB, setScoreB] = useState(0);

  useEffect(() => {
    const ignored = 0;
    const Height = 500;
    const Width = 1000;
    const RacketWidth = 15;
    const RacketHeight = 90;
    const initialBallPos = { x: Width / 2, y: Height / 2 };

    //engine is the module the contains the method to manipulate, update and simulate the objects in the World
    const Engine = Matter.Engine;
    //for providing the canva 
    const Render = Matter.Render; 
    //for creating bodies
    const Bodies = Matter.Bodies;
    //provides the world where we put the objects and simulates them...
    const World = Matter.World; 
    //for continuously update the Engine inside the browser environment
    const Runner = Matter.Runner; 
    //for listening to events on other object
    const Events = Matter.Events;
    //for manipulating bodies (also creating)
    const Body = Matter.Body; 

    //Initializing modules
    const engine = Engine.create();
    const runner = Runner.create();
    const render = Render.create({
      engine: engine,
      canvas: canva.current,
      options: {
        width: Width,
        height: Height,
        wireframes: false,
        background: "Black",
      },
    });

    //set the gravity to 0 and the speed of object to normal(1) in the world 
    engine.world.gravity.y = 0;
    engine.timing.timeScale = 1;

    // creating Rackets objects
    const { RacketLeft, RacketRight } = CreatRackets(
      Bodies,
      RacketWidth,
      RacketHeight,
      render
    );
    // creating Ball Fil and Walls of the board
    const { Ball, Fil, walls } = CreateBallFillWall(
      Bodies,
      render,
      initialBallPos,
      ignored
    );

    //Adding the bodies to the world
    World.add(engine.world, [RacketRight, RacketLeft, ...walls, Fil, Ball]);

    //run the engine and render the canva/bodies
    Runner.run(runner, engine);
    Render.run(render);

    //handle keys pressed to play
    ListenKey(render, RacketRight, RacketLeft, Ball, RacketHeight, Body);

    //run the sound and increment the score when the ball hits the Racktes or Walls
    Collision(Events, Body, engine, Ball, setScoreA, setScoreB, initialBallPos);

    //stopping and cleanning all resources
    return () => {
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
      Matter.World.clear(engine.world);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-center text-2xl">Game</h1>
      <div className="flex space-x-96 text-7xl">
        <h1>{scoreA}</h1>
        <h1>{scoreB}</h1>
      </div>
      <canvas className="m-5" ref={canva} />
    </div>
  );
}
