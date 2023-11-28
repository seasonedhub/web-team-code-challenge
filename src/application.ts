import * as Context from "@typed/context"
import * as Computed from "@typed/fx/Computed"
import * as RefArray from "@typed/fx/RefArray"
import * as RefSubject from "@typed/fx/RefSubject"
import * as Effect from "effect/Effect"
import { flow } from "effect/Function"
import * as Option from "effect/Option"

import * as Domain from "./domain"

export const CreateTodo = Context.Fn<(text: string) => Effect.Effect<never, never, Domain.Todo>>()("CreateTodo")
export type CreateTodo = Context.Fn.Context<typeof CreateTodo>

/* #endregion */

/* #region Model */

export const TodoList = RefSubject.tagged<Domain.TodoList>()("TodoList")
export type TodoList = RefSubject.Context<typeof TodoList>

export const FilterState = RefSubject.tagged<Domain.FilterState>()("FilterState")
export type FilterState = RefSubject.Context<typeof FilterState>

export const TodoText = RefSubject.tagged<string>()("TodoText")
export type TodoText = RefSubject.Context<typeof TodoText>

export const Todos: Computed.Computed<TodoList | FilterState, never, Domain.TodoList> = Computed.struct({
  list: TodoList,
  state: FilterState
})
  .map(Domain.filterTodoList)

export const ActiveCount: Computed.Computed<TodoList, never, number> = TodoList.map(Domain.activeCount)

/* #endregion */

/* #region Intent */

export const createTodo: Effect.Effect<CreateTodo | TodoList | TodoText, never, Option.Option<Domain.Todo>> = Effect
  .flatMap(TodoText, (text) =>
    Effect.if(text.trim() === "", {
      onFalse: CreateTodo.apply(text).pipe(
        Effect.tap((todo) => RefArray.prepend(TodoList, todo)),
        Effect.tap(() => TodoText.set("")),
        Effect.asSome
      ),
      onTrue: Effect.succeed(Option.none<Domain.Todo>())
    }))

export const deleteTodo: (id: Domain.TodoId) => Effect.Effect<TodoList, never, Domain.TodoList> = flow(
  Domain.deleteTodo,
  TodoList.update
)

/* #endregion */
