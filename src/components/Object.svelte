<script>
  import Field from "./Field.svelte";

  export let obj;
</script>

<style>
  div {
    padding: 0 0 0 2em;
    margin: 0;
  }
  p {
    margin: 0;
  }
</style>

​
<div>
  <p>{`{`}</p>
  {#each Object.entries(obj) as entry}
    {#if typeof entry[1] === 'object'}
      <Field keyText={entry[0]} />
      <svelte:self obj={entry[1]} />
    {:else}
      <Field keyText={entry[0]} valueText={entry[1]} />
    {/if}
  {/each}
  <p>{`}`}</p>
</div>
