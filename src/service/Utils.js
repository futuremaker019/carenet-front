import {AxiosError} from "axios";
import store from "../support/redux/store.js";
import {isLoading} from "../support/redux/contentSlice.js";
import {toast} from "sonner";

export const getQueryString = (pageable) => {
    return Object.entries(pageable)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}

export const handleErrorResponse = (error) => {
    if (error instanceof AxiosError) {
        const data = error.response.data;
        const status = error.response.status;
        return {data, status};
    }
    return error;
}

export const initSlicePageable = {
    size: 15,
    page: 0,
    sort: 'createdAt,desc',
    last: false
}

export const apiRequest = async (fetchMethod, success) => {
    try {
        store.dispatch(isLoading(true));
        const response = await fetchMethod();
        if (response && response.status === 200) {
            if (success) success();
            return response.data.result;
        } else {
            // 200 외의 http status
            toast.error("서버에러");
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            const status = error.response.status;
            const data = error.response.data;
            return { status, data };
        }
    } finally {
        store.dispatch(isLoading(false));
    }
};
