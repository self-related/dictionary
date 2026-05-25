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