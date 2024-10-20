import React, {useState} from 'react';
import {closeModal} from "../../support/redux/modalSlice.js";
import TextInput from "../input/TextInput.jsx";
import {useDispatch} from "react-redux";
import ExclamationTriangleIcon from "@heroicons/react/24/outline/ExclamationTriangleIcon";
import {saveExam} from "../../service/examService.js";

const ExamCreateModal = () => {
    const [exam, setExam] = useState({name: ""});
    const [alert, setAlert] = useState(false);
    const dispatch = useDispatch()

    const save = async () => {
        if (!exam.name) setAlert(true);
        const response = await saveExam(exam);
        if (response && response.status === 200) {
            console.log(response.data);
        }
    }

    return(
        <div className={"flex flex-col gap-4"}>
            <TextInput
                defaultValue={exam.name} required
                type="text" labelTitle="모의고사 명" setState={setExam} target={'name'}
            />
            {alert &&
                <div role="alert" className="alert -py-4">
                    <ExclamationTriangleIcon className={'h-6 w-6 shrink-0 stroke-current'}/>
                    <span>모의고사 명을 입력하세요.</span>
                </div>
            }
            <div className="modal-action">
                <button className="btn btn-primary px-6" onClick={() => save()}>저장</button>
                <button className="btn btn-ghost" onClick={() => dispatch(closeModal())}>취소</button>
            </div>
        </div>
    )
};

export default ExamCreateModal;