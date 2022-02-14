<script lang="ts">
  import "../app.css"
  import { MetaTags } from "svelte-meta-tags"
</script>

<svelte:head>
  <link rel="icon" href={"../../static/favicon.png"} type="image/png" />
</svelte:head>
<MetaTags
  title="Todos"
  description="A Simple Todo App."
  openGraph={{
    title: "Todos",
    description: "A Simple Todo App.",
    images: [
      {
        url: "/favicon.png",
        width: 1024,
        height: 1024,
      },
    ],
    site_name: "todos",
  }}
/>

<main>
  <slot />
</main>
