import React from "react";
import "../App.css";

function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button
        className="gray-theme p-3 bg-clip-padding border-b border-gray-200 rounded-lg text-white text-2xl hover:shadow-md ease-linear transition-all duration-150 active:bg-gray-900"
        id="information"
        type="button"
        onClick={() => setShowModal(true)}
      >
        &#8505;
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-serif font-semibold">
                    Information
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-xl font-serif">
                    This is a site proudly created by{" "}
                    <a
                      className="underline font-serif"
                      target="_blank"
                      href="https://www.linkedin.com/in/cassius-close"
                    >
                      Cassius Close
                    </a>{" "}
                    and{" "}
                    <a
                      className="underline font-serif"
                      target="_blank"
                      href="https://benlapid.us"
                    >
                      Ben Lapidus
                    </a>
                    .
                  </p>
                  <p className="my-4 text-lg leading-relaxed font-serif">
                    Project inspired by{" "}
                    <a
                      className="underline font-serif"
                      target="_blank"
                      href="https://twitter.com/newyorknixon/status/1500000428985286657"
                    >
                      this tweet
                    </a>
                    .
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <small className="font-serif">
                    &copy; Copyright 2022, Ben Lapidus and Cassius Close
                  </small>
                  <button
                    className="bg-gray-700 text-white active:bg-gray-800 uppercase px-4 py-2 text-2xl rounded shadow hover:shadow-md ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Modal;
