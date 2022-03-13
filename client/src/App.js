import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <>
      <div className="background-container">
        <div className="wheel" style={{ width: "40%" }}></div>
        <section className="spikes" style={{ left: "40%" }}></section>

        <div className="door"></div>
      </div>

      <div className="card-wrapper">
        <div className="card">
          <h1>Wheel or Door?</h1>
          <p className="lead">
            Do you think there are more doors or wheels in the world?
          </p>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default App;
