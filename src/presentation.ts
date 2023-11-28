import "./styles.css"

import * as Fx from "@typed/fx/Fx"
import type * as RefSubject from "@typed/fx/RefSubject"
import * as EventHandler from "@typed/template/EventHandler"
import { many } from "@typed/template/Many"
import { html } from "@typed/template/RenderTemplate"
import { Link } from "@typed/ui/Link"
import * as App from "./application"
import * as Domain from "./domain"
import * as Infra from "./infrastructure"

export const TodoApp = html`<section class="todoapp ${App.FilterState}">
  <header class="header">
    <h1>todos</h1>
    <form class="add-todo" onsubmit=${EventHandler.preventDefault(() => App.createTodo)}>
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        .value="${App.TodoText}"
        oninput="${EventHandler.target<HTMLInputElement>()((ev) => App.TodoText.set(ev.target.value))}"
      />
    </form>
  </header>

  <section class="main">
    <ul class="todo-list">
      ${many(App.Todos, (todo) => todo.id, TodoItem)}
    </ul>

    <footer class="footer">
      <span class="todo-count">
        ${App.ActiveCount} item${App.ActiveCount.map((c) => (c === 1 ? "" : "s"))} left
      </span>

      <ul class="filters">
        ${Object.values(Domain.FilterState).map(FilterLink)}
      </ul>
    </footer>
  </section>
</section>`

function TodoItem(todo: RefSubject.RefSubject<never, never, Domain.Todo>, id: Domain.TodoId) {
  // eslint-disable-next-line require-yield
  return Fx.genScoped(function*(_) {
    const text = todo.map((t) => t.text)

    return html`<li>
      <div class="view">
        <label>${text}</label>

        <button class="destroy" onclick="${App.deleteTodo(id)}"></button>
      </div>
    </li>`
  })
}

function FilterLink(filterState: Domain.FilterState) {
  return html`<li>
    ${
    Link(
      {
        className: Fx.when(App.FilterState.map((state) => state === filterState), "selected", ""),
        to: Infra.filterStateToPath(filterState)
      },
      filterState
    )
  }
  </li>`
}
