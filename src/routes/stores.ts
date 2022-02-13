import {writable} from "svelte/store"

export type Todo = {
  id: number
  todo: string
  completed: boolean
}

const stored = localStorage.todos

export const todos = writable<Todo[]>(stored ? JSON.parse(stored) : [])

todos.subscribe((value) => (localStorage.todos = JSON.stringify(value)))
