import { createApi, fetchBaseQuery }  from "@reduxjs/toolkit/query/react";
import { type TranslateQueryPayload, type TranslateResult } from "./types";
import { getUrl, transformResponseData } from "./providers";


export const translateApiSlice = createApi({
    reducerPath: "translateApi",
    baseQuery: fetchBaseQuery(),
    endpoints: builder => ({
        getTranslation: builder.query<TranslateResult, TranslateQueryPayload>({
            query: (queryPayload) => ({
                url: getUrl(queryPayload)
            }),
            transformResponse: (responseData, _meta, { provider }) => transformResponseData(responseData, provider)
        })
    })
});

export const { useLazyGetTranslationQuery } = translateApiSlice;
export const selectGetTranslationResult = translateApiSlice.endpoints.getTranslation.select;