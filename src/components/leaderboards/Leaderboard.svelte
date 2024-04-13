<script>
    import { getRankIcon } from "$lib/utils.js";
    import tooltip from "$lib/tooltip.js";
    import DownArrow from "$lib/svgs/DownArrow.svelte";
    import UpArrow from "$lib/svgs/UpArrow.svelte";
    import ChevronLeft from "$lib/svgs/LeftChevron.svelte";
    import ChevronRight from "$lib/svgs/RightChevron.svelte";

    export let game;
    export let isBadge;
    export let stat;
    export let name;
    export let badge;
    export let leaderboard;

    let order = "desc";
    function toggleOrder() { order = order === "asc" ? "desc" : "asc"; }

    function fetchStat(player) {
        if (game === "") return player.player.statistics[stat];

        const [maingame, subgame] = game.split(".");
        if (!isBadge)
            if (subgame)
                return player.player.statistics[maingame][subgame][stat];
            else
                return player.player.statistics[maingame][stat];
        else
            if (subgame)
                return player.player.statistics[maingame][subgame].badges[badge.stat];
            else
                return player.player.statistics[maingame].badges[badge.stat];
    }

    let username = "";
    function sortPlayers() { return leaderboard.sort((a, b) => fetchStat(b) - fetchStat(a)) }

    let page = 0;
    function nextPage() { 
        if (page + 1 < Math.floor(leaderboard.length / 10))
            page++;
        else
            page = 0;
    }
    function prevPage() { 
        if (page - 1 > -1)
            page--;
        else
            page = Math.floor(leaderboard.length / 10);
    }
</script>

<div class="flex flex-col bg-white border-2 border-slate-300 rounded-md py-1">
    <div class="flex flex-row justify-between mx-3 mb-2">
        <div class="flex flex-row gap-x-2 mt-2">
            {#if isBadge || badge}<img src={`https://cdn.islandstats.xyz/badges/${game.split(".")[0] || game}/${badge.icon}.png`} alt={`${badge.name} Badge`} class="w-10 h-10 self-center" use:tooltip title={badge.description}/>{/if}
            <p class="text-2xl font-semibold self-center">{name || badge.name}</p>
        </div>
        <div class="flex flex-row">
            <button on:click={toggleOrder} class="h-8 w-8 self-center p-1 bg-slate-200 hover:bg-slate-300 duration-100 rounded-sm">{#if order === "desc"}<DownArrow />{:else}<UpArrow />{/if}</button>
        </div>
    </div>
    <table class="flex-grow table-auto border-separate border-spacing-y-1 border-spacing-x-5 text-lg">
        <tbody>
            {#each (username.length > 0 ? 
                (order === "asc" ? sortPlayers().filter(p => p.player.username.toLowerCase().includes(username.toLowerCase())).reverse().slice(page * 10, (page + 1) * 10) : sortPlayers().filter(p => p.player.username.toLowerCase().includes(username.toLowerCase())).slice(page * 10, (page + 1) * 10)) :
                (order === "asc" ? sortPlayers().reverse().slice(page * 10, (page + 1) * 10) : sortPlayers().slice(page * 10, (page + 1) * 10))
            ) as player}
                <tr>
                    <td>{leaderboard.indexOf(leaderboard.find(p => p.player.username === player.player.username)) + 1}</td>
                    <td class="flex flex-row gap-x-2">
                        <img class="w-8 h-8 self-center bg-slate-400 rounded-sm" src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(player.player.ranks)}`} alt={`${player.player.username}'s Rank`} />
                        <span>{player.player.username}</span>
                    </td>
                    <td>{(isBadge ? fetchStat(player)?.toLocaleString() : fetchStat(player)?.toLocaleString()) || "Unknown"}</td>
                </tr>
            {/each}
        </tbody>
    </table>

    <div class="flex-none my-3 place-self-center flex flex-row gap-x-2">
        <input type="text" name="ign" placeholder="Username" bind:value={username} class="self-center border-2 border-slate-300 rounded-md px-3 py-1" />
        <button on:click={prevPage} class="h-8 w-8 self-center p-1 bg-slate-200 hover:bg-slate-300 duration-100 rounded-sm"><ChevronLeft /></button>
        <button on:click={nextPage} class="h-8 w-8 self-center p-1 bg-slate-200 hover:bg-slate-300 duration-100 rounded-sm"><ChevronRight /></button>
    </div>
</div>