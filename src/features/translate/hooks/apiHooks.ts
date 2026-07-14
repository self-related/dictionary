import { useAppSelector } from "../../../app/model/store/hooks";
import { translateApiSlice } from "../api/translateApiSlice";
import { selectTranslateQueryPayload } from "../model/translateSlice";


export const useSelectTranslateQueryLastResult = () => {
    const lastPayload = useAppSelector(selectTranslateQueryPayload);
    const lastResult = useAppSelector(translateApiSlice.endpoints.translate.select(lastPayload));
    return lastResult.data;
};