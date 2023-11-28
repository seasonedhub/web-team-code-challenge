// Imports WindiCSS into our app
import "virtual:windi.css"

import { renderLayer } from "@typed/template/Render"
import { Effect, Layer } from "effect"
import { Live } from "./infrastructure"
import { TodoApp } from "./presentation"

TodoApp.pipe(
  renderLayer,
  Layer.use(Live()),
  Layer.launch,
  Effect.runFork
)
