import {api} from "./instance.js";
import {getQueryString} from "./Utils.js";

const saveExam = async (data) => {
    try {
        return await api.post('/exams/save', data);
    } catch (error) {
        console.log(error);
    }
}

const getExams = async (pageable, search) => {
    try {
        const response = await api.post(`/exams?${getQueryString(pageable)}`, search);
        if (response && response.status === 200) {
            return response.data.result;
        }
    } catch (error) {
        console.log(error);
    }
}

const getTotalExamCount = async (search) => {
    try {
        const response = await api.post(`/exams/total`, search);
        if (response && response.status === 200) {
            return response.data.result;
        }
    } catch (error) {
        console.log(error);
    }
}

export {saveExam, getExams, getTotalExamCount}