import * as Schema from "@effect/schema/Schema"
import type { Brand } from "effect"

export { Brand }

/* #region Model */

export const TodoId: Schema.BrandSchema<string, string & Brand.Brand<"TodoId">> = Schema.string.pipe(
  Schema.brand("TodoId")
)
export type TodoId = Schema.Schema.To<typeof TodoId>

export const Todo = Schema.struct({
  id: TodoId,
  text: Schema.string,
  completed: Schema.boolean,
  timestamp: Schema.dateFromString(Schema.string)
})
export interface TodoJson extends Schema.Schema.From<typeof Todo> {}
export interface Todo extends Schema.Schema.To<typeof Todo> {}

export const TodoList = Schema.array(Todo)
export interface TodoListJson extends Schema.Schema.From<typeof TodoList> {}
export interface TodoList extends Schema.Schema.To<typeof TodoList> {}

export enum FilterState {
  All = "all",
  Active = "active",
  Completed = "completed"
}

/* #endregion */

/* #region Services */

export function updateTodo(list: TodoList, id: TodoId, f: (todo: Todo) => Todo): TodoList {
  return list.map((todo) => (todo.id === id ? f(todo) : todo))
}

export function editText(id: TodoId, text: string) {
  return (list: TodoList): TodoList => updateTodo(list, id, (todo) => ({ ...todo, text }))
}

export function isCompleted(todo: Todo): boolean {
  return todo.completed
}

export function isActive(todo: Todo): boolean {
  return !todo.completed
}

export function deleteTodo(id: TodoId) {
  return (list: TodoList): TodoList => list.filter((todo) => todo.id !== id)
}

export function activeCount(list: TodoList): number {
  return list.filter(isActive).length
}

export function completedCount(list: TodoList): number {
  return list.filter(isCompleted).length
}

export function filterTodoList({ list, state }: { list: TodoList; state: FilterState }): TodoList {
  switch (state) {
    case FilterState.All:
      return list
    case FilterState.Active:
      return list.filter(isActive)
    case FilterState.Completed:
      return list.filter(isCompleted)
  }
}

export function updateText(text: string) {
  return (todo: Todo): Todo => ({ ...todo, text })
}

/* #endregion */
