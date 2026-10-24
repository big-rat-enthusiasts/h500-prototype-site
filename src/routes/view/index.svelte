<script>
    import LoadingCover from "../../components/LoadingCover.svelte";
    import { onMount } from "svelte";
    import { pb } from "../../pocketbase.js";

    let loading = $state(true);
    /** @type {import("pocketbase").RecordModel[]} */
    let projects = $state([]);

    onMount(async () => {
        projects = (await $pb.collection("projects").getList(1, 200, {
            expand: "owner",
        })).items;

        loading = false;
    });
</script>

{#if loading}
    <LoadingCover />
{/if}

<main>
    <h2>browse projects</h2>
    <ul>
        {#each projects as project (project.id)}
            <li>
                <a href="/view/{project.id}">{project.expand?.owner.name}</a>
            </li>
        {/each}
    </ul>
</main>

<style lang="scss">
    main {
        margin: 24px;
    }
</style>
