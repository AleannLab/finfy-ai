"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { config } from "@/config/env";
import { SubmitAudio } from "./SubmitAudio";
import { CloseButton } from "./CloseButton";
import { LoadButton } from "./LoadButton";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";

const Lines = () => {
  return (<div className="w-[833px] inline-flex justify-start items-center gap-[3px]">
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-[#e9e9e9]" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-black" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-black" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-black" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-black" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-black" />
    <div className="w-1 h-0 origin-top-left -rotate-90 outline outline-2 outline-offset-[-1px] outline-black" />
  </div>)
}

interface AudioChatProps {
  onClose: () => void;
  handleChange: (text: string) => void;
  isClosed: boolean;
  chatContext: string;
}

const AudioChat = ({ onClose, isClosed, chatContext = "", handleChange }: AudioChatProps) => {
  const [isFirst, setIsFirst] = useState(true);
  const [clicked, setClicked] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const recorderControls = useVoiceVisualizer({});

  const {
    recordedBlob,
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingTime
  } = recorderControls;

  useEffect(() => {
    if (isFirst) {
      setIsFirst(false);
      startRecording();
    }
  }, []);

  const handleSendTranscription = async (blobToUse: Blob) => {
    try {
      console.log("✅ Processing the recorded blob...");

      const formData = new FormData();
      formData.append("file", blobToUse, "audio.wav");
      formData.append("model", "whisper-1");
      formData.append("language", "en");

      const response = await axios.post("https://api.openai.com/v1/audio/transcriptions", formData, {
        headers: { "Authorization": `Bearer ${config.REAL_TIME_CLIENT}` }
      });

      const text = response.data.text;
      if (text.trim()) handleChange(text.trim());

      console.log("✅ Transcription completed successfully.");
    } catch (error) {
      console.error("❌ Error in transcription process:", error);
    }
  };

  useEffect(() => {
    const process = async () => {
      if (recordedBlob) {
        await handleSendTranscription(recordedBlob);
        onClose();
      } else {
        console.log("❌ No recordedBlob available.");
      }
    }
    process()
  }, [recordedBlob]);

  const handleAddAnswer = async () => {

    setClicked(true);

    togglePauseResume();
    stopRecording()

    clearInterval(intervalRef.current!);



  };

  const handleClose = () => {
    togglePauseResume();
    clearInterval(intervalRef.current!);
    handleChange("");
    onClose();
  };

  const formatRecordingTime = (timeInMs: number): string => {
    const totalSeconds = Math.floor(timeInMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };


  return (
    <div className="flex gap-6 mt-2 md:gap-8 w-full max-h-10 items-center justify-between">
      <CloseButton onClick={handleClose} />
      <div className="w-full h-10 relative overflow-hidden">
      <div className="w-full flex absolute top-[18px]  h-1">
          <Lines />
        </div>
        {!clicked && <VoiceVisualizer
          controls={recorderControls}
          mainBarColor="#000"
          height={40}
          isControlPanelShown={false}
          isDefaultUIShown={false}
          isAudioProcessingTextShown={false}
          isProgressIndicatorTimeShown={false}
        />}
      </div>

      <div className="text-xs flex items-center justify-center min-h-10 min-w-8 text-black">
        {formatRecordingTime(recordingTime)}
      </div>
      {clicked ? <LoadButton /> : <SubmitAudio onClick={handleAddAnswer} />}
    </div>
  );
};

export { AudioChat };
