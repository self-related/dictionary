interface LinkGetterParams {
    sourceText: string,
    sourceLang: string,
    targetLang: string,
    // add more if needed
}


export type LinkGetter = (params: LinkGetterParams) => string;


export interface Providers {
    [key: string]: LinkGetter 
}


export interface LangList {
    [key: string]: string
}


export interface TranslateQuery {
    api: string,
    sourceLang: string,
    sourceText: string,
    targetLang: string,
    extra?: unknown // add if needed for some endpoints
}