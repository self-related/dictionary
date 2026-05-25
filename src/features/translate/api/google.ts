import type { LinkGetter } from "./types";


export const getGoogleUrl: LinkGetter = ({sourceText, sourceLang, targetLang}) => {
    // no base url
    return `translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&dt=bd&dj=1&q=${sourceText}`;
};