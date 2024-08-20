<script>
    import Menu from "$lib/svgs/Menu.svelte";
    import Globe from "$lib/svgs/Globe.svelte";
    import Gift from "$lib/svgs/Gift.svelte";
    import CompareArrows from "$lib/svgs/CompareArrows.svelte";
    import { fade } from "svelte/transition";

    let menuOpen = false;
    function toggleMenu() { menuOpen = !menuOpen; }

    import { onMount } from "svelte";
	import { Duration } from "luxon";
    onMount(() => {
        document.addEventListener("click", (event) => {
            if (!event.target.closest(".relative")) {
                menuOpen = false;
            }
        });
    });
</script>

<div class="relative">
    <button on:click={toggleMenu} class="flex px-2 py-1.5 rounded-md bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-300 dark:hover:bg-neutral-800 shadow-xl duration-100">
        <span class="h-full w-7 self-center"><Menu /></span>
    </button>
    <div transition:fade={{ duration: 200 }} class={`${menuOpen ? "" : "hidden"} transition ease-out duration-200 absolute left-1/2 z-10 flex w-screen max-w-max -translate-x-1/2 translate-y-3 px-4`}>
        <div class="flex flex-col gap-y-2 text-neutral-900 dark:text-neutral-100 rounded-md bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2 text-smshadow-lg">
            <a on:click={toggleMenu} href="/leaderboards" class="flex flex-row gap-x-2 font-semibold hover:bg-neutral-300 dark:hover:bg-neutral-700 duration-100 px-3 py-2 rounded-md">
                <span class="h-6 w-6 self-center"><Globe /></span><span class="self-center">Leaderboards</span>
            </a>
            <a on:click={toggleMenu} href="/simulator" class="flex flex-row gap-x-2 font-semibold hover:bg-neutral-300 dark:hover:bg-neutral-700 duration-100 px-3 py-2 rounded-md">
                <span class="h-6 w-6 self-center"><Gift /></span><span class="self-center">Openable Simulator</span>
            </a>
            <p class="flex flex-row gap-x-2 font-semibold duration-100 px-3 py-2 rounded-md">
                <span class="h-6 w-6 self-center"><CompareArrows /></span><span class="self-center">Compare</span><span class="px-3 py-1 bg-neutral-300 dark:bg-neutral-700 rounded-full">Coming soon</span>
            </p>
        </div>
    </div>
</div>