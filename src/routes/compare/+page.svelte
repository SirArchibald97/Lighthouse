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
<div class="flex flex-row gap-x-8 justify-center items-center">
    
</div>