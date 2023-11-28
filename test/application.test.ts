import { ok } from "assert"
import { Effect, Option } from "effect"
import { describe, expect, it } from "vitest"
import * as App from "../src/application"
import * as Domain from "../src/domain"

describe("TodoApp | application", () => {
  describe("createTodo", () => {
    describe("given empty TodoText", () => {
      it("returns Option.None", async () => {
        const test = Effect.gen(function*(_) {
          const option = yield* _(App.createTodo)
          expect(Option.isNone(option)).toBe(true)
        }).pipe(
          Effect.provide(App.TodoText.of("")),
          Effect.provide(App.CreateTodo.implement((text) => Effect.succeed(makeTodo({ text })))),
          Effect.provide(App.TodoList.of([]))
        )

        await Effect.runPromise(test)
      })
    })

    describe("given non-empty TodoText", () => {
      it("returns Option.Some", async () => {
        const test = Effect.gen(function*(_) {
          const option = yield* _(App.createTodo)

          ok(Option.isSome(option))

          const todo = option.value

          expect(todo.text).toEqual("hello")

          expect(yield* _(App.TodoList)).toEqual([todo])
          expect(yield* _(App.TodoText)).toEqual("")
        }).pipe(
          Effect.provide(App.TodoText.of("hello")),
          Effect.provide(App.CreateTodo.implement((text) => Effect.succeed(makeTodo({ text })))),
          Effect.provide(App.TodoList.of([]))
        )

        await Effect.runPromise(test)
      })
    })
  })
})

function makeTodo(overrides: Partial<Domain.Todo> = {}): Domain.Todo {
  return {
    id: Domain.TodoId(`test-id-${Math.random().toString(16)}`),
    text: Array.from({ length: Math.random() * 12 }, (_, i) => i.toString(16)).join(""),
    completed: false,
    timestamp: new Date(),
    ...overrides
  }
}
