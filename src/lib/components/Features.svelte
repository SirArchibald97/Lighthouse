<script>
    import LineGraph from "$lib/svgs/LineGraph.svelte";
    import Globe from "$lib/svgs/Globe.svelte";
    import CompareArrows from "$lib/svgs/CompareArrows.svelte";
    import Gift from "$lib/svgs/Gift.svelte";
</script>

<div class="flex flex-col px-4 sm:px-24 2xl:px-96 py-8 pb-4 sm:pb-12">
    <p class="text-slate-800 dark:text-slate-200 text-2xl sm:text-3xl pb-4 text-center font-semibold">Features</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <a href="/leaderboards" class="flex flex-col gap-y-2 border border-neutral-300 dark:border-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-800 duration-100 p-3 rounded-md text-neutral-900 dark:text-neutral-100">
            <div class="flex flex-row gap-4">
                <span class="w-12 h-12"><Globe /></span>
            </div>
            <p class="text-2xl font-semibold">Leaderboards</p>
            <p class="text-lg">View where you place on the global leaderboards in a huge selection of game stats, badges and more!</p>
        </a>

        <a href="/simulator" class="flex flex-col gap-y-2 border border-neutral-300 dark:border-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-800 duration-100 p-3 rounded-md text-neutral-900 dark:text-neutral-100">
            <div class="flex flex-row gap-4">
                <span class="w-12 h-12"><Gift /></span>
                <span class="self-center py-1 px-3 rounded-full text-neutral-900 bg-green-200 border-1 border-green-300">New</span>
            </div>            
            <p class="text-2xl font-semibold">Openable Simulator</p>
            <p class="text-lg">Let your gambling urges run wild and simulate the opening of up to 1000s of crates and chests!</p>
        </a>

        <div href="/" class="flex flex-col gap-y-2 border border-neutral-300 dark:border-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-800 duration-100 p-3 rounded-md text-neutral-900 dark:text-neutral-100">
            <div class="flex flex-row gap-4">
                <span class="w-12 h-12"><LineGraph /></span>
                <span class="self-center py-1 px-3 rounded-full text-neutral-900 bg-yellow-200 border-1 border-yellow-300">Coming Soon</span>
            </div>
            <p class="text-2xl font-semibold">Stat Tracking</p>
            <p class="text-lg">Track how your stats have changed over time across every gamemode!</p>
        </div>

        <div href="/" class="flex flex-col gap-y-2 border border-neutral-300 dark:border-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-800 duration-100 p-3 rounded-md text-neutral-900 dark:text-neutral-100">
            <div class="flex flex-row gap-4">
                <span class="w-12 h-12"><CompareArrows /></span>
                <span class="self-center py-1 px-3 rounded-full text-neutral-900 bg-yellow-200 border-1 border-yellow-300">Coming Soon</span>
            </div>            
            <p class="text-2xl font-semibold">Compare</p>
            <p class="text-lg">See how your stats match up against your friends and other players in a side-by-side!</p>
        </div>
    </div>
</div>