<script>
    import { getRankIcon } from "$lib/utils.js";
    import { getIcon } from "$lib/levels.js";
    import tooltip from "$lib/tooltip.js";
    import ChevronLeft from "$lib/svgs/LeftChevron.svelte";
    import ChevronRight from "$lib/svgs/RightChevron.svelte";
    import Plus from "$lib/svgs/Plus.svelte";

    export let name;
    export let stat;
    export let display;
    export let ratio;
    export let icon;
    export let title;
    export let players;

    let username = "";

    let page = 0;
    function nextPage() {
        if (username.length > 0) {
            if (page + 1 < Math.ceil(leaderboard.filter(p => p.player.username.toLowerCase().includes(username.toLowerCase())).length / 10)) page++;
            else page = 0;
        } else {
            if (page + 1 < Math.ceil(leaderboard.length / 10)) page++;
            else page = 0;
        }
        sort();
    }
    function prevPage() {
        if (username.length > 0) {
            if (page - 1 > -1) page--;
            else page = Math.ceil(leaderboard.filter(p => p.player.username.toLowerCase().includes(username.toLowerCase())).length / 10) - 1;
        } else {
            if (page - 1 >= 0) page--;
            else page = Math.ceil(leaderboard.length / 10) - 1;
        }
        sort();
    }

    function fetchStat(stats, key) {
        const path = key.split(".");
        let value = stats[path[0]];
        for (let i = 1; i < path.length; i++) {
            if (!value) return null;
            value = value[path[i]] || null;
        }
        return value;
    }

    let leaderboard = players;
    function sort() { 
        leaderboard = players
            .sort((a, b) => fetchStat(b.player, stat) - fetchStat(a.player, stat))
            .filter(p => fetchStat(p.player, stat) !== null)
            .filter(p => {
                if (ratio) return fetchStat(p.player, ratio) >= 10;
                return true;
            })
            .filter(p => {
                if (username.length > 0) return p.player.username.toLowerCase().includes(username.toLowerCase());
                return true;
            })
    }
    sort();

    function reset() {
        page = 0;
        sort();
    }
    $: username, reset();
</script>

<div class="flex flex-col border border-neutral-300 dark:border-neutral-800 rounded-sm py-1">
    <div class="flex flex-row justify-between m-3">
        <div class="flex flex-row gap-x-2">
            {#if icon && !title}<img src={icon} alt="Leadboard Icon" class="w-8 sm:w-10 h-8 sm:h-10 self-center" />{:else if icon && title}<img src={icon} alt="Leadboard Icon" class="w-10 h-10 self-center" use:tooltip title={title} />{/if}
            <p class={`text-xl sm:text-2xl text-neutral-909 dark:text-neutral-100 font-semibold self-center ${icon ? "" : "ml-2"}`}>{name}</p>
        </div>
    </div>
    <table class="flex-1 table-auto border-separate border-spacing-y-1 border-spacing-x-2 px-2 text-md sm:text-lg">
        <tbody class="">
            {#each leaderboard.filter(p => {
                if (username.length > 0) return p.player.username.toLowerCase().includes(username.toLowerCase());
                return true;
            }).slice(page * 10, (page + 1) * 10) as player}
                <tr>
                    <td class="text-neutral-909 dark:text-neutral-100">{((username.length > 0 ? players : leaderboard).indexOf(leaderboard.find(p => p.player.username === player.player.username)) + 1).toLocaleString()}</td>
                    <td>
                        <div class="flex flex-row gap-x-2">
                            <img class="w-6 sm:w-8 h-6 sm:h-8 self-center bg-slate-400 rounded-sm" src={`https://mc-heads.net/avatar/${player.uuid}/128`} alt={`${player.player.username}'s Rank`} />
                            <img class="hidden sm:flex w-8 h-8 self-center bg-slate-400 rounded-sm" src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(player.player.ranks)}`} alt={`${player.player.username}'s Rank`} />
                            <a href={`/player/${player.player.username}`} class="text-neutral-909 dark:text-neutral-100 hover:underline self-center">{player.player.username}</a>
                        </div>
                    </td>
                    <td>
                        <div class="flex flex-row gap-x-2">
                            {#if display === "level"}<img src={`https://cdn.islandstats.xyz/icons/crowns/${getIcon(player.player.level)}.png`} class="w-5 sm:w-7 h-5 sm:h-7 self-center" alt="Crown Level Icon" />{/if}
                            <span class="self-center text-neutral-900 dark:text-neutral-100">{fetchStat(player.player, display || stat)?.toLocaleString() || "-"}</span>
                        </div>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>

    <div class="my-3 place-self-center flex flex-col sm:flex-row gap-x-2 gap-y-2">
        <input type="text" name="ign" placeholder="Username" bind:value={username} class="self-center text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-sm px-2 py-1" />
        <div class="flex flex-row gap-x-2 justify-center">
            <button on:click={prevPage} class="h-8 w-8 self-center p-1 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-300 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-800 duration-100 rounded-sm text-neutral-900 dark:text-neutral-100"><ChevronLeft /></button>
            <span class="text-neutral-909 dark:text-neutral-100 self-center">
                {page + 1}/{Math.ceil(leaderboard.filter(p => {
                    if (username.length > 0) return p.player.username.toLowerCase().includes(username.toLowerCase());
                    return true;
                }).length / 10)}
            </span>
            <button on:click={nextPage} class="h-8 w-8 self-center p-1 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-300 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-800 duration-100 rounded-sm text-neutral-900 dark:text-neutral-100"><ChevronRight /></button>
        </div>
    </div>
</div>