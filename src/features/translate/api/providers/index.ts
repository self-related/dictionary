import { getUrlGoogle, langListGoogle } from "./google";
import type { LangList, TranslateQueryData } from "../types";


interface LangListByProvider {
    [provider: string]: LangList
}


const providerUrlGetters = {
    google: getUrlGoogle,
}


export const langListByProvider: LangListByProvider = {
    google: langListGoogle
}


export function getUrl({ provider, ...rest }: TranslateQueryData) {
    const url = providerUrlGetters[provider](rest);
    return url;
}