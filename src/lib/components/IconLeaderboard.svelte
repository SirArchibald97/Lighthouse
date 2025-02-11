<script>
    import { getRankIcon } from "$lib/utils.js";
    import { getIcon } from "$lib/levels.js";
    import tooltip from "$lib/tooltip.js";
    import ChevronLeft from "$lib/svgs/LeftChevron.svelte";
    import ChevronRight from "$lib/svgs/RightChevron.svelte";

    export let name;
    export let stat;
    export let display;
    export let icon;
    export let inlineIcon;
    export let players;
    for (let player of players) {
        if (!fetchStat(player.player, stat)) players.slice(players.indexOf(player), 1);
    }

    export let badge;
    export let game;

    let username = "";
    function sort() { return players.sort((a, b) => fetchStat(b.player, stat) - fetchStat(a.player, stat)); }

    let page = 0;
    function nextPage() { 
        if (page + 1 < Math.ceil(players.length / 10))
            page++;
        else
            page = 0;
    }
    function prevPage() { 
        if (page - 1 > 0)
            page--;
        else
            page = Math.ceil(players.length / 10) - 1;
    }

    function fetchStat(stats, key) {
        const path = key.split(".");
        let value = stats[path[0]];
        for (let i = 1; i < path.length; i++) {
            value = value[path[i]] || null;
        }
        return value;
    }
</script>

<div class="flex flex-col bg-white border-2 border-slate-300 rounded-md py-1">
    <div class="flex flex-row justify-between mx-3 mb-2">
        <div class="flex flex-row gap-x-2 mt-2">
            {#if badge}<img src={`https://cdn.islandstats.xyz/badges/${game + "/" + badge.icon}.png`} alt={`${badge.name} Badge`} class="w-10 h-10 self-center" use:tooltip title={badge.description}/>{/if}
            {#if icon}<img src={`https://cdn.islandstats.xyz/${icon}.png`} alt={`${icon} Icon`} class="w-8 h-8 self-center" />{/if}
            <p class="text-2xl font-semibold self-center ml-1">{name || badge.name}</p>
        </div>
    </div>
    <table class="table-auto border-separate border-spacing-y-1 border-spacing-x-5 text-lg">
        <tbody>
            {#each (username.length > 0 ? 
                sort().filter(p => p.player.username?.toLowerCase().includes(username.toLowerCase())).slice(page * 10, (page + 1) * 10) : 
                sort().slice(page * 10, (page + 1) * 10)
            ) as player}
                <tr>
                    <td>{players.indexOf(players.find(p => p.player.username === player.player.username)) + 1}</td>
                    <td class="flex flex-row gap-x-2">
                        <img class="w-8 h-8 self-center bg-slate-400 rounded-sm" src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(player.player.ranks)}`} alt={`${player.username}'s Rank`} />
                        <a href={`/player/${player.player.username}`} class="hover:underline">{player.player.username}</a>
                    </td>
                    <td>
                        <div class="flex flex-row gap-x-2">
                            {#if inlineIcon === "level"}
                                <img class="w-7 h-7 self-center" src={`https://cdn.islandstats.xyz/icons/crowns/${getIcon(player.player.trophies.level)}.png`} alt={`Crown Level Icon`} />
                            {:else}
                                <img class="w-7 h-7 self-center" src={`https://cdn.islandstats.xyz/${inlineIcon}.png`} alt={`Trophy Icon`} />
                            {/if}
                            <span class="self-center">{fetchStat(player.player, display || stat)?.toLocaleString() || "Unknown"}</span>
                        </div>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>

    <div class="sticky my-3 place-self-center flex flex-row gap-x-2">
        <input type="text" name="ign" placeholder="Username" bind:value={username} class="self-center border-2 border-slate-300 rounded-md px-2 py-1" />
        <button on:click={prevPage} class="h-8 w-8 self-center p-1 bg-slate-200 hover:bg-slate-300 duration-100 rounded-sm"><ChevronLeft /></button>
        <span class="self-center">{page + 1}/{Math.ceil(players.length / 10)}</span>
        <button on:click={nextPage} class="h-8 w-8 self-center p-1 bg-slate-200 hover:bg-slate-300 duration-100 rounded-sm"><ChevronRight /></button>
    </div>
</div>