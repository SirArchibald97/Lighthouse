<script>
    import { calculateProgress, getNextLevel, getCurrentLevel, getIcon, getColour } from "$lib/levels.js";
    import tooltip from "$lib/tooltip.js";

    export let data;
</script>

<div>
    <div class="bg-slate-50 border-l-4 border-l-red-500 rounded-sm p-4">
        <!-- LEVELS -->
        <p class="text-3xl font-bold">Trophies</p>

        <p class="mt-4 mb-2 flex flex-row gap-x-1">
            <span class="text-xl font-semibold self-center">Crown Level</span>
            <span class="text-md font-normal self-center">({(data.player.crownLevel.skill_trophies.obtained + data.player.crownLevel.style_trophies.obtained).toLocaleString()}/{getNextLevel(data.player.crownLevel.level, data.player.crownLevel.skill_trophies.obtained + data.player.crownLevel.style_trophies.obtained).toLocaleString()})</span>
        </p>
        <div class="flex flex-row gap-x-3 mb-4 text-lg">
            <img src={`https://cdn.islandstats.xyz/icons/crowns/${getIcon(data.player.crownLevel.level)}.png`} alt={`Crown Level ${data.player.crownLevel.level} Icon`} class="w-8 h-8 self-center" />
            <span class="self-center">{data.player.crownLevel.level}</span>

            <!-- progress bar -->
            <div class={`h-6 w-3/5 self-center rounded-md bg-slate-200 transition-all duration-500`} 
                use:tooltip title={`
                    ${Math.round(calculateProgress(data.player.crownLevel.level, data.player.crownLevel.skill_trophies.obtained + data.player.crownLevel.style_trophies.obtained) * 100)}%
                    (${(data.player.crownLevel.skill_trophies.obtained + data.player.crownLevel.style_trophies.obtained - getCurrentLevel(data.player.crownLevel.level)).toLocaleString()}/${getNextLevel(data.player.crownLevel.level) - getCurrentLevel(data.player.crownLevel.level)})
                `}>
                <div
                    class="flex flex-col h-full left-0 right-0 rounded-md text-center transition-all duration-500 group"
                    style={`width: calc(100% * ${calculateProgress(data.player.crownLevel.level, data.player.crownLevel.skill_trophies.obtained + data.player.crownLevel.style_trophies.obtained)}); ${getColour(data.player.crownLevel.level)}`}
                >
                </div>
            </div>


            <span class="self-center">{data.player.crownLevel.level + 1}</span>
        </div>



        <!-- TROPHIES -->
        <div class="flex flex-row sm:gap-1 my-1 text-lg">
            <span>Total Trophies: </span>
            <img src="https://cdn.islandstats.xyz/icons/trophies/yellow.png" class="w-5 h-5 self-center" alt="Total Trophies" />
            <span class="font-semibold">
                {(data.player.crownLevel.style_trophies.obtained + data.player.crownLevel.skill_trophies.obtained).toLocaleString()}<span class="font-normal text-sm">/{(data.player.crownLevel.style_trophies.obtainable + data.player.crownLevel.skill_trophies.obtainable).toLocaleString()}</span>
            </span>
        </div>
        <div class="flex flex-row sm:gap-1 my-1 text-lg">
            <span>Style Trophies: </span>
            <img src="https://cdn.islandstats.xyz/icons/trophies/purple.png" class="w-5 h-5 self-center" alt="Style Trophies" />
            <span class="font-semibold" use:tooltip title={`${data.player.crownLevel.style_trophies.bonus} Bonus Trophies`}>
                {data.player.crownLevel.style_trophies.obtained.toLocaleString()}<span class="font-normal text-sm">/{data.player.crownLevel.style_trophies.obtainable.toLocaleString()}</span>
            </span>
        </div>
        <div class="flex flex-row sm:gap-1 my-1 text-lg">
            <span>Skill Trophies: </span>
            <img src="https://cdn.islandstats.xyz/icons/trophies/red.png" class="w-5 h-5 self-center" alt="Skill Trophies" />
            <span class="font-semibold" use:tooltip title={`${data.player.crownLevel.skill_trophies.bonus} Bonus Trophies`}>
                {data.player.crownLevel.skill_trophies.obtained.toLocaleString()}<span class="font-normal text-sm">/{data.player.crownLevel.skill_trophies.obtainable.toLocaleString()}</span>
            </span>
        </div>
        <div class="flex flex-row sm:gap-1 my-1 text-lg">
            <span>Bonus Trophies: </span>
            <img src="https://cdn.islandstats.xyz/icons/trophies/silver.png" class="w-5 h-5 self-center" alt="Style Trophies" />
            <span class="font-semibold">
                {(data.player.crownLevel.style_trophies.bonus + data.player.crownLevel.skill_trophies.bonus).toLocaleString()}
            </span>
        </div>



        <!-- FACTIONS-->
        <p class="text-3xl font-bold mt-6">Factions</p>
        <p class="text-lg">Faction levels coming soon!</p>
    </div>
</div>