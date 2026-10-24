import { writable } from "svelte/store";
import Pocketbase from "pocketbase";

const _pb = new Pocketbase();
export const pb = writable(_pb);
export const isLoggedIn = writable(_pb.authStore.isValid);
export const user = writable(_pb.authStore.record);

export function updateLoggedIn() {
    isLoggedIn.set(_pb.authStore.isValid);
    user.set(_pb.authStore.record);
}
