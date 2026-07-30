export const dictionaryNamesGlobal = {
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
} as {[id: string]: string};


export function getLanguageNamesFromDictionaryId(dictionaryId: string): [string | null, string | null] {
    const [sourceLangId, targetLangId] = dictionaryId?.split(";") ?? [];
    const sourceLang = dictionaryNamesGlobal[sourceLangId];
    const targetLang = dictionaryNamesGlobal[targetLangId];

    return [sourceLang, targetLang];
}

export function getDictionaryName(dictionaryId: string): string | null {
    const [sourceLang, targetLang] = getLanguageNamesFromDictionaryId(dictionaryId);

    if (sourceLang && targetLang) {
        return `${sourceLang} - ${targetLang}`;
    } else {
        return null;
    }
}