<script>
    import { onMount } from "svelte";
    import { pb } from "../../pocketbase";
    import LoadingCover from "../../components/LoadingCover.svelte";
    import { route } from "sv-router/generated";

    let src = $state("");
    let username = $state("");

    onMount(async () => {
        // @ts-ignore
        const prj = await $pb.collection("projects").getOne(route.params.id, { expand: "owner" });
        username = prj.expand?.owner.name;
        src =
            "/tw/embed.html?" +
            new URLSearchParams({
                project_url: $pb.files.getURL(prj, prj.file),
                addons: "pause",
                autoplay: "",
            });
    });
</script>

<main>
    {#if src}
        <h3>{username}</h3>
        <iframe
            {src}
            frameborder="0"
            title="Project player"
            allowtransparency={true}
            scrolling="no"
            allowfullscreen
            style="color-scheme: auto"
        ></iframe>
    {:else}
        <LoadingCover />
    {/if}
</main>

<style lang="scss">
    main {
        height: calc(100vh - 40px);
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 24px auto 0;
        position: relative;
    }

    iframe {
        max-width: 100%;
        max-height: 80vh;
        aspect-ratio: 482/412;
    }

    h3 {
        position: absolute;
        top: -6px;
    }
</style>
