import React, { useState, useEffect, useRef } from "react";
import Matter from "matter-js";

export const ListenKey = (
    render,
    RacketRight,
    RacketLeft,
    Ball,
    RacketHeight,
    Body,
    ballSpeed,
    isStart,
    setIsStart
  ) => {
    let keys = {};
  
  window.addEventListener("keydown", (event) => {
      keys[event.code] = true;
    
      if (event.code === "Space") {
        setIsStart((prevIsStart) => {
          if (prevIsStart) {
            Body.setVelocity(Ball, { x: 12, y: ballSpeed });
            console.log("Game started");
          } else {
            console.log("Game already started");
          }
          return false; // Ensure that `isStart` is set to `false`
        });
      }
    });
    
    window.addEventListener("keyup", (event) => {
      keys[event.code] = false;
    });
  
    //run each key separate
    function RunMovement() {
      let racketSpeed = 12;
      const canvasHeight = render.options.height;
      let drY = 0;
      let dlY = 0;
  
      if (keys["ArrowUp"]) {
        drY -= racketSpeed;
      }
      if (keys["ArrowDown"]) {
        drY += racketSpeed;
      }
  
      if (
        RacketRight.position.y - RacketHeight / 2 + drY > 0 &&
        RacketRight.position.y + RacketHeight / 2 + drY < canvasHeight
      ) {
        Matter.Body.translate(RacketRight, { x: 0, y: drY });
      }
  
      if (keys["KeyW"]) {
        dlY -= racketSpeed;
      }
      if (keys["KeyS"]) {
        dlY += racketSpeed;
      }
  
      if (
        RacketLeft.position.y - RacketHeight / 2 + dlY > 0 &&
        RacketLeft.position.y + RacketHeight / 2 + dlY < canvasHeight
      ) {
        Matter.Body.translate(RacketLeft, { x: 0, y: dlY });
      }
      //method that helps the browser to draw the object and to run smoothly
      requestAnimationFrame(RunMovement);
    }
    RunMovement();
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  };