import {api} from "./instance.js";
import store from "../support/redux/store.js";
import {isLoading, refreshContent} from "../support/redux/contentSlice.js";
import {getQueryString} from "./Utils.js";
import {toast} from "sonner";
import {closeModal} from "../support/redux/modalSlice.js";

const saveQuestion = async (question) => {
    try {
        store.dispatch(isLoading(true));
        const response = await api.post(`/questions/save`, question);
        if (response && response.status === 200) {
            console.log(response)
            store.dispatch(refreshContent());
            store.dispatch(closeModal());
            toast.success("문제 등록완료");
            return response.data.result;
        }
    } catch (error) {
        console.log(error);
    } finally {
        store.dispatch(isLoading(false));
    }
}

const getQuestionsByExamId = async (pageable, data) => {
    try {
        store.dispatch(isLoading(true));
        const response =
            await api.post(`/exams/${data.examId}/questions?${getQueryString(pageable)}`, data);
        if (response && response.status === 200) {
            return response.data.result;
        }
    } catch (error) {
        console.log(error);
    } finally {
        store.dispatch(isLoading(false));
    }

}

const getTotalQuestionsByExamId = async (data) => {
    try {
        store.dispatch(isLoading(true));
        const response = await api.post(`/questions/${data.examId}/total`, data);
        if (response && response.status === 200) {
            return response.data.result;
        }
    } catch (error) {
        console.log(error);
    } finally {
        store.dispatch(isLoading(false));
    }
}

export {
    saveQuestion,
    getTotalQuestionsByExamId,
    getQuestionsByExamId,
}
