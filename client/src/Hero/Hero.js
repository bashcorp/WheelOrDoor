import React, { Component } from "react";
import Logo from "../Logo/Logo";
import "./Hero.css";

function Poll() {
  const sectionWidth = 50;

  return (
    <>
      <div className="inset-center">
        <Logo />
      </div>

      <div className="background-container">
        <div
          className="wheel relative"
          style={{
            width: sectionWidth + "%",
          }}
        >
          <button
            tabIndex={0}
            className="absolute bottom-10 cursor-pointer right-0 z-10 w-full p-2 rounded-lg mx-auto max-w-sm"
            onClick={() => alert("voted wheel")}
          >
            <div
              className="block"
              id="static-example"
              role="alert"
              aria-atomic="true"
            >
              <div className="gray-theme p-3 bg-clip-padding border-b border-gray-200 rounded-lg">
                <p className="font-bold text-center text-gray-50 text-2xl">
                  Vote for<span className="text-blue-200"> #TeamWheel</span>
                </p>
              </div>
            </div>
          </button>
        </div>
        <div
          className="door relative right-0"
          style={{
            width: 100 - sectionWidth + "%",
          }}
        >
          <button
            tabIndex={0}
            className="absolute cursor-pointer bottom-10 left-0 p-2 z-10 rounded-lg mx-auto w-full max-w-sm"
            onClick={() => alert("voted door")}
          >
            <div
              className="block"
              id="static-example"
              role="alert"
              aria-atomic="true"
            >
              <div className="gray-theme p-3 bg-clip-padding border-b border-gray-200 rounded-lg">
                <p className="font-bold text-center text-gray-50 text-2xl">
                  Vote for<span className="text-red-200"> #TeamDoor </span>
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
export default Poll;
