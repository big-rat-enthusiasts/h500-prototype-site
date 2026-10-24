<script>
    import { isLoggedIn, pb, user } from "../pocketbase.js";
    import { onMount } from "svelte";
    import LoadingCover from "../components/LoadingCover.svelte";
    import { navigate } from "sv-router/generated";

    const coll = $pb.collection("projects");

    if (!$isLoggedIn) {
        navigate("/login");
    }

    /** @type {HTMLIFrameElement} */
    let frame;
    /** @type {any} */
    let vm;
    let status = $state("loading");
    let canSave = $state(false);
    let loading = $state(true);
    let saving = $state(false);
    /** @type {import("pocketbase").RecordModel | null} */
    let prj = null;

    function waitForVM() {
        return new Promise(resolve => {
            const check = () => {
                // @ts-ignore
                const vm = frame?.contentWindow?.vm;
                if (vm && vm.editingTarget) resolve(vm);
                else setTimeout(check, 100);
            };

            check();
        });
    }

    async function load() {
        let created = false;
        // change to add multiple projects
        if (prj === null) {
            try {
                prj = await coll.getFirstListItem(`owner='${$user?.id}'`);
                console.log(prj);
            } catch (error) {
                // @ts-ignore
                if (error.status !== 404) throw error;

                const file = await fetch("/template.sb3");
                prj = await coll.create({
                    owner: $user?.id,
                    file: new File([await file.blob()], "project.sb3", { type: "appliation/x.scratch.sb3" }),
                });

                console.log(prj);
                created = true;
            }
        }

        console.assert(prj !== null);
        if (prj === null) return;

        const res = await frame.contentWindow?.fetch($pb.files.getURL(prj, prj.file));
        if (res?.ok) await vm.loadProject(await res.arrayBuffer());

        status = created ? "created project" : "loaded";
    }

    async function save() {
        if (saving) return;
        if (!$isLoggedIn) {
            console.error("can't save: not logged in");
            return;
        }
        if (prj === null) {
            console.error("can't save: project not created yet");
            return;
        }

        status = "saving...";
        saving = true;
        canSave = false;

        console.log(prj.id);
        const blob = await vm.saveProjectSb3();
        await coll.update(prj.id, {
            owner: $user?.id,
            file: new File([blob], "project.sb3", { type: "appliation/x.scratch.sb3" }),
        });

        status = "saved " + new Date().toLocaleTimeString();
        canSave = false;
        saving = false;

    }

    onMount(async () => {
        vm = await waitForVM();

        status = "loading";
        try {
            await load();
        } catch (error) {
            console.error(error);
            alert("error while loading, check console");
        }

        loading = false;

        /** @type {number | undefined} */
        let timer;
        vm.on("PROJECT_CHANGED", () => {
            status = "unsaved changes";
            canSave = true;
            clearTimeout(timer);
            timer = setTimeout(save, 2000);
        })
    });
</script>

{#if loading}
    <LoadingCover />
{/if}

<span>
    {status}
    {#if canSave}
        <button onclick={save}>save</button>
    {/if}
</span>
<iframe bind:this={frame} src="/tw/editor.html" title="Editor" allowtransparency={true} allowfullscreen></iframe>

<style>
    iframe {
        width: 100%;
        height: calc(100vh - 44px);
        border: none;
    }

    span {
        position: fixed;
        top: calc(24px + 16px + 14px);
        right: 200px;
        text-align: center;
    }
</style>
