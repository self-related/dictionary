import { createApi, fetchBaseQuery }  from "@reduxjs/toolkit/query/react";
import { type TranslateQueryData, type TranslateResult } from "./types";
import { getUrl, transformResponseData } from "./providers";


export const translateApiSlice = createApi({
    reducerPath: "translateApi",
    baseQuery: fetchBaseQuery(),
    endpoints: builder => ({
        getTranslation: builder.query<TranslateResult, TranslateQueryData>({
            query: (queryData) => ({
                url: getUrl(queryData)
            }),
            transformResponse: (responseData, _meta, { provider }) => transformResponseData(responseData, provider)
        })
    })
});

export const { useLazyGetTranslationQuery } = translateApiSlice;