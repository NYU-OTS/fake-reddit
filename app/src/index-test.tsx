import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import Home from "./containers/Home/Home";
import store from "./store";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <Home />
      </HashRouter>
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
