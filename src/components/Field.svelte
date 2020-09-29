<script>
  import Flex from "./Flex.svelte";
  import Toggle from "./Toggle.svelte";

  export let keyText;
  export let valueText;
  export let inset;
</script>

<style>
  p {
    border: 1px solid red;
    margin: 0;
  }
</style>

<Flex justify="start">
  {#if inset}
    <p>{'****'}</p>
  {/if}
  <p>{keyText}</p>
  <Toggle options={['?:', ':']} checked=":" />
  {#if valueText}
    <p>{typeof valueText}</p>
    <p>;</p>
  {/if}
</Flex>
