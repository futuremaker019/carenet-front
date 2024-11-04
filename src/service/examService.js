import {api} from "./instance.js";
import {getQueryString} from "./Utils.js";
import store from "../support/redux/store.js";
import {isLoading} from "../support/redux/contentSlice.js";

const saveExam = async (data) => {
    try {
        store.dispatch(isLoading(true));
        return await api.post('/exams/save', data);
    } catch (error) {
        console.log(error);
    } finally {
        store.dispatch(isLoading(false));
    }
}

const getExams = async (pageable, search) => {
    try {
        store.dispatch(isLoading(true));
        const response = await api.post(`/exams?${getQueryString(pageable)}`, search);
        if (response && response.status === 200) {
            return response.data.result;
        }
    } catch (error) {
        console.log(error);
    } finally {
        store.dispatch(isLoading(false));
    }
}

const getTotalExamCount = async (search) => {
    try {
        store.dispatch(isLoading(true));
        const response = await api.post(`/exams/total`, search);
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
    saveExam,
    getExams,
    getTotalExamCount,
}