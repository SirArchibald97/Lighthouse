<script>
    import LeftArrow from "$lib/svgs/LeftArrow.svelte";
    import Trash from "$lib/svgs/Trash.svelte";

    export let data;

    let playerStates = [null, null];
    function setPlayerState(index, state) { playerStates[index] = state; console.log("Updated state for player " + index + " to " + state); }

    let favouriteSelected = [null, null];
    function setFavouriteSelected(index, favourite) { favouriteSelected[index] = favourite; }
</script>

<svelte:head>
    <title>MCC Island Stats by SirArchibald</title>
    <meta name="description" content={`Compare two players' stats on MCC Island Stats by SirArchibald, including game stats, currency, socials and more!`} />
</svelte:head>
<main class="flex flex-row gap-x-8 justify-center items-center my-8 mx-8">
    <!-- loop through both player cards -->
    {#each playerStates as state, count}
        <div class="bg-slate-50 border-l-4 border-l-red-500 rounded-sm p-4 w-full">
            <!-- default state when there is no player loaded and no button has been clicked -->
            {#if !playerStates[count]}
                <div class="flex flex-col justify-center items-center self-center border-dashed border-2 border-slate-200 rounded-md py-44">
                    <button on:click={() => setPlayerState(count, "search")} class="bg-slate-200 hover:bg-slate-300 hover:scale-105 px-4 py-2 rounded-md text-lg font-semibold">
                        Search for a username
                    </button>
                    <p class="text-md my-2">or</p>
                    <button on:click={() => setPlayerState(count, "favourite")} class="bg-slate-200 hover:bg-slate-300 hover:scale-105 px-4 py-2 rounded-md text-lg font-semibold">
                        Add a favourite
                    </button>
                </div>

            <!-- search state for when no player is loaded and the search button has been clicked -->
            {:else if playerStates[count] === "search"}
                <div class="flex flex-col justify-center items-center self-center border-dashed border-2 border-slate-200 rounded-md py-44">
                    
                    <button on:click={() => setPlayerState(count, null)} class="bg-slate-200 hover:bg-slate-300 hover:scale-105 px-4 py-2 rounded-md text-lg font-semibold">
                        <div class="flex flex-row gap-x-2">
                            <span class="h-6 w-6 self-center"><LeftArrow /></span><span class="self-center">Go back</span>
                        </div>
                    </button>
                </div>

            <!-- favourite state for when no player is loaded and the favourites button has been clicked -->
            {:else if playerStates[count] === "favourite"}
                <div class="flex flex-col justify-center items-center self-center border-dashed border-2 border-slate-200 rounded-md py-44">
                    {#if data.favourites.length === 0}
                        <div class="">
                            No favourites set!
                        </div>
                    {:else}
                        <form method="POST" action="?/comparelookup" class="flex flex-col gap-y-2">
                            <input type="text" name="player" value={count} class="hidden" />
                            <input type="text" name="uuid" bind:value={favouriteSelected} class="hidden" />
                            {#each data.favourites as favourite}
                                <button on:click={() => setFavouriteSelected(count, favourite.uuid)} type="submit" class="flex flex-row bg-slate-200 hover:bg-slate-300 hover:scale-105 px-3 py-1 rounded-md">
                                    <img src={`https://crafatar.com/avatars/${favourite.uuid}?overlay`} alt={``} class="w-8 h-8 rounded-sm self-center" />
                                    <span class="ml-2 text-lg self-center">{favourite.username}</span>
                                </button>
                            {/each}
                        </form>
                    {/if}
                    
                    <button on:click={() => setPlayerState(count, null)} class="bg-slate-200 hover:bg-slate-300 hover:scale-105 px-4 py-2 rounded-md text-md font-semibold mt-4">
                        <div class="flex flex-row gap-x-2">
                            <span class="h-4 w-4 self-center"><LeftArrow /></span><span class="self-center">Go back</span>
                        </div>
                    </button>
                </div>

            <!-- else catch for when the player is loaded -->
            {:else}
                <div class="flex flex-col justify-center items-center self-center border-dashed border-2 border-slate-200 rounded-md py-44">
                    <button on:click={() => setPlayerState(count, null)} class="bg-slate-200 hover:bg-slate-300 hover:scale-105 px-4 py-2 rounded-md text-lg font-semibold">
                        <div class="flex flex-row gap-x-2">
                            <span class="h-6 w-6 self-center"><Trash /></span><span class="self-center">Clear</span>
                        </div>
                    </button>
                </div>
            {/if}
        </div>
    {/each}
</main>