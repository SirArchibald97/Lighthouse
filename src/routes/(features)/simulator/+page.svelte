<script>
    import UpArrow from "$lib/svgs/UpArrow.svelte";
    import DownArrow from "$lib/svgs/DownArrow.svelte";
    import { openables, items, openTreasure, openReward, openMaterial } from "$lib/simulator.js";
            
    let showMenu = false;
    function toggleMenu() { showMenu = !showMenu; }

    let selectedOption = openables[0];
    function selectOption(option) {
        selectedOption = option;
        showMenu = false;
    }

    let amount = 1;
    let fixedAmount = 1;
    let rewards = [];
    let error = false;
    function open() {
        fixedAmount = amount;
        rewards = [];
        error = false;

        if (amount < 1 || amount > 10_000_000) {
            error = "Invalid amount entered!";
            amount = 1;
            return;
        }

        if (selectedOption.crate === "treasure") {
            rewards = openTreasure(selectedOption.type, amount);
        } else if (selectedOption.crate === "reward") {
            rewards = openReward(selectedOption.type, amount);
        } else {
            rewards = openMaterial(selectedOption.type, amount);
        }
    }

    const colours = {
        "common": "border-common bg-common/10",
        "uncommon": "border-uncommon bg-uncommon/10",
        "rare": "border-rare bg-rare/10",
        "epic": "border-epic bg-epic/10",
        "legendary": "border-legendary bg-legendary/10",
        "mythic": "border-mythic bg-mythic/10",
    };
</script>

<svelte:head>
    <title>Openable Simulator • Lighthouse</title>
</svelte:head>
<div class="flex-1 flex flex-col text-neutral-900 dark:text-neutral-100">
    <p class="text-3xl sm:text-4xl font-semibold m-2 sm:m-4 text-center">Openable Simulator</p>

    <div class="border border-neutral-300 dark:border-neutral-800 rounded-sm p-4 sm:self-start w-full my-2">
        <div class="flex flex-col sm:flex-row gap-x-4 gap-y-2 sm:gap-y-0">
            <!-- SELECT MENU -->
            <div class="flex-1 sm:w-96 sm:flex-none">
                <div class="relative">
                    <button type="button" on:click={toggleMenu} class="relative w-full cursor-default rounded-md bg-white dark:bg-neutral-800 py-1.5 pl-3 pr-10 text-left text-neutral-900 dark:text-neutral-100 shadow-sm ring-1 ring-inset ring-neutral-300 dark:ring-neutral-700 focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-sm sm:leading-6">
                        <span class="flex items-center">
                            <img src={selectedOption.icon} alt="" class="h-5 w-5 flex-shrink-0 rounded-sm">
                            <span class="ml-3 block truncate text-lg">{selectedOption.name}</span>
                        </span>
                        <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <svg class="h-5 w-5 text-neutral-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
                            </svg>
                        </span>
                    </button>
            
                    {#if showMenu}
                        <ul class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-neutral-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm no-scrollbar">
                            {#each openables as option}
                                <button on:click={() => selectOption(option)} class="w-full relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-slate-200 dark:hover:bg-neutral-700 duration-75">
                                    <div class="flex items-center">
                                        <img src={option.icon} alt="" class="h-5 w-5 flex-shrink-0 rounded-sm">
                                        <span class="ml-3 block truncate font-normal text-lg">{option.name}</span>
                                    </div>
            
                                    {#if selectedOption.name === option.name}
                                        <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-red-500">
                                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                        </span>
                                    {/if}
                                </button>
                            {/each}
                        </ul>
                    {/if}
                </div>   
            </div>

            <div class="flex flex-row gap-x-4 gap-y-2 sm:gap-y-0">
                <div class="flex-1 self-center text-lg rounded-md bg-white dark:bg-neutral-800 py-1.5 pl-3 pr-10 text-leftshadow-sm ring-1 ring-inset ring-neutral-300 dark:ring-neutral-700 focus:ring-2 focus:ring-red-500">
                    <input class="focus:outline-none w-full bg-white dark:bg-neutral-800" name="amount" type="number" placeholder="Amount" max="10000" min="1" bind:value={amount} />
                </div>
    
                <button on:click={open} class="flex flex-row justify-center items-center text-center self-center text-lg rounded-md bg-red-500 py-1.5 pl-3 pr-10 text-slate-50 shadow-sm hover:bg-red-600">
                    Open
                </button>
            </div>

            {#if error}<p class="self-center text-lg text-red-500">{error}</p>{/if}
        </div>

        <div class="mt-4">
            {#if rewards.length > 0}
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {#each rewards as reward}
                        <div class={`flex flex-row gap-x-2 border-2 ${colours[items.find(i => i.name === reward.item)?.rarity] || "border-common bg-common/10"} p-2 rounded-md shadow-md`}>
                            <img src={items.find(i => i.name === reward.item)?.icon || ""} alt="" class="place-self-center h-12 w-12 sm:h-16 sm:w-16" />
                            <div class="flex flex-col text-sm md:text-lg">
                                <p class="font-semibold">{reward.amount.toLocaleString()}x {reward.item}{reward.amount > 1 && reward.item !== "Coins" && reward.item !== "Silver" && reward.item !== "Material Dust" ? "s" : ""}</p>
                                <p class="flex flex-col">
                                    <span class="flex flex-row gap-x-1 leading-tight">
                                        {#if reward.average * fixedAmount < reward.amount}
                                            <span class="w-4 h-4 self-center"><UpArrow /></span> {reward.amount / fixedAmount} per open (above average)
                                        {:else}
                                            <span class="w-4 h-4 self-center"><DownArrow /></span> {reward.amount / fixedAmount} per open (below average)
                                        {/if}
                                    </span>
                                    <span>Expected {reward.average.toLocaleString()} per open</span>
                                </p>
                            </div>
                        </div>
                    {/each}
                </div>
            {:else}
                <p class="text-center text-lg mt-4">Nothing here yet...</p>
            {/if}
        </div> 
    </div>
</div>