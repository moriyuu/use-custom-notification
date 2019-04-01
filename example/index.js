import React from "react";
import ReactDOM from "react-dom";
import { useCustomNotification } from "../src";

const App = () => {
  const { notify, notificationManager } = useCustomNotification();

  return (
    <div>
      <h1>use-custom-notification</h1>

      <button
        onClick={() =>
          notify({ type: "normal", timeout: 2000, children: "normal" })
        }
      >
        add normal
      </button>
      <button onClick={() => notify({ timeout: 3000, children: "success" })}>
        add success
      </button>
      <button onClick={() => notify({ type: "error", children: "error" })}>
        add error
      </button>

      {notificationManager}
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
