import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {closeModal} from "../../support/redux/modalSlice.js";
import {saveQuestion} from "../../service/questionService.js";
import TextInput from "../input/TextInput.jsx";
import ExclamationTriangleIcon from "@heroicons/react/24/outline/ExclamationTriangleIcon.js";
import PropTypes from "prop-types";

const QuestionCreateModal = ({data}) => {
    const [question, setQuestion] = React.useState(
        {name: "", examId: data.examId}
    );
    const [alert, setAlert] = useState(false);
    const dispatch = useDispatch()

    const save = async () => {
        if (!question.name) {
            setAlert(true);
            return;
        }
        await saveQuestion(question);
    }

    return (
        <div>
            <div className={"flex flex-col gap-4"}>
                <TextInput
                    defaultValue={question.name} required
                    type="text" labelTitle="문제 제목" setState={setQuestion} target={'name'}
                    keyDownMethod={save}
                />
                {alert &&
                    <div role="alert" className="alert -py-4">
                        <ExclamationTriangleIcon className={'h-6 w-6 shrink-0 stroke-current'}/>
                        <span>문제 제목을 입력하세요.</span>
                    </div>
                }
                <div className="modal-action">
                    <button type={'button'} className="btn btn-primary px-6" onClick={save}>저장</button>
                    <button type={'button'} className="btn btn-ghost" onClick={() => dispatch(closeModal())}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default QuestionCreateModal;


QuestionCreateModal.propTypes = {
    data: PropTypes.object,
}