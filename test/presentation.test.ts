import { testRender } from "@typed/template/Test"
import * as Vitest from "@typed/template/Vitest"
import { ok } from "assert"
import { Effect, TestClock } from "effect"
import { describe, expect } from "vitest"
import * as App from "../src/application"
import * as Infra from "../src/infrastructure"
import { TodoApp } from "../src/presentation"

describe("TodoApp | presentation", () => {
  Vitest.test("renders Todos", () =>
    Effect.gen(function*(_) {
      const { elementRef, window } = yield* _(testRender(TodoApp))
      const [todoList] = yield* _(elementRef.query(".todo-list"))

      ok(todoList instanceof window.HTMLElement)

      expect(todoList.children.length).toBe(0)

      yield* _(App.TodoText.set("foobar"))
      yield* _(App.createTodo)

      // Simulate time passing
      yield* _(TestClock.adjust(1))

      expect(todoList.children.length).toBe(1)
    }).pipe(
      Effect.provide(Infra.Test(new URL("https://localhost/")))
    ))
})
