export interface LangList {
    [lang: string]: string
}


export interface TranslateQueryData {
    provider: string,
    sourceLang: string,
    sourceText: string,
    targetLang: string,
    extra?: unknown // add if needed for some endpoints
}