<script>
    import "../app.css";
    import { inject } from '@vercel/analytics';
    inject();
</script>

<main class="bg-slate-200">
    <slot />
</main>