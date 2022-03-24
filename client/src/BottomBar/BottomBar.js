import React from "react";
import "../App.css";

function BottomBar(props) {
  const [btnText, setBtnText] = React.useState("Copy URL");

  return (
    <>
      <div
        className="rounded pr-6 active:bg-white-600 font-bold justify-around align-items-middle p-2 border-t-gray-500 border-t ease-linear  flex flex-col md:flex-row transition-all duration-150"
        id="bottomBar"
      >
        <div className="text-white text-lg mb-2 md:mb-0 text-center">
          {props.currentlyVoting} currently voting
        </div>
        <div className="text-white ml-24 text-lg hidden md:block">
          Thank you for voting!
        </div>
        <div className="flex justify-center">
          <a
            className="mr-3 bg-green-700 text-xl text-white active:bg-green-800 uppercase rounded px-4 shadow hover:shadow-md  ease-linear transition-all duration-150"
            type="button"
            href="https://api.whatsapp.com/send?text=I%20just%20voted%20on%20wheelordoor.com%20-%20check%20it%20out!"
            target="_blank"
          >
            WhatsApp
          </a>
          <a
            className="mr-3 bg-blue-700 text-white active:bg-blue-800 uppercase px-4 text-xl rounded shadow hover:shadow-md  ease-linear transition-all duration-150"
            type="button"
            href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fwheelordoor.com&text=I%20just%20voted%20on%20wheelordoor.com%20-%20check%20it%20out!"
            target="_blank"
          >
            Twitter
          </a>
          <button
            className="bg-pink-700 text-white active:bg-pink-800 uppercase px-4 text-xl rounded shadow hover:shadow-md ease-linear transition-all duration-150"
            type="button"
            id="copyLink"
            onClick={() => {
              navigator.clipboard.writeText("https://wheelordoor.com");
              setBtnText("Copied!");
            }}
          >
            {btnText}
          </button>
        </div>
      </div>
    </>
  );
}

export default BottomBar;
