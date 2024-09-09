import React, { useState, useEffect, useRef } from "react";
import Matter from "matter-js";
import {CreatRackets, CreateBallFillWall} from "./Bodies"
import ListenKey from "./Keys"
import Collision from "./Collision"


export function Game() {
  //initializing the canva and box
  //   const canva = useRef<HTMLCanvasElement | null >(null);
  const canva = useRef(null);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [isStart, setIsStart] = useState(true);

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

      if (Walls) {
        Body.setPosition(Walls[0], { x: newWidth / 2, y: 0 });
        Body.setPosition(Walls[1], { x: newWidth / 2, y: newHeight });
        Body.setPosition(Walls[2], { x: 0, y: newHeight / 2 });
        Body.setPosition(Walls[3], { x: newWidth, y: newHeight / 2 });

        Body.scale(Walls[0], newWidth / Width, 1);
        Body.scale(Walls[1], newWidth / Width, 1);
        Body.scale(Walls[2], 1, newHeight / Height);
        Body.scale(Walls[3], 1, newHeight / Height);
      }
      if (RacketLeft && RacketRight) {
        Body.setPosition(RacketLeft, { x: 15, y: newHeight / 2 });
        Body.setPosition(RacketRight, {
          x: newWidth - 15,
          y: newHeight / 2,
        });

        Body.scale(RacketLeft, 1, newHeight / Height);
        Body.scale(RacketRight, 1, newHeight / Height);
      }

      if (Fil) {
        Body.setPosition(Fil, { x: newWidth / 2, y: newHeight / 2 });
        Body.scale(Fil, newWidth / Width, newHeight / Height);
      }
      Body.setPosition(Ball, { x: newWidth / 2, y: newHeight / 2 });

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
    const { Ball, Fil, Walls } = CreateBallFillWall(
      Bodies,
      render,
      initialBallPos,
      ignored
      // engine
    );
    //Adding the bodies to the world
    World.add(engine.world, [RacketRight, RacketLeft, ...Walls, Fil, Ball]);

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
      ballSpeed,
      isStart,
      setIsStart
    );

    //run the sound and increment the score when the ball hits the Racktes or Walls
    Collision(
      Events,
      Body,
      engine,
      Ball,
      setScoreA,
      setScoreB,
      initialBallPos,
      setIsStart
    );
    resizeCanvas();

    //stopping and cleanning all resources
    return () => {
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
      Matter.World.clear(engine.world);
    };
  }, []);

  return (
    <div
      className=""
      style={{ height: "100%", backgroundColor: "#222831", color: "#FFD369" }}
    >
      <div className="flex text-7x justify-center ">
        <h1 className="text-7xl mr-52" style={{ color: "#FFD369" }}>
          {scoreA}
        </h1>
        <span className="font-extralight text-5xl flex items-center">VS</span>
        <h1 className="text-7xl ml-52" style={{ color: "#FFD369" }}>
          {scoreB}
        </h1>
      </div>
      <div>
        <canvas className="block mx-auto z-3 text-white" ref={canva} />
        {isStart && (
          <h1 className="flex justify-center pt-10 text-4xl z-50">
            Press Space to START
          </h1>
        )}
      </div>
    </div>
  );
}
