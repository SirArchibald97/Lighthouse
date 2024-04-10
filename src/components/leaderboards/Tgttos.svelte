<script>
    import { getRankIcon } from "$lib/utils.js";
    import DoubleDownArrow from "$lib/svgs/DoubleDownArrow.svelte";
    import tooltip from "$lib/tooltip.js";
    import { badges } from "$lib/data.js";

    export let players;

    let sort = "first_place";
    let badgeSort = badges.tgttos[0].stat;
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
            if (!a.player.statistics.tgttos[stat]) {
                if (stat === "wlr")
                    return (b.player.statistics.tgttos.first_place / (b.player.statistics.tgttos.games_played - b.player.statistics.tgttos.first_place)) - (a.player.statistics.tgttos.first_place / (a.player.statistics.tgttos.games_played - a.player.statistics.tgttos.first_place));
                else if (stat === "kdr")
                    return (b.player.statistics.tgttos.kills / b.player.statistics.tgttos.deaths) - (a.player.statistics.tgttos.kills / a.player.statistics.tgttos.deaths);
                else if (stat === "losses") 
                    return (b.player.statistics.tgttos.games_played - b.player.statistics.tgttos.first_place) - (a.player.statistics.tgttos.games_played - a.player.statistics.tgttos.first_place);

            } else {
                return b.player.statistics.tgttos[stat] - a.player.statistics.tgttos[stat];
            }
        });
    }

    function sortBadges(stat) {
        return players.sort((a, b) => {
            return b.player.statistics.tgttos.badges[stat] - a.player.statistics.tgttos.badges[stat];
        });
    }
</script>

<svelte:head>
    <title>Leaderboards</title>
    <meta name="description" content="Leaderboards for the MCC Island Minecraft server" />
</svelte:head>
<div class="flex flex-col mb-8 gap-y-8">    
    <div class="bg-slate-100 rounded-sm border-l-4 border-red-500 mx-4 sm:mx-24 px-4 py-4">
        <div class="flex flex-row justify-between">
            <div class="flex flex-row mb-4 justify-center">
                <img src={`https://cdn.islandstats.xyz/games/tgttos/icon.png`} class="w-8 h-8 self-center" alt={`TGTTOS Icon`} />
                <p class="text-2xl font-semibold self-center ml-2">TGTTOS</p>
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
                        <td><button class={`${sort === "first_place" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("first_place")}>Wins</button></td>
                        <td><button class={`${sort === "losses" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("losses")}>Losses</button></td>
                        <td><button class={`${sort === "wlr" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("wlr")}>WLR</button></td>
                        <td><button class={`${sort === "kills" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("kills")}>Kills</button></td>
                        <td><button class={`${sort === "deaths" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("deaths")}>Deaths</button></td>
                        <td><button class={`${sort === "kdr" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("kdr")}>KDR</button></td>
                        <td><button class={`${sort === "chickens_punched" ? "border-b-2 border-red-500" : ""}`} on:click={() => toggleSort("chickens_punched")}>Chickens Punched</button></td>
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
                            <td>{player.player.statistics?.tgttos.first_place.toLocaleString()}</td>
                            <td>{(player.player.statistics?.tgttos.games_played - player.player.statistics?.tgttos.first_place).toLocaleString()}</td>
                            <td>{(Math.floor((player.player.statistics?.tgttos.first_place / (player.player.statistics?.tgttos.games_played - player.player.statistics?.tgttos.first_place)) * 100) / 100 || 0).toLocaleString() || "Unknown"}</td>
                            <td>{player.player.statistics?.tgttos.kills.toLocaleString()}</td>
                            <td>{player.player.statistics?.tgttos.deaths.toLocaleString()}</td>
                            <td>{(Math.floor((player.player.statistics?.tgttos.kills / player.player.statistics?.tgttos.deaths) * 100) / 100 || 0).toLocaleString() || "Unknown"}</td>
                            <td>{player.player.statistics?.tgttos.chickens_punched.toLocaleString()}</td>
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

    <div class="bg-slate-100 rounded-sm border-l-4 border-red-500 mx-4 sm:mx-24 px-4 py-4">
        <div class="flex flex-row justify-between">
            <div class="flex flex-row mb-4 justify-center">
                <img src={`https://cdn.islandstats.xyz/games/tgttos/icon.png`} class="w-8 h-8 self-center" alt={`TGTTOS Icon`} />
                <p class="text-2xl font-semibold self-center ml-2">TGTTOS Badges</p>
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
                        {#each badges.tgttos as badge}
                            <td><button class={`${badgeSort === badge.stat ? "grayscale-0" : "grayscale"}`} on:click={() => toggleBadgeSort(badge.stat)} use:tooltip title={badge.name}><img src={`https://cdn.islandstats.xyz/badges/tgttos/${badge.icon}.png`} alt={`${badge.name} Badge`} class="w-10 h-10 self-center"></button></td>
                        {/each}
                    </tr>
                </thead>
                <tbody>
                    {#each (badgeUsername.length === 0 ? sortBadges(badgeSort).slice(0, badgeLimit) : sortBadges(badgeSort).filter(p => p.player.username.toLowerCase().includes(badgeUsername.toLowerCase())).slice(0, badgeLimit)) as player, count}
                        <tr>
                            <td>{sortBadges(badgeSort).indexOf(sortBadges(badgeUsername).find(p => p.player.username === player.player.username)) + 1}</td> 
                            <td class="flex flex-row">
                                <img class="w-6 h-6 rounded-sm self-center bg-slate-400" src={`https://cdn.islandstats.xyz/ranks/${getRankIcon(player.player.ranks)}`} alt={getRankIcon(player.player.ranks)} />
                                <span class="self-center ml-2">{player.player.username}</span>
                            </td>
                            {#each badges.tgttos as badge}
                                <td>{player.player.statistics?.tgttos.badges[badge.stat].toLocaleString()}</td>
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