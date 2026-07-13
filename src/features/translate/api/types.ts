export interface LangList {
    [lang: string]: string
}

export interface TranslateQueryPayload {
    provider: string,
    sourceLang: string,
    sourceText: string,
    targetLang: string,
    extra?: unknown // add if needed for some endpoints
}

export interface TranslationVerbose {
    translation: string,
    wordClass: string
}

export interface TranslateResult {
    translation: string,
    moreTranslations: TranslationVerbose[]
}