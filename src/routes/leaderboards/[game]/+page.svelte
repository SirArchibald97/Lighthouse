<script>
    import Leaderboard from "$lib/components/Leaderboard.svelte";
	import NumberedList from "$lib/svgs/NumberedList.svelte";

    export let data;
</script>

<svelte:head>
    <title>{data.game?.title ? `${data.game.title} Leaderboards` : `Unknown Game`} • Lighthouse</title>
    <meta name="description" content={`${data.game?.title} Leaderboards for MCC Island • Lighthouse by SirArchibald`} />
    <link rel="icon" href="%sveltekit.assets%/favicon.png" type="image/png" />

    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script src="https://unpkg.com/tippy.js@6"></script>
</svelte:head>
<div class="flex flex-col gap-y-4">
    {#if data.game !== null}
        <div class="flex flex-row gap-x-2 justify-center text-2xl text-neutral-900 dark:text-neutral-100">
            <img src={data.game.icon} alt={data.game.title} class="w-10 h-10 self-center" />
            <p class="font-semibold self-center">{data.game.title} Leaderboards</p>
        </div>

        <div class="flex flex-col mb-8 gap-y-4">
            <div class="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 mx-4 sm:mx-24 md:mx-4 lg:mx-32">
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