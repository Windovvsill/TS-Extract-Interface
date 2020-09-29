<script>
  export let options;
  /**
   * some kind of connectivity score
   *
   * when people drop from top to average, run 3-4
   * different campaigns to recall them
   *
   * run 3-4 ideas to try to get lurkers and
   * lowly connected users to elevate.
   *
   *
   */
  export let checked;
  const makeChecked = (item) => {
    checked = item;
  };
</script>

<style>
  button.checked {
    background-color: forestgreen;
  }
</style>

{#each options as item}
  {#if item === checked}
    <button class="checked" on:click={() => makeChecked(item)}>{item}</button>
  {:else}<button on:click={() => makeChecked(item)}>{item}</button>{/if}
{/each}
