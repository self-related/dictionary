import { getUrlGoogle, langListGoogle, transformResponseDataGoogle } from "./google";
import type { LangList, TranslateQueryPayload, TranslateResult } from "../types";


/* Local types */
interface LangListByProvider {
    [provider: string]: LangList
}


/* Groupped imports from each provider */
const providerUrlGetters: { [provider: string]: (data: TranslateQueryPayload) => string } = {
    google: getUrlGoogle,
}

const responseDataTransformers: { [provider: string]: (responseData: unknown) => TranslateResult } = {
    google: transformResponseDataGoogle
}

export const langListsByProvider: LangListByProvider = {
    google: langListGoogle
}


/* Unified functions */
export function getUrl(data: TranslateQueryPayload) {
    const provider = data.provider;
    const url = providerUrlGetters[provider](data);
    return url;
}

export function transformResponseData(responseData: unknown, provider: string) {
    const transformedResponseData = responseDataTransformers[provider](responseData);
    return transformedResponseData;
}