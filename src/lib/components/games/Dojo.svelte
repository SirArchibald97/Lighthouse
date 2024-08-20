<script>
	import Badges from "$lib/components/games/Badges.svelte";

    export let stats;
</script>

<div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 mt-2 text-md">
        <div>
            <p>Unique Medals: <span class="font-semibold">{stats.unique_medals.toLocaleString()}</span></p>
            <p>Total Medals: <span class="font-semibold">{stats.total_medals.toLocaleString()}</span></p>
        </div>
        <div>
            <p>Unique Standard Completions: <span class="font-semibold">{stats.unique_standard.toLocaleString()}</span></p>
            <p>Unique Advanced Completions: <span class="font-semibold">{stats.unique_advanced.toLocaleString()}</span></p>
            <p>Unique Expert Completions: <span class="font-semibold">{stats.unique_expert.toLocaleString()}</span></p>
        </div>
        <div>
            <p>Total Standard Completions: <span class="font-semibold">{stats.total_standard.toLocaleString()}</span></p>
            <p>Total Advanced Completions: <span class="font-semibold">{stats.total_advanced.toLocaleString()}</span></p>
            <p>Total Expert Completions: <span class="font-semibold">{stats.total_expert.toLocaleString()}</span></p>
        </div>
    </div>

    <Badges {stats} game="dojo" />
</div>