import { getGoogleUrl } from "./google";
import type { Providers } from "./types";


export const providers: Providers = {
    google: getGoogleUrl
};