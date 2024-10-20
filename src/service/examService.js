import {api} from "./instance.js";

const saveExam = async (data) => {
    try {
        return await api.post('/exams/save', data);
    } catch (error) {
        console.log(error);
    }
}

export {
    saveExam
}