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
            <span class="flex flex-row text-md font-normal self-center">
                (
                <img src="https://cdn.islandstats.xyz/icons/trophies/yellow.png" alt="Total Trophies" class="w-4 h-4 self-center mr-1" />
                <span class="self-center">{data.player.trophies.total.toLocaleString()}</span>
                <span class="mx-1">/</span>
                <img src="https://cdn.islandstats.xyz/icons/trophies/yellow.png" alt="Total Trophies" class="w-4 h-4 self-center mr-1" />
                <span class="self-center">{getNextLevel(data.player.level, data.player.trophies.total).toLocaleString()}</span>
                )
            </span>
        </p>
        <div class="flex flex-row gap-x-3 mb-4 text-lg">
            <img src={`https://cdn.islandstats.xyz/icons/crowns/${getIcon(data.player.level)}.png`} alt={`Crown Level ${data.player.level} Icon`} class="w-8 h-8 self-center" />
            <span class="self-center">{data.player.level}</span>

            <!-- progress bar -->
            <div class={`h-6 w-3/5 self-center rounded-md bg-slate-200 transition-all duration-500`} 
                use:tooltip title={`
                    ${Math.round(calculateProgress(data.player.level, data.player.trophies.total) * 100)}%
                    (${(data.player.trophies.total - getCurrentLevel(data.player.level)).toLocaleString()}/${getNextLevel(data.player.level) - getCurrentLevel(data.player.level)})
                `}>
                <div
                    class="flex flex-col h-full left-0 right-0 rounded-md text-center transition-all duration-500 group"
                    style={`width: calc(100% * ${calculateProgress(data.player.level, data.player.trophies.total)}); ${getColour(data.player.level)}`}
                >
                </div>
            </div>


            <span class="self-center">{data.player.level + 1}</span>
        </div>



        <!-- TROPHIES -->
        <div class="flex flex-row gap-x-6">
            <div class="flex flex-col bg-slate-100 border-2 border-slate-200 px-5 py-3 rounded-lg text-xl text-center" use:tooltip title="Total Trophies">
                <img src="https://cdn.islandstats.xyz/icons/trophies/yellow.png" class="w-8 h-8 self-center" alt="Total Trophies" />
                <span class="font-semibold">
                    {data.player.trophies.total.toLocaleString()}
                </span>
                <span class="font-normal text-sm">
                    /{data.player.trophies.total.toLocaleString()}
                </span>
            </div>
            <div class="flex flex-col bg-slate-100 border-2 border-slate-200 px-5 py-3 rounded-lg text-xl text-center" use:tooltip title="Skill Trophies">
                <img src="https://cdn.islandstats.xyz/icons/trophies/red.png" class="w-8 h-8 self-center" alt="Skill Trophies" />
                <span class="font-semibold">
                    {data.player.trophies.skill.total.toLocaleString()}
                </span>
                <span class="font-normal text-sm">
                    /{data.player.trophies.skill.max.toLocaleString()}
                </span>
            </div>
            <div class="flex flex-col bg-slate-100 border-2 border-slate-200 px-5 py-3 rounded-lg text-xl text-center" use:tooltip title="Style Trophies">
                <img src="https://cdn.islandstats.xyz/icons/trophies/purple.png" class="w-8 h-8 self-center" alt="Style Trophies" />
                <span class="font-semibold">
                    {data.player.trophies.style.total.toLocaleString()}
                </span>
                <span class="font-normal text-sm">
                    /{data.player.trophies.style.max.toLocaleString()}
                </span>
            </div>
            <div class="flex flex-col bg-slate-100 border-2 border-slate-200 px-6 py-3 rounded-lg text-xl text-center" use:tooltip title="Bonus Trophies">
                <img src="https://cdn.islandstats.xyz/icons/trophies/silver.png" class="w-8 h-8 self-center" alt="Bonus Trophies" />
                <span class="font-semibold">
                    {data.player.trophies.bonus.toLocaleString()}
                </span>
            </div>
        </div>

        <!-- FACTIONS-->
        <p class="text-3xl font-bold mt-6">Factions</p>
        <p class="text-lg">Faction levels coming soon!</p>
    </div>
</div>