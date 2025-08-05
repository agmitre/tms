// types/global_utility.ts
import { useEffect, useState } from "react";
import type { ISODateString } from "../types/types";


export const nowISO = (): ISODateString => new Date().toISOString();

export function toSentenceCase(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}


export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) setMatches(media.matches);
        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [matches, query]);
    return matches;
}