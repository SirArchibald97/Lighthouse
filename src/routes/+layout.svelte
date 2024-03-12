<script>
    import "../app.css";
    import Search from "../svgs/Search.svelte";
</script>

<main class="bg-slate-50">
    <div class="bg-red-500">
        <!-- search -->
        <div class="max-w-sm mx-auto py-3">
            <form method="POST">
                <div class="flex flex-row bg-red-100 rounded-full px-3 py-1">
                    <span class="px-2 pr-2 border-1 border-red-400 border-r"><Search /></span>
                    <input class="bg-red-100 focus:outline-none pl-3" name="username" type="text" placeholder="Username" />
                </div>
            </form>
        </div>
    </div>

    <slot />
</main>