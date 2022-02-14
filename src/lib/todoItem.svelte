<script lang="ts">
  import { fly } from "svelte/transition"
  export let todoContent: string = ""
  export let isCompleted: boolean = false
  export let handleRemove: () => void | any
</script>

<div
  class="flex flex-row items-center w-full px-2.5 py-1"
  in:fly={{ y: 30, duration: 200 }}
  out:fly={{ y: -30, duration: 100 }}
>
  <div class="px-3.5">
    <input
      type="checkbox"
      class="w-7 h-7 md:w-8 md:h-8"
      bind:checked={isCompleted}
    />
  </div>
  <div class="flex-1 px-1.5 -mt-2 md:-mt-1.5">
    <p
      class={`${
        isCompleted && "line-through"
      } text-black text-2xl font-thin break-all`}
    >
      {todoContent}
    </p>
  </div>
  <div class="px-3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="hover:fill-red-500 h-7 w-7 duration-500 -mt-0 md:-mt-0.5"
      viewBox="0 0 20 20"
      fill="currentColor"
      on:click={handleRemove}
    >
      <path
        fill-rule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
</div>
