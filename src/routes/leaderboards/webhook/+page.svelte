<script>
    export let form;

    let showMenu = false;
    function toggleMenu() { showMenu = !showMenu; }

    import { games } from "$lib/leaderboards.js";

    let selectedOption = games[0].boards[0];
    let optionString = JSON.stringify(selectedOption);
    function selectOption(option) {
        selectedOption = option;
        optionString = JSON.stringify(selectedOption);
        showMenu = false;
    }

    import { onMount } from "svelte";
    onMount(() => {
        document.addEventListener("click", (event) => {
            if (!event.target.closest(".relative")) {
                showMenu = false;
            }
        });
    });
</script>

<svelte:head>
    <title>Leaderboard Webhooks • Lighthouse</title>
</svelte:head>
<div class="flex flex-row justify-center my-4 mx-4">
    <div class="flex flex-col items-center gap-y-4 w-1/2 py-4 border border-neutral-300 dark:border-neutral-800 rounded-md">
        <p class="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Enter a webhook URL</p>
        {#if form?.success === false}<p class="text-red-500 text-lg">{form?.message}</p>{/if}
        
        <div class="flex-1 sm:w-96 sm:flex-none">
            <div class="relative">
                <button type="button" on:click={toggleMenu} class="relative w-full cursor-default rounded-md bg-white dark:bg-neutral-800 py-1.5 pl-3 pr-10 text-left text-neutral-900 dark:text-neutral-100 shadow-sm ring-1 ring-inset ring-neutral-300 dark:ring-neutral-700 focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-sm sm:leading-6">
                    <span class="flex items-center">
                        <img src={selectedOption.icon} alt="" class="h-6 w-6 flex-shrink-0 rounded-sm">
                        <span class="ml-3 block truncate text-lg">{selectedOption.name}</span>
                    </span>
                    <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <svg class="h-5 w-5 text-neutral-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
                        </svg>
                    </span>
                </button>
        
                {#if showMenu}
                    <ul class="absolute z-10 mt-1 max-h-96 w-full overflow-auto rounded-md bg-white dark:bg-neutral-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm no-scrollbar">
                        {#each games as category}
                            <p class="text-lg px-3 py-2 text-neutral-900 dark:text-neutral-100">{category.title}</p>
                            {#each category.boards as option}
                                <button on:click={() => selectOption(option)} class="w-full relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-slate-200 dark:hover:bg-neutral-700 duration-75">
                                    <div class="flex items-center">
                                        <img src={option.icon || category.icon} alt="" class="h-6 w-6 flex-shrink-0 rounded-sm">
                                        <span class="ml-3 block truncate font-normal text-lg text-neutral-900 dark:text-neutral-100">{option.name}</span>
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
                        {/each}
                    </ul>
                {/if}
            </div>   
        </div>

        <form method="POST" action="?/add" class="flex flex-row gap-x-3 sm:w-96 sm:flex-none">
            <input class="bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 rounded-sm w-full" name="webhook" type="text" placeholder="https://discord.com..." />
            <input class="hidden" name="option" bind:value={optionString} />
            <button class="bg-red-500 hover:bg-red-600 dark:bg-red-500/80 dark:hover:bg-red-500/60 rounded-sm px-3" type="submit">Add</button>
        </form>
    </div>
</div>