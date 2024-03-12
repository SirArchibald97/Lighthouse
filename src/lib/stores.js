import { writable } from "svelte/store";

function createPlayer() {
    const { subscribe, set, update } = writable(new Map());

    return {
        subscribe,
        set: (player) => set(player),
        update: () => update(player => player),
    };
}

export const playerData = createPlayer();