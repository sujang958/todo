<script lang="ts">
  import { flip } from "svelte/animate"
  import { slide } from "svelte/transition"
  import TodoItem from "$lib/todoItem.svelte"
  import { theme, todos, user } from "$lib/stores"
  import { auth, db, provider } from "$lib/firebase"
  import { signInWithPopup, signOut } from "firebase/auth"
  import { doc, setDoc, getDoc } from "firebase/firestore"
  import { v4 as uuid } from "uuid"
  import { browser } from "$app/env"

  let todoInputValue: string = ""

  const handleLogin = () => {
    $user = { ...$user }
    signInWithPopup(auth, provider)
      .then(async () => {
        const email = auth.currentUser.email
        if (!email) return
        const userRef = doc(db, "users", email)
        const prevUser = await getDoc(userRef)
        if (!prevUser.exists())
          await setDoc(
            userRef,
            {
              todos: [],
            },
            { merge: true }
          )
        $user = {
          ...$user,
          signedIn: true,
          currentUser: auth.currentUser,
        }
      })
      .catch(
        () =>
          ($user = {
            ...$user,

            signedIn: false,
            currentUser: null,
          })
      )
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(
        () =>
          ($user = {
            ...$user,
            signedIn: false,
            currentUser: null,
          })
      )
      .catch(() => ($user = { ...$user }))
  }

  const addTodo = () => {
    const random = uuid()
    if (!$todos[random]) {
      $todos = {
        ...$todos,
        [random]: { todo: todoInputValue, completed: false },
      }
      todoInputValue = ""
    } else {
      addTodo()
    }
  }

  const toggleTheme = () => {
    $theme = $theme === "dark" ? "light" : "dark"
  }

  $: if (browser) {
    if ($theme === "light") {
      document.body.classList.remove("dark")
    } else {
      document.body.classList.add("dark")
    }
  }
</script>

<div
  class="flex flex-col min-h-screen min-w-full items-center justify-center bg-white text-black dark:bg-slate-900 dark:text-white"
>
  <div class="flex flex-row space-x-2.5">
    {#if $user.signedIn}
      <p
        class="cursor-pointer text-lg dark:text-gray-200 text-gray-700 font-bold underline"
        on:click={handleSignOut}
      >
        Logout
      </p>
    {:else}
      <p
        class="cursor-pointer text-lg text-gray-700 font-bold underline"
        on:click={handleLogin}
      >
        Login
      </p>
    {/if}
    {#if theme}
      <p
        class="cursor-pointer text-lg dark:text-gray-200 text-gray-700 font-bold underline"
        on:click={toggleTheme}
      >
        dark
      </p>
    {/if}
  </div>
  {#if todos}
    <div
      class="flex flex-col rounded shadow-xl max-w-sm sm:max-w-lg md:max-w-4xl w-full py-2"
    >
      <div
        class="flex flex-row items-center justify-stretch border-b border-slate-200 dark:border-slate-700 w-full pr-3 md:pr-4 overflow-hidden dark:bg-gray-900"
      >
        <div class="flex-1">
          <input
            bind:value={todoInputValue}
            on:keypress={({ key }) => {
              if (key === "Enter") addTodo()
            }}
            type="text"
            placeholder="Add some todos"
            class="placeholder-slate-400 text-3xl md:text-4xl font-thin px-3 md:px-4 py-3 focus:outline-none w-full h-full dark:bg-gray-900"
          />
        </div>
        <div class="cursor-pointer">
          <svg
            on:click={addTodo}
            xmlns="http://www.w3.org/2000/svg"
            class="mt-1 h-10 w-10 md:h-12 md:w-12 transform hover:scale-110 duration-200"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div
        class="flex flex-col w-full pt-4 space-y-3 md:space-y-2 h-96 overflow-auto"
      >
        {#if Object.entries($todos).length <= 0}
          <div
            class="flex flex-col w-full h-full items-center justify-center -mt-4"
          >
            <p class="text-4xl font-thin">
              {#if $user.currentUser}
                "Hello {$user.currentUser.email}"
              {:else}
                "Have a ncie day :)"
              {/if}
            </p>
          </div>
        {:else}
          {#each Object.entries($todos) as [id, todo] (id)}
            <div in:slide animate:flip={{ duration: 200 }}>
              <TodoItem
                todoContent={todo.todo}
                bind:isCompleted={$todos[id].completed}
                handleRemove={() =>
                  todos.update((prev) => {
                    delete prev[id]
                    return {
                      ...Object.fromEntries(
                        Object.entries(prev).filter((v) => v && v[1])
                      ),
                    }
                  })}
              />
            </div>
          {/each}
        {/if}
      </div>
    </div>
  {/if}
</div>
