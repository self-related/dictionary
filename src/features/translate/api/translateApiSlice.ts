import { createApi, fetchBaseQuery }  from "@reduxjs/toolkit/query/react";
import { type TranslateQuery } from "./types";
import { providers } from "./providers";


export const translateApiSlice = createApi({
    reducerPath: "translateApi",
    baseQuery: fetchBaseQuery(),
    endpoints: builder => ({
        getTranslation: builder.query<string, TranslateQuery>({
            query: ({api, ...rest}) => providers[api](rest),
        })
    })
});

export const { useLazyGetTranslationQuery } = translateApiSlice;