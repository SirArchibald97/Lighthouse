<script>
    import "../app.css";
</script>

<main class="min-h-screen bg-slate-200 relative pb-16">
    <slot />

    <footer class={`w-full bg-red-500 p-4 absolute bottom-0`}>
        <div>
            <p class="text-center text-slate-100">© 2024 <a href="https://sirarchibald.dev" class="underline hover:text-slate-200">SirArchibald</a> • Not affiliated with Minecraft or Noxcrew!</p>
        </div>
    </footer>
</main>