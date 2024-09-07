import React, { useState, useEffect, useRef } from "react";
import Matter from "matter-js";

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
      fillStyle: "#EEEEEE",
      lineWidth: 1,
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
        fillStyle: "#FFD369",
        lineWidth: 1,
      },
    }
  );

  return { RacketLeft, RacketRight };
};

const CreateBallFillWall = (
  Bodies,
  render,
  initialBallPos,
  ignored,
  engine
) => {
  //draw the Ball
  const Ball = Bodies.circle(initialBallPos.x, initialBallPos.y, 20, {
    restitution: 1,
    friction: 0,
    frictionAir: 0,
    frictionStatic: 0,
    inertia: Infinity,
    render: {
      lineWidth: 2,
      fillStyle: "#00FFD1",
    },
    collisionFilter: {
      mask: ~ignored,
    },
  });
  //draw the Fil
  const Fil = Bodies.rectangle(
    render.canvas.width / 2,
    render.canvas.height / 2,
    1,
    render.canvas.height,
    {
      isStatic: true,
      collisionFilter: {
        category: ignored,
      },
      render: {
        fillStyle: "black",
      },
    }
  );
  //draw walls
  const walls = [
    Bodies.rectangle(render.canvas.width / 2, 0, render.canvas.width, 5, {
      isStatic: true,
      restitution: 1,
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
      label: "top",
      render: {
        fillStyle: "#FFD369",
      },
    }),
    Bodies.rectangle(
      render.canvas.width / 2,
      render.canvas.height,
      render.canvas.width,
      5,
      {
        isStatic: true,
        restitution: 1,
        friction: 0,
        frictionAir: 0,
        frictionStatic: 0,
        label: "bottom",
        render: {
          fillStyle: "#FFD369",
        },
      }
    ),
    Bodies.rectangle(0, render.canvas.height / 2, 5, render.canvas.height, {
      isStatic: true,
      restitution: 1,
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
      label: "left",
      render: {
        fillStyle: "#FFD369",
      },
    }),
    Bodies.rectangle(
      render.canvas.width,
      render.canvas.height / 2,
      5,
      render.canvas.height,
      {
        isStatic: true,
        restitution: 1,
        friction: 0,
        frictionAir: 0,
        frictionStatic: 0,
        label: "right",
        render: {
          fillStyle: "#FFD369",
        },
      }
    ),
  ];

  return { Ball, Fil, walls };
};

const ListenKey = (
  render,
  RacketRight,
  RacketLeft,
  Ball,
  RacketHeight,
  Body,
  ballSpeed
) => {
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
    let racketSpeed = 12;
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

        Body.setVelocity(Ball, { x: 12, y: ballSpeed });
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

const Collision = (
  Events,
  Body,
  engine,
  Ball,
  setScoreA,
  setScoreB,
  initialBallPos
) => {
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
};

export function Game() {
  //initializing the canva and box
  const canva = useRef(null);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);


  useEffect(() => {
    let ballSpeed = 3;
    const ignored = 0;
    let newWidth;
    let newHeight;
    let Width = window.innerWidth * 0.7;
    let Height = window.innerHeight * 0.6;
    const RacketWidth = 25;
    const RacketHeight = 110;
    const initialBallPos = { x: Width / 2, y: Height / 2 };

    //initializing modules of the MatterJs
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Bodies = Matter.Bodies;
    const World = Matter.World;
    const Runner = Matter.Runner;
    const Events = Matter.Events;
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
        background: "#393E46",
      },
    });

    function resizeCanvas() {
      newWidth = window.innerWidth * 0.7;
      newHeight = window.innerHeight * 0.6;

      render.canvas.width = newWidth;
      render.canvas.height = newHeight;

      if (walls) {
        Matter.Body.setPosition(walls[0], { x: newWidth / 2, y: 0 });
        Matter.Body.setPosition(walls[1], { x: newWidth / 2, y: newHeight });
        Matter.Body.setPosition(walls[2], { x: 0, y: newHeight / 2 });
        Matter.Body.setPosition(walls[3], { x: newWidth, y: newHeight / 2 });

        Matter.Body.scale(walls[0], newWidth / Width, 1);
        Matter.Body.scale(walls[1], newWidth / Width, 1);
        Matter.Body.scale(walls[2], 1, newHeight / Height);
        Matter.Body.scale(walls[3], 1, newHeight / Height);
      }
      if (RacketLeft && RacketRight) {
        Matter.Body.setPosition(RacketLeft, { x: 15, y: newHeight / 2 });
        Matter.Body.setPosition(RacketRight, {
          x: newWidth - 15,
          y: newHeight / 2,
        });

        Matter.Body.scale(RacketLeft, 1, newHeight / Height);
        Matter.Body.scale(RacketRight, 1, newHeight / Height);
      }

      if (Fil) {
        Matter.Body.setPosition(Fil, { x: newWidth / 2, y: newHeight / 2 });
        Matter.Body.scale(Fil, newWidth / Width, newHeight / Height);
      }
      Matter.Body.setPosition(Ball, { x: newWidth / 2, y: newHeight / 2 });

      Width = newWidth;
      Height = newHeight;
    }

    window.addEventListener("resize", resizeCanvas);

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
      // engine
    );
    //Adding the bodies to the world
    World.add(engine.world, [RacketRight, RacketLeft, ...walls, Fil, Ball]);

    //run the engine and render the canva/bodies
    Runner.run(runner, engine);
    Render.run(render);

    //handle keys pressed to play
    ListenKey(
      render,
      RacketRight,
      RacketLeft,
      Ball,
      RacketHeight,
      Body,
      ballSpeed
    );

    //run the sound and increment the score when the ball hits the Racktes or Walls
    Collision(Events, Body, engine, Ball, setScoreA, setScoreB, initialBallPos);

    resizeCanvas();

    //stopping and cleanning all resources
    return () => {
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
      Matter.World.clear(engine.world);
    };
  }, []);
  return (
    <div className="">
      <div className="flex text-7x justify-center ">
        <h1 className="text-7xl mr-52" style={{ color: "#FFD369" }}>
          {scoreA}
        </h1>
        <span className="font-extralight text-5xl flex items-center">VS</span>
        <h1 className="text-7xl ml-52" style={{ color: "#FFD369" }}>
          {scoreB}
        </h1>
      </div>
      <canvas className="block mx-auto " ref={canva} />
      </div>
  );
}
