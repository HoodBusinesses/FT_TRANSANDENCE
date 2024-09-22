"use client"

import React from "react";
import "./globals.css";
import { NavBar } from "./NavBar/Nav.js";
import { Maps } from "./HomeGame/Maps"


export default function Display() {
	return (
	  <>
		<NavBar />
		<Maps />
	  </>
	);
  }
