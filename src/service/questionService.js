import {api} from "./instance.js";

const getQuestionsByExam = async (examId) => {
    try {
        const response = await api.get(`/exams/${examId}/questions`);
        if (response && response.status === 200) {
            return response.data.result;
        }
    } catch (error) {
        console.log(error);
    }
}

const saveQuestion = async (question) => {

}

export {
    getQuestionsByExam,
    saveQuestion
}