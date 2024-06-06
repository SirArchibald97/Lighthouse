<script>
    import Footer from "$lib/components/Footer.svelte";
    import Leaderboard from "$lib/components/Leaderboard.svelte";
	import IconLeaderboard from "$lib/components/IconLeaderboard.svelte";

    export let data;

    let stats = [
        { name: "Crown Level", value: "trophies.total", display: "level", icon: "icons/crowns/1", inlineIcon: "level" },
        { name: "Total Trophies", value: "trophies.total", icon: "icons/trophies/yellow", inlineIcon: "icons/trophies/yellow" },
        { name: "Skill Trophies", value: "trophies.skill.total", icon: "icons/trophies/red", inlineIcon: "icons/trophies/red" },
        { name: "Style Trophies", value: "trophies.style.total", icon: "icons/trophies/purple", inlineIcon: "icons/trophies/purple" },
        { name: "Bonus Trophies", value: "trophies.bonus", icon: "icons/trophies/silver", inlineIcon: "icons/trophies/silver" },
    ];
</script>

<svelte:head>
    <title>Leaderboards</title>
    <meta name="description" content="Leaderboards for the MCC Island Minecraft server" />

    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script src="https://unpkg.com/tippy.js@6"></script>
</svelte:head>
<div class="flex flex-col mb-8 gap-y-8">
    <div class="flex flex-row justify-between mt-6 mx-4 sm:mx-44">
        <a href="/leaderboards" class="flex-none px-3 border-2 border-slate-300 py-1 bg-white rounded-md hover:bg-slate-100 hover:scale-105 duration-100 self-center">Go Back</a>
        <div class="flex flex-row gap-x-2 self-center flex-grow justify-center">
            <img src="https://cdn.islandstats.xyz/icons/trophies/yellow.png" alt="Trophy Icon" class="w-12 h-12 self-center" />
            <p class="text-center text-3xl font-semibold self-center">Trophy Leaderboards</p>
        </div>
    </div>

    <div class="flex flex-col mb-8 gap-y-8">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mx-4 sm:mx-24 lg:mx-32">
            {#each stats as stat}
                {#if stat.inlineIcon}
                    <IconLeaderboard name={stat.name} stat={stat.value} display={stat.display || null} icon={stat.icon || null} inlineIcon={stat.inlineIcon} players={data.players} />
                {:else}
                    <Leaderboard name={stat.name} stat={stat.value} display={stat.display || null} icon={stat.icon || null} players={data.players} />
                {/if}
            {/each}
        </div>
    </div>
</div>

<Footer absolute={false} />