<script>
    import { getRankIcon } from "$lib/utils.js";
    import DoubleDownArrow from "$lib/svgs/DoubleDownArrow.svelte";
    import tooltip from "$lib/tooltip.js";
    import { badges } from "$lib/data.js";

    export let players;

    let sort = "solo_first_place";
    let badgeSort = badges.sky_battle[0].stat;
    function toggleSort(stat) { sort = stat }
    function toggleBadgeSort(stat) { badgeSort = stat }

    let username = "";
    let badgeUsername = "";

    let limit = 10;
    let badgeLimit = 10;
    function increaseLimit() { limit += 10; }
    function increaseBadgeLimit() { badgeLimit += 10; }

    function sortPlayers(stat) {
        return players.sort((a, b) => {
            if (!a.player.statistics.sky_battle.quads[stat]) {
                if (stat === "wlr")
                    return (b.player.statistics.sky_battle.quads.solo_first_place / (b.player.statistics.sky_battle.quads.games_played - b.player.statistics.sky_battle.quads.solo_first_place)) - (a.player.statistics.sky_battle.quads.solo_first_place / (a.player.statistics.sky_battle.quads.games_played - a.player.statistics.sky_battle.quads.solo_first_place));
                else if (stat === "kdr")
                    return (b.player.statistics.sky_battle.quads.kills / b.player.statistics.sky_battle.quads.deaths) - (a.player.statistics.sky_battle.quads.kills / a.player.statistics.sky_battle.quads.deaths);
                else if (stat === "losses") 
                    return (b.player.statistics.sky_battle.quads.games_played - b.player.statistics.sky_battle.quads.solo_first_place) - (a.player.statistics.sky_battle.quads.games_played - a.player.statistics.sky_battle.quads.solo_first_place);

            } else {
                return b.player.statistics.sky_battle.quads[stat] - a.player.statistics.sky_battle.quads[stat];
            }
        });
    }

    function sortBadges(stat) {
        return players.sort((a, b) => {
            return b.player.statistics.sky_battle.quads.badges[stat] - a.player.statistics.sky_battle.quads.badges[stat];
        });
    }
</script>

<svelte:head>
    <title>Leaderboards</title>
    <meta name="description" content="Leaderboards for the MCC Island Minecraft server" />
</svelte:head>
<div class="flex flex-col gap-y-8 mb-8">
    <!-- STATS --> 
    <div class="bg-slate-100 rounded-sm border-l-4 border-red-500 mx-4 sm:mx-24 px-4 py-4">
        <div class="flex flex-row justify-between">
            <div class="flex flex-row mb-4 justify-center">
                <img src={`https://cdn.islandstats.xyz/games/sky_battle/icon.png`} class="w-8 h-8 self-center" alt={`Battle Box Icon`} />
                <p class="text-2xl font-semibold self-center ml-2">Sky Battle</p>
            </div>
            <div>
                <input bind:value={username} type="text" name="username" placeholder="Username" class="border-slate-300 border-2 rounded-md px-1" />
            </div>
        </div>
        
        <div class="flex flex-col gap-y-2 justify-center">
            <table class="table-auto border-separate border-spacing-y-3 border-spacing-x-10 text-xl">
                <thead>
                    <tr class="font-semibold">
                        <td>#</td>
                        <td>Player</td>
                        <td><button class={`${sort === "solo_first_place" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("solo_first_place")}>Wins</button></td>
                        <td><button class={`${sort === "losses" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("losses")}>Losses</button></td>
                        <td><button class={`${sort === "wlr" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("wlr")}>WLR</button></td>
                        <td><button class={`${sort === "kills" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("kills")}>Kills</button></td>
                        <td><button class={`${sort === "deaths" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("deaths")}>Deaths</button></td>
                        <td><button class={`${sort === "kdr" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("kdr")}>KDR</button></td>
                        <td><button class={`${sort === "team_first_place" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("team_first_place")}>Team Wins</button></td>
                    </tr>
                </thead>
                <tbody>
                    {#each (username.length === 0 ? sortPlayers(sort).slice(0, limit) : sortPlayers(sort).filter(p => p.player.username.toLowerCase().includes(username.toLowerCase())).slice(0, limit)) as player, count}
                        <tr>
                            <td>{sortPlayers(sort).indexOf(sortPlayers(sort).find(p => p.player.username === player.player.username)) + 1}</td> 
                            <td class="flex flex-row">
                                <img class="w-6 h-6 rounded-sm self-center bg-slate-400" src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(player.player.ranks)}`} alt={getRankIcon(player.player.ranks)} />
                                <span class="self-center ml-2">{player.player.username}</span>
                            </td>
                            <td>{player.player.statistics?.sky_battle.quads.solo_first_place.toLocaleString()}</td>
                            <td>{(player.player.statistics?.sky_battle.quads.games_played - player.player.statistics?.sky_battle.quads.solo_first_place).toLocaleString()}</td>
                            <td>{(Math.floor((player.player.statistics?.sky_battle.quads.solo_first_place / (player.player.statistics?.sky_battle.quads.games_played - player.player.statistics?.sky_battle.quads.solo_first_place)) * 100) / 100 || 0).toLocaleString() || "Unknown"}</td>
                            <td>{player.player.statistics?.sky_battle.quads.kills.toLocaleString()}</td>
                            <td>{player.player.statistics?.sky_battle.quads.deaths.toLocaleString()}</td>
                            <td>{(Math.floor((player.player.statistics?.sky_battle.quads.kills / player.player.statistics?.sky_battle.quads.deaths) * 100) / 100 || 0).toLocaleString() || "Unknown"}</td>
                            <td>{player.player.statistics?.sky_battle.quads.team_first_place.toLocaleString()}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>

            <button class="flex flex-row gap-x-1 place-self-center px-3 py-1 rounded-md bg-slate-200 hover:bg-slate-300 duration-100" on:click={increaseLimit}>
                <span class="w-6 h-6 self-center"><DoubleDownArrow /></span>
                <span class="self-center">See more</span>
            </button>
        </div>
    </div>

    <!-- BADGES --> 
    <div class="bg-slate-100 rounded-sm border-l-4 border-red-500 mx-4 sm:mx-24 px-4 py-4">
        <div class="flex flex-row justify-between">
            <div class="flex flex-row mb-4 justify-center">
                <img src={`https://cdn.islandstats.xyz/games/sky_battle/icon.png`} class="w-8 h-8 self-center" alt={`Battle Box Icon`} />
                <p class="text-2xl font-semibold self-center ml-2">Sky Battle Badges</p>
            </div>
            <div>
                <input bind:value={badgeUsername} type="text" name="username" placeholder="Username" class="border-slate-300 border-2 rounded-md px-1" />
            </div>
        </div>
        
        <div class="flex flex-col gap-y-2 justify-center">
            <table class="table-auto border-separate border-spacing-y-3 border-spacing-x-10 text-xl">
                <thead>
                    <tr class="font-semibold">
                        <td>#</td>
                        <td>Player</td>
                        {#each badges.sky_battle as badge}
                            <td><button class={`${badgeSort === badge.stat ? "grayscale-0" : "grayscale"}`} on:click={() => toggleBadgeSort(badge.stat)} use:tooltip title={badge.name}><img src={`https://cdn.islandstats.xyz/badges/sky_battle/${badge.icon}.png`} class="w-10 h-10 self-center" alt={`${badge.name} Badge`}></button></td>
                        {/each}
                    </tr>
                </thead>
                <tbody>
                    {#each (badgeUsername.length === 0 ? sortBadges(badgeSort).slice(0, badgeLimit) : sortBadges(badgeSort).filter(p => p.player.username.toLowerCase().includes(badgeUsername.toLowerCase())).slice(0, badgeLimit)) as player, count}
                        <tr>
                            <td>{sortBadges(badgeSort).indexOf(sortBadges(badgeSort).find(p => p.player.username === player.player.username)) + 1}</td> 
                            <td class="flex flex-row">
                                <img class="w-6 h-6 rounded-sm self-center bg-slate-400" src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(player.player.ranks)}`} alt={getRankIcon(player.player.ranks)} />
                                <span class="self-center ml-2">{player.player.username}</span>
                            </td>
                            {#each badges.sky_battle as badge}
                                <td>{player.player.statistics?.sky_battle.quads.badges[badge.stat].toLocaleString()}</td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>

            <button class="flex flex-row gap-x-1 place-self-center px-3 py-1 rounded-md bg-slate-200 hover:bg-slate-300 duration-100" on:click={increaseBadgeLimit}>
                <span class="w-6 h-6 self-center"><DoubleDownArrow /></span>
                <span class="self-center">See more</span>
            </button>
        </div>
    </div>
</div>