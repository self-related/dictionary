import type { LangList, TranslateQueryPayload, TranslateResult, TranslationVerbose } from "../types";

const BASE_URL = "https://translate.googleapis.com";


interface TranslateResponseGoogle {
    sentences: [{
        orig: string,
        trans: string,
        backend: number // something
    }],
    dict?: { // more translations, structured by pos (word classes)
        pos: string,      // word class: noun, verb, adjective, etc
        terms: string[],  // words for this word class
        entry: object[],    // same as terms but with unnecessary info
        base_form: string
    }[],
    src: string,
    spell: object
}


export function getUrlGoogle({ sourceText, sourceLang, targetLang }: TranslateQueryPayload): string {
    return `${BASE_URL}/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&dt=bd&dj=1&q=${sourceText}`;
};


export function transformResponseDataGoogle(responseValue: unknown): TranslateResult {
    const data = responseValue as TranslateResponseGoogle;
    const translation = (data.sentences) ? data.sentences[0].trans : "";
    const moreTranslations: TranslationVerbose[] = [];

    if (data.dict != null) {
        for (const dictEntry of data.dict) {
            if (!dictEntry.terms) break;
            const wordClass = dictEntry.pos;
    
            for (const term of dictEntry.terms) {
                moreTranslations.push({translation: term, wordClass})
            }
        }
    }
    
    const translateResult: TranslateResult = {
        translation,
        moreTranslations
    }

    return translateResult;
}


export const langListGoogle: LangList = {
    auto: "Auto",
    en: "English",
    "zh-CN": "Chinese (Simplified)",
    "zh-TW": "Chinese (Traditional)",
    cs: "Czech",
    eo: "Esperanto",
    nl: "Dutch",
    et: "Estonian",
    fi: "Finnish",
    ga: "Irish",
    it: "Italian",
    ja: "Japanese",
    kk: "Kazakh",
    ko: "Korean",
    la: "Latin",
    mn: "Mongolian",
    no: "Norwegian",
    pl: "Polish",
    ro: "Romanian",
    ru: "Russian",
    es: "Spanish",
    sv: "Swedish",
    th: "Thai",
    tr: "Turkish",
    uk: "Ukrainian"
};