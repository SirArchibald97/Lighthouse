<script>
    export let data;
</script>

<footer class={`w-full bg-red-500 p-4 ${!data?.player?.username && data !== null ? "sm:absolute sm:bottom-0" : "sm:relative"}`}>
    <p class="text-center text-slate-100">
        © 2024 <a href="https://sirarchibald.dev" class="underline hover:text-slate-200">SirArchibald</a> 
        • Not affiliated with Minecraft or Noxcrew!
    </p>
</footer>