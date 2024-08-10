import React, { useState, useEffect, useRef } from "react";
import Matter from "matter-js";
import "./App.css";

export function Game() {
  const canva = useRef(null);
  const box = useRef(null);
  let [scoreA, setScoreA] = useState(0);
  let [scoreB, setScoreB] = useState(0);

  useEffect(() => {
	  const BallSound = new Audio("./BallSound.mp3");
	  const Fail = new Audio("./Fail.mp3");
    const RacketHeight = 90;
    const RacketWidth = 15;
    const ignored = 0;
    const Width = 1000;
    const Height = 500;
    const initialBallPos = {x: Width /2, y: Height/2};
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Bodies = Matter.Bodies;
    const World = Matter.World;
    const Runner = Matter.Runner;

    // for lestining to others object and manipulate how object intract with each other
    const Events = Matter.Events;

    //for moving you need the Body object
    const Body = Matter.Body;

    //Engin that calculates and manipulates and manages the simulation of the objects in the world
    const engine = Engine.create();
    const runner = Runner.create();
    
    //rendring the canvas and objects
    const render = Render.create({
      engine: engine,
      element: box.current,
      canvas: canva.current,
      options: {
        width: Width,
        height: Height,
        wireframes: false,
        background: "Black",
      },
    });

    engine.world.gravity.y = 0;
    //control the speed of simulation 
    engine.timing.timeScale = 1;



    //Creats Objects
    const RacketLeft = Bodies.rectangle(13, 39, RacketWidth, RacketHeight
      , {
		label: "RacketR",
      	isStatic: true,
      	restitution: 1, //how the body bounce 
      	friction: 0,
      	frictionAir: 0,
      	frictionStatic: 0,
      	render: {
        fillStyle: "white",
        strokeStyle: "blue",
        lineWidth: 1,
      },
	  chamfer:{
		  radius: 10,
	  }
    });

    const Fil = Bodies.rectangle(render.options.width/2 , render.options.height/2, 1, render.options.height, {
      isStatic: true,
      collisionFilter: {
        category: ignored,
      },
      render: {
        fillStyle: "white",
      }
    });

    const RacketRight = Bodies.rectangle((render.options.width - 13), (render.options.height - 39), RacketWidth, RacketHeight, {
      //(x, y, w, h)
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
	  chamfer:{
		radius: 10,
	  }
    });

    const Ball = Bodies.circle(initialBallPos.x, initialBallPos.y , 12, {
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
      }
    });


    const walls = [
      Bodies.rectangle(render.options.width/2, 0, render.options.width, 5, {isStatic: true, restitution: 1, friction:0, frictionAir:0, frictionStatic:0, label: "top"}),
      Bodies.rectangle(render.options.width/2, render.options.height, render.options.width, 5, {isStatic: true, restitution: 1, friction:0, frictionAir:0, frictionStatic:0, label: "bottom"}),
      Bodies.rectangle(0, render.options.height/2, 5, render.options.height, {isStatic: true, restitution: 1, friction:0, frictionAir:0, frictionStatic:0, label: "left"}),
      Bodies.rectangle(render.options.width, render.options.height/2, 5, render.options.height, {isStatic: true, restitution: 1, friction:0, frictionAir:0, frictionStatic:0, label: "right"})
    ];

    //add objects to the world
    World.add(engine.world, [...walls, RacketRight, RacketLeft,Fil, Ball]);

    // Start the Matter.js engine with Runner instead of Engine.run
    Runner.run(runner, engine); 
    Render.run(render);


  // Variables for racket movement
  let racketSpeed = 9;
  let keys = {};
  window.addEventListener('keydown', function(event) {
    keys[event.code] = true;
  });
  window.addEventListener('keyup', function(event) {
    keys[event.code] = false;
  });

  function RunMovement() {
    const canvasHeight = render.options.height;
    let drX = 0;
    let drY = 0;
    let dlX = 0;
    let dlY = 0;

    if (keys['ArrowUp'] ) {
      drY -= racketSpeed;
      if(RacketRight.position.y - RacketHeight / 2 > 0 )
        Matter.Body.translate(RacketRight, { x: drX, y: drY });
      }
      if (keys['ArrowDown']) {
        drY += racketSpeed;
        if(RacketRight.position.y + RacketHeight / 2 < canvasHeight)
          Matter.Body.translate(RacketRight, { x: drX, y: drY });
      }
      if(keys['KeyW']){
        dlY -= racketSpeed;
        if (RacketLeft.position.y - RacketHeight / 2 > 0)
          Matter.Body.translate(RacketLeft, { x: dlX, y: dlY });
      }
      if(keys['KeyS']){
        dlY += racketSpeed;
        if (RacketLeft.position.y + RacketHeight / 2 < canvasHeight)
          Matter.Body.translate(RacketLeft, { x: dlX, y: dlY });
      }
      if(keys['Space']){
        Body.setVelocity(Ball, { x: 10 , y: 3 });
      }
    
    
    requestAnimationFrame(RunMovement);
  }

  RunMovement();

    //listen to other object to know when the ball hits the wall/Racket
    Events.on(engine, "collisionStart", (event) => {
      const pairs = event.pairs;
      pairs.forEach((pair) => {
        const {bodyA, bodyB} = pair;
        const ball = Ball;
        let bodyC = 0;
          if(bodyA === ball)
            bodyC = bodyB;
          else if(bodyB === ball)
              bodyC = bodyA;
        
      if(bodyC.label === "left"){
          setScoreA(prevNumber => prevNumber + 1);
		    Fail.play();
          Body.setVelocity(Ball, {x: 0, y: 0});
		      Body.setPosition(Ball, initialBallPos);
          console.log("this is left");
        }
        else if(bodyC.label === "right"){
          setScoreB(prevNumber => prevNumber + 1);
		  Fail.play();
          Body.setVelocity(Ball, {x: 0, y: 0});
          Body.setPosition(Ball, initialBallPos);
          console.log("this is right");
        }
		else if(bodyC.label === "RacketR" || bodyC.label === "RacketL")
			BallSound.play();
      })
    })

    return () => {
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
      Matter.World.clear(engine.world);
    }
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
