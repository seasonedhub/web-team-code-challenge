# web-team-code-challenge

## Welcome!

This repo contains a [Effect](https://effect.website/)-based port of the popular [TodoMVC](https://todomvc.com)
application for comparing front-end frameworks together. These tools are used to build our web-based recruit 
dashboard, Tapas, which allows restaurant managers view and manage their store locations, admins, etc, and 
also has additional functionality for our internal support users.

In the next year this project will see a lot of new features and development, so it will be important you're 
comfortable with working in tools you may not be familiar with yet.

## Getting Started

```sh
# Install dependencies
pnpm install
# Start the development server
pnpm start
```

## Package Scripts

```sh
# Run the tests
pnpm test

# Typecheck
pnpm typecheck
# Typecheck in watch mode
pnpm typecheck:watch
```

## Challenge

While working in our FE projects, you will be jumping into existing projects with existing toolsets, architectures,
etc, which may be unfamiliar to you. This Todo App is designed in a similar way to Tapas and the goal is to evaluate
your ability to navigate these spaces.

Using the power of the internet, and any help you need from your interviewer, complete as much of the 
following as time permits:

### 1. Toggle a Todo as Completed

We can create a Todo and delete them, but we'd also like to mark them as completed so we get that dopamine boost.

- Implement a domain service for toggling a Todo as completed
- Implement an application service for toggling a Todo in the TodoList as completed
- Implement a checkbox UI for interacting with this application service
- Implement any tests

### 2. Toggle all todos as completed

Toggling one Todo was great, but lets allow doing it in bulk.

- Implement a domain service for toggling all todos as completed
- Implement an application service for applying this service to our TodoList
- Implement a checkbox UI for interaction with this application service
- Implement any tests

### 3. Clear completed todos

Eventually our todo list will get cluttered with completed todos. We should be able to clear out 
all of them in one go.

- Implement a domain service for clearing all of the completed Todos
- Implement an application service for clearing all completed Todos from the TodoList
- Implement a "Clear all completed" button for utilizing the feature from the UI
  - Should only be visible if there are completed todos
- Implement any tests

### 4. Save and restore state from localStorage

Right now our application only works in-memory, this is not too helpful unless you keep the same
browser tab open for long periods of time. Let's add persistence to localStorage.

- Extend our Infrastructure to support persistence of our TodoList.
- Write any tests

### 5. Edit a Todo

Right now our todo's are entirely static after creation. We'd like to be able to edit our todos after the fact.

- When double-clicking a todo, toggle an editing state with an input.
- Pressing "Enter" key should save any updates
- Pressing "Escape" key should cancel any updates
- Write any tests


## Resources

- [Effect documentation](https://effect.website)
- [Typed documentation](https://tylors.github.io/typed)
- [WindiCSS documentation](https://windicss.org/)
- [Todo MVC](https://todomvc.com)
