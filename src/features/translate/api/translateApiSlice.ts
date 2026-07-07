import { createApi, fetchBaseQuery }  from "@reduxjs/toolkit/query/react";
import { type TranslateQueryData } from "./types";
import { getUrl } from "./providers";


export const translateApiSlice = createApi({
    reducerPath: "translateApi",
    baseQuery: fetchBaseQuery(),
    endpoints: builder => ({
        getTranslation: builder.query<string, TranslateQueryData>({
            query: (queryData) => getUrl(queryData),
        })
    })
});

export const { useLazyGetTranslationQuery } = translateApiSlice;