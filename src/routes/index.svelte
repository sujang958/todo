<script lang="ts">
  import TodoItem from "$lib/todoItem.svelte"
  import {todos} from "./stores"

  let todoInputValue: string = ""
  const addTodo = () => {
    const random = Math.random()
    if ($todos.findIndex((t) => t.id === random) <= -1) {
      $todos = [...$todos, {id: random, todo: todoInputValue, completed: false}]
      todoInputValue = ""
    } else {
      addTodo()
    }
  }
</script>

{#if todos}
  <div
    class="flex flex-col min-h-screen min-w-full items-center justify-center"
  >
    <div
      class="flex flex-col rounded shadow-xl max-w-sm md:max-w-4xl w-full py-2"
    >
      <div
        class="flex flex-row items-center justify-stretch border-b border-slate-200 w-full pr-2 md:pr-4 overflow-hidden"
      >
        <div class="flex-1">
          <input
            bind:value={todoInputValue}
            on:keypress={({key}) => {
              if (key === "Enter") addTodo()
            }}
            type="text"
            placeholder="Add some todos"
            class="placeholder-slate-400 text-3xl md:text-4xl font-thin px-2 md:px-4 py-3 focus:outline-none w-full h-full"
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
        {#if $todos.length <= 0}
          <div
            class="flex flex-col w-full h-full items-center justify-center -mt-4"
          >
            <p class="text-4xl font-thin">"Have a nice day :)"</p>
          </div>
        {:else}
          {#each $todos as t, i (t.id)}
            <TodoItem
              todoContent={t.todo}
              bind:isCompleted={t.completed}
              handleRemove={() =>
                todos.update((prev) => {
                  delete prev[i]
                  return [...prev.filter((v) => v)]
                })}
            />
          {/each}
        {/if}
      </div>
    </div>
  </div>
{/if}
