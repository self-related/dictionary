import { getGoogleUrl, googleLangList } from "./google";
import type { LangList, TranslateQueryData } from "../types";


const providerUrlGetters = {
    google: getGoogleUrl,
}


export const langLists: { [provider: string]: LangList } = {
    google: googleLangList
}


export function getUrl({ provider, ...rest }: TranslateQueryData) {
    const url = providerUrlGetters[provider](rest);
    return url;
}