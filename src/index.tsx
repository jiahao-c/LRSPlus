import * as React from "react";
import { render } from "react-dom";

import { App } from "./App";

(async () => {
  const req = await fetch("./result.json")
  const json = await req.json()
  render(<App courses={json.courses} />, document.getElementById("app"))
})()
