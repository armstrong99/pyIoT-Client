import React, { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
import blade from "./blade.png";
import circ from "./cir.png";

const endPoint = "http://192.168.199.244:8060";
const IoT = io.connect(`${endPoint}`);

function App() {
  const [anim, setAnim] = useState("");
  const [msgX, setMsg] = useState("");

  useEffect(() => {
    getMsg();
  }, []);

  const getMsg = () => {
    IoT.on("iotRecive", (msg) => {
      vibrate();
      setMsg(msg);
    });
  };

  const vibrate = () => {
    setAnim("App-logo");
    window.navigator.vibrate([1000, 500, 1000, 500, 2000]);
    setTimeout(() => {
      setAnim("");
    }, 5000);
  };
  return (
    <>
      <div className="App-header">
        <img src={anim.length ? blade : circ} alt="circuit" className={anim} />
        <h3 style={{ color: "black", fontFamily: "cursive" }}>
          {" "}
          t = 1.1 * R * C{" "}
        </h3>
        <button
          onClick={() => {
            IoT.emit("iotInit", 10);
          }}
          style={
            anim.length
              ? { background: "#de5246 ", cursor: "pointer" }
              : { background: "rgb(19, 0, 71)", cursor: "pointer" }
          }
          disabled={anim.length ? true : false}
        >
          {!anim.length ? "Send Signal" : <i>Oscillating...</i>}
        </button>
      </div>
    </>
  );
}

export default App;
