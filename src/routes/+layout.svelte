<script>
    import "../app.css";
    import { inject } from '@vercel/analytics';
    import { DEV } from "$env/static/public";
    inject({ mode: DEV ? "development" : "production" });
</script>

<main class="bg-slate-200">
    <slot />
</main>