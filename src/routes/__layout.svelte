<script lang="ts">
  import "../app.css"
</script>

<svelte:head>
  <title>Todos</title>
  <link rel="icon" href={"../../static/favicon.png"} type="image/png" />
  <meta property="og:title" content="Todos" />
	<meta property="og:description" content="A Simple Todo App">
  <meta property="og:image" content="/favicon.png" />
  <meta name="keywords" content="todo,svelte" />
  <meta name="description" content="A Simple Todo App" />
</svelte:head>

<main>
  <slot />
</main>
