import {api} from "./instance.js";
import store from "../support/redux/store.js";
import {isLoading, refreshContent} from "../support/redux/contentSlice.js";
import {apiRequest, getQueryString, handleErrorResponse} from "./Utils.js";
import {toast} from "sonner";
import {closeModal} from "../support/redux/modalSlice.js";

const saveQuestion = async (question) => {
    return apiRequest(
        () => api.post(`/questions/save`, question),
        () => {
            store.dispatch(refreshContent());
            store.dispatch(closeModal());
            toast.success("문제 등록완료");
        });
}

const getQuestionsByExamId = async (pageable, data) => {
    return apiRequest(() =>
        api.post(`/exams/${data.examId}/questions?${getQueryString(pageable)}`, data));
}

const getTotalQuestionsByExamId = async (data) => {
    return apiRequest(() =>
        api.post(`/questions/${data.examId}/total`, data));
}

const getQuestion = async (data) => {
    return apiRequest(() =>
        api.get(`/questions/${data.questionId}`));
}

const updateArticle = (data) => {
    return apiRequest(() => api.put(`/questions`, data),
        () => {
            toast.success("본문 수정완료");
        });
}

export {
    saveQuestion,
    getTotalQuestionsByExamId,
    getQuestionsByExamId,
    getQuestion,
    updateArticle
}
