import { browser } from "$app/environment";
import { writable } from "svelte/store";

const defaultTheme = "light";
const intialTheme = browser ? window.localStorage.getItem('theme') ?? defaultTheme : defaultTheme;
  
const theme = writable(intialTheme);
 
theme.subscribe((value) => {
    console.log("Theme changed!")
    if (browser) {
        window.localStorage.setItem('theme', value);
    }
});
 
export default theme;

