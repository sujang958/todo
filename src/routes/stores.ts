import {browser} from "$app/env"
import {writable} from "svelte/store"

export type Todo = {
  id: number
  todo: string
  completed: boolean
}

export const todos = writable<Todo[]>(
  (browser && JSON.parse(localStorage.getItem("todos"))) || []
)

todos.subscribe(
  (value) => browser && localStorage.setItem("todos", JSON.stringify(value))
)
