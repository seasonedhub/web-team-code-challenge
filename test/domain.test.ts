import { describe, expect, it } from "vitest"

import { pipe } from "effect/Function"
import type { Todo } from "../src/domain"
import {
  activeCount,
  completedCount,
  deleteTodo,
  editText,
  FilterState,
  filterTodoList,
  isActive,
  isCompleted,
  TodoId,
  updateText,
  updateTodo
} from "../src/domain"

describe("TodoApp | domain", () => {
  it(updateTodo, () => {
    const todos = [makeTodo(), makeTodo()]
    const toEdit = todos[0]
    const updated = updateTodo(todos, toEdit.id, (t) => ({ ...t, text: "example" }))

    expect(updated).toEqual([
      { ...toEdit, text: "example" },
      todos[1]
    ])
  })

  it(updateText, () => {
    const todo = pipe(makeTodo(), updateText("test"))

    expect(todo.text).toEqual("test")
  })

  it(editText, () => {
    const todos = [makeTodo(), makeTodo()]
    const toEdit = todos[1]
    const updated = pipe(todos, editText(toEdit.id, "asdf"))

    expect(updated).toEqual([
      todos[0],
      { ...toEdit, text: "asdf" }
    ])
  })

  it(isActive, () => {
    expect(isActive(makeTodo({ completed: false }))).toBe(true)
    expect(isActive(makeTodo({ completed: true }))).toBe(false)
  })

  it(isCompleted, () => {
    expect(isCompleted(makeTodo({ completed: false }))).toBe(false)
    expect(isCompleted(makeTodo({ completed: true }))).toBe(true)
  })

  it(deleteTodo, () => {
    const todos = [makeTodo(), makeTodo(), makeTodo()]
    const toDelete = todos[1]
    const updated = pipe(todos, deleteTodo(toDelete.id))

    expect(updated).toEqual([
      todos[0],
      todos[2]
    ])
  })

  it(activeCount, () => {
    const todos = [makeTodo({ completed: true }), makeTodo({ completed: false }), makeTodo({ completed: true })]

    expect(activeCount(todos)).toEqual(1)
  })

  it(completedCount, () => {
    const todos = [makeTodo({ completed: true }), makeTodo({ completed: false }), makeTodo({ completed: true })]

    expect(completedCount(todos)).toEqual(2)
  })

  it(filterTodoList, () => {
    const todos = [makeTodo({ completed: true }), makeTodo({ completed: false }), makeTodo({ completed: true })]

    expect(filterTodoList({ list: todos, state: FilterState.All })).toEqual(todos)
    expect(filterTodoList({ list: todos, state: FilterState.Active })).toEqual([todos[1]])
    expect(filterTodoList({ list: todos, state: FilterState.Completed })).toEqual([todos[0], todos[2]])
  })
})

function makeTodo(overrides: Partial<Todo> = {}): Todo {
  return {
    id: TodoId(`test-id-${Math.random().toString(16)}`),
    text: Array.from({ length: Math.random() * 12 }, (_, i) => i.toString(16)).join(""),
    completed: false,
    timestamp: new Date(),
    ...overrides
  }
}
