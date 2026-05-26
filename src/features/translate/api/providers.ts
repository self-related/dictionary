import { getGoogleUrl, googleLangList } from "./providers/google";
import type { LangList, Providers } from "./types";


export const providers: Providers = {
    google: getGoogleUrl
};


export const langLists: {[key: string]: LangList} = {
    google: googleLangList
}