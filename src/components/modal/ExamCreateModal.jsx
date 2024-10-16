import React from 'react';
import {closeModal} from "../../support/redux/modalSlice.js";
import TextInput from "../input/TextInput.jsx";

const ExamCreateModal = () => {

    const save = () => {

    }

    return(
        <div className={"flex flex-col gap-4"}>
            <div>
                <TextInput type="text" labelTitle="모의고사 명" required/>
            </div>
            <div>
                <TextInput type="text" labelTitle="순서"/>
            </div>
            {/*<ErrorText styleClass="mt-16">{errorMessage}</ErrorText>*/}
            <div className="modal-action">
                <button  className="btn btn-primary px-6" onClick={() => save()}>저장</button>
                <button  className="btn btn-ghost" onClick={() => closeModal()}>취소</button>
            </div>
        </div>
    )
};

export default ExamCreateModal;