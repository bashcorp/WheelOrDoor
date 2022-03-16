import React, { Component } from "react";

function Poll() {
  return (
    <>
      <div className="background-container">
        <div
          className="wheel"
          style={{
            width: "50%",
          }}
        ></div>
        <div className="door"></div>
      </div>
      <div className="card-wrapper">
        <div className="card">
          <h1>Wheel or Door?</h1>
          <p className="lead">
            Do you think there are more doors or wheels in the world?
          </p>
        </div>
      </div>
    </>
  );
}
export default Poll;
