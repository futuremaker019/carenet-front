import {apiRequest, getQueryString} from "./Utils.js";
import {api} from "./instance.js";
import {toast} from "sonner";

const updateSelection = async (data) => {
    return apiRequest(
        () => api.put(`/selections`, data),
        () => {
            toast.success("수정 완료");
        });
}

export {
    updateSelection
}