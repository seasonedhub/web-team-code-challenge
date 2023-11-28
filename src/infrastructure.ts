import { CurrentEnvironment } from "@typed/environment"
import * as Navigation from "@typed/navigation"
import * as Route from "@typed/route"
import * as Router from "@typed/router"
import * as RenderContext from "@typed/template/RenderContext"
import { Effect, Layer } from "effect"
import * as App from "./application"
import * as Domain from "./domain"

/* #region Routing */

const allRoute = Route.fromPath("/", {
  // Only matches exactly "/"
  match: { end: true }
})
const activeRoute = Route.fromPath("/active")
const completedRoute = Route.fromPath("/completed")

// Expose conversion to route for the UI
export const filterStateToPath = (state: Domain.FilterState) => {
  switch (state) {
    case Domain.FilterState.All:
      return allRoute.path
    case Domain.FilterState.Active:
      return activeRoute.path
    case Domain.FilterState.Completed:
      return completedRoute.path
  }
}

const currentFilterState = Router
  .to(allRoute, () => Domain.FilterState.All)
  .to(activeRoute, () => Domain.FilterState.Active)
  .to(completedRoute, () => Domain.FilterState.Completed)
  .redirect(allRoute, {})

/* #endregion */

/* #region Layers */

const ModelLive = Layer.mergeAll(
  // Ininialize our TodoList from storage
  App.TodoList.make(Effect.succeed([])),
  // Update our FilterState everytime the current path changes
  App.FilterState.make(currentFilterState),
  // Initialize our TodoText
  App.TodoText.of("")
)

const CreateTodoLive = App.CreateTodo.implement((text) =>
  // Create a new Todo with the provided text
  Effect.sync(() => ({
    id: Domain.TodoId(crypto.randomUUID()),
    text,
    completed: false,
    timestamp: new Date()
  }))
)

const AppLive = CreateTodoLive.pipe(
  Layer.useMerge(ModelLive)
)

export const Live = () =>
  AppLive
    .pipe(
      Layer.useMerge(Router.browser),
      Layer.useMerge(Navigation.fromWindow),
      Layer.useMerge(RenderContext.browser(window))
    )

export const Test = (url: URL) =>
  AppLive
    .pipe(
      Layer.useMerge(Router.server()),
      Layer.useMerge(Navigation.initialMemory({ url })),
      Layer.useMerge(RenderContext.RenderContext.scoped(
        RenderContext.make({ environment: "test" }, true)
      )),
      Layer.useMerge(CurrentEnvironment.layer("test"))
    )

/* #endregion */
