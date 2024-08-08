<script>
    import Leaderboard from "$lib/components/Leaderboard.svelte";

    export let data;
</script>

<svelte:head>
    <title>{data.game.title} Leaderboards • Lighthouse</title>
    <meta name="description" content={`${data.game.title} Leaderboards for MCC Island • Lighthouse by SirArchibald`} />
    <link rel="icon" href="%sveltekit.assets%/favicon.png" type="image/png" />

    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script src="https://unpkg.com/tippy.js@6"></script>
</svelte:head>
<div class="flex flex-col mb-8 gap-y-8">
    {#if data.game}
        <div class="flex flex-col sm:flex-row gap-y-4 justify-between mt-6 mx-4 sm:mx-44">
            <a href="/leaderboards" class="px-3 border text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 duration-100 py-1 rounded-sm self-center">Go Back</a>
            <div class="flex flex-row gap-x-2 self-center flex-grow justify-center">
                <img src={data.game.icon} alt="Royal Reputation Icon" class="w-8 sm:w-12 h-8 sm:h-12 self-center" />
                <p class="text-center text-xl sm:text-3xl text-neutral-900 dark:text-neutral-100 font-semibold self-center">{data.game.title} Leaderboards</p>
            </div>
        </div>

        <div class="flex flex-col mb-8 gap-y-8">
            <div class="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8 mx-4 sm:mx-24 md:mx-4 lg:mx-32">
                {#each data.game.boards as board}
                    <Leaderboard name={board.name} stat={board.stat} display={board.display || null} ratio={board.ratio || null} icon={board.icon || null} title={board.tooltip} f2p={board.f2p}
                        players={board.f2p ? 
                            data.players.filter(p => !p.player.ranks.includes("CHAMP") && !p.player.ranks.includes("GRAND_CHAMP") && !p.player.ranks.includes("GRAND_CHAMP_ROYALE") && !p.player.ranks.includes("NOXCREW"))
                            : data.players
                        }
                    />
                {/each}
            </div>
        </div>
    {:else}
        <div class="flex flex-row justify-center border border-neutral-300 dark:border-neutral-800 rounded-sm py-4 my-4">
            <p class="text-xl text-neutral-600 dark:text-neutral-400">Game not found!</p>
        </div>
    {/if}
</div>