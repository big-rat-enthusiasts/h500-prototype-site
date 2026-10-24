<script>
    import { pb, isLoggedIn, updateLoggedIn, user } from "../pocketbase.js";
    import { navigate } from "sv-router/generated";
    import bigRat from "../assets/bigrat.jpg";
</script>

<nav>
    <a href="/">
        <img src={bigRat} alt="" />
        h500 prototype
    </a>

    <div>
        {#if $isLoggedIn}
            <span>{$user?.name}</span>
            <button
                onclick={() => {
                    $pb.authStore.clear();
                    updateLoggedIn();
                    navigate("/");
                }}>log out</button
            >
        {:else}
            <a href="/login">log in</a>
        {/if}
    </div>
</nav>

<style lang="scss">
    nav {
        display: flex;
        width: calc(100% - 16px);
        justify-content: space-between;
        align-items: center;
        background: #444;
        padding: 8px;
        height: 24px;

        > * {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
        }

        img {
            max-height: 24px;
        }
    }
</style>
