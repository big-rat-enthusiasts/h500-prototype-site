<script>
    import { pb, updateLoggedIn } from "../pocketbase.js";
    import { navigate } from "sv-router/generated";

    /** @type {string} */
    let username;
    /** @type {string} */
    let password;

    /** @param {SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }} event */
    async function login(event) {
        event.preventDefault();

        try {
            await $pb.collection("users").authWithPassword(username, password);
            updateLoggedIn();
            navigate("/");
        } catch (error) {
            console.error(error);
            // @ts-ignore
            alert(error.message);
        }
    }
</script>

<form onsubmit={event => login(event)}>
    <h1>log in</h1>
    <input type="text" placeholder="username" required bind:value={username} />
    <input type="password" placeholder="password" required bind:value={password} />
    <button type="submit">log in</button>
</form>

<style lang="scss">
    form {
        display: flex;
        flex-direction: column;
        gap: 8px;

        margin: 24px auto;
        max-width: 320px;
    }
</style>
