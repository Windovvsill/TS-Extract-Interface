<script>
  import { listen } from "svelte/internal";
  import { CompletionItem } from "vscode";
  import Field from "./components/Field.svelte";
  import Object from "./components/Object.svelte";

  // export let name;
  // added in call here
  vscode.postMessage({
    type: "apitest",
    payload: selection,
  });

  // const ff = (jsonString) => {
  //   const obj = JSON.parse(jsonString);
  //   const lis = Object.keys(obj).map((key) => {
  //     if (typeof obj[key] === "object") {
  //       return `<Field>${key}</Field><Field>${ff(
  //         JSON.stringify(obj[key])
  //       )}</Field>`;
  //     } else {
  //       return `<Field keyText={"${key}""}></Field>`;
  //     }
  //   });

  //   return `<ul>${lis.join(" ")}</ul>`;
  // };

  // const gg = (jsonString) => {
  //   const obj = JSON.parse(jsonString);
  //   const list = Object.keys(obj).map((key) => {
  //     return `<Field keyText={"${key}"} valueText="vlu" />`;
  //   });

  //   return `<div>${list.join(" ")}</div>`;
  // };
</script>

<style>
  main {
    /* text-align: center; */
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

​
<main>
  <!-- svelte-ignore missing-declaration -->
  <p>Hello {JSON.stringify(JSON.parse(selection))}</p>
  <!-- svelte-ignore missing-declaration -->

  <p>{`interface ISomething`}</p>
  <Object obj={JSON.parse(selection)} />
  <!-- {#each Object.entries(JSON.parse(selection)) as item}
    {#if typeof item[1] === 'object'}
      {#each Object.entries(item[0]) as item}
        <Field inset keyText={item[0]} valueText={item[1]} />
      {/each}
    {:else}
      <Field keyText={item[0]} valueText={item[1]} />
    {/if}
  {/each} -->
  <!-- <p>{`}`}</p> -->
</main>
