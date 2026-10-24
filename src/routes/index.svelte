<script>
    import { user, isLoggedIn } from "../pocketbase.js";
</script>

<main>
    <h1>hackingtons 500 prototype editor</h1>
    <p>this is a prototype, things may break.</p>

    {#if $isLoggedIn}
        <h2>Welcome, {$user?.name}!</h2>
        <p>
            <a href="/edit">edit your project</a>
        </p>
    {:else}
        <p>
            <a href="/login">log in</a>
        </p>
    {/if}

    <p>
        <a href="/view">browse projects</a>
    </p>
</main>

<style lang="scss">
    main {
        margin: 24px;
    }
</style>
