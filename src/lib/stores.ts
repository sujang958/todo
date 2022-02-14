import { browser } from "$app/env"
import { auth, db } from "$lib/firebase"
import type { User } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { writable } from "svelte/store"

export type Todo = {
  todo: string
  completed: boolean
}

export const todos = writable<{ [key: string]: Todo }>(
  (browser && JSON.parse(localStorage.getItem("todos"))) || {}
)

todos.subscribe(
  (value) =>
    browser &&
    localStorage.setItem(
      "todos",
      JSON.stringify(
        Object.fromEntries(Object.entries(value).filter((v) => v[1]))
      )
    )
)
todos.subscribe((todos) => {
  if (!auth.currentUser) return
  setDoc(
    doc(db, "users", auth.currentUser.email),
    {
      todos,
    },
    { merge: true }
  )
})

export const user = writable<{
  signedIn: boolean
  currentUser: User | null
}>({
  signedIn: auth.currentUser ? true : false,
  currentUser: auth.currentUser ?? null,
})

user.subscribe(async ({ currentUser }) => {
  if (currentUser) {
    const userDoc = await getDoc(doc(db, "users", auth.currentUser.email))
    if (!userDoc.exists()) return
    const data = userDoc.data()
    if (!data.todos) return
    todos.update((prev) => {
      return {
        ...prev,
        ...Object.fromEntries(
          Object.entries(data.todos)
            .map(([id, todo]) => (prev[id] ? [id, prev[id]] : [id, todo]))
            .filter((v) => v && v[1])
        ),
      }
    })
  }
})