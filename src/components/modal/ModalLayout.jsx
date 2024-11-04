import React from 'react';
import {closeModal} from "../../support/redux/modalSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {MODAL_TYPES} from "../../support/constants/constans.js";
import ExamCreateModal from "./ExamCreateModal.jsx";
import QuestionCreateModal from "./QuestionCreateModal.jsx";

const ModalLayout = () => {
    const {isOpen, bodyType, size, data, title} = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const close = () => {
        dispatch(closeModal())
    }

    return(
        <>
            {/* The button to open modal */}

            {/* Put this part before </body> tag */}
            <div className={`modal ${isOpen ? "modal-open" : ""}`}>
                <div className={`modal-box  ${size === 'lg' ? 'max-w-5xl' : ''}`}>
                    <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => close()}>✕</button>
                    <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>


                    {/* Loading modal body according to different modal type */}
                    {
                        {
                            [MODAL_TYPES.EXAM_CREATE] : <ExamCreateModal data={data} closeModal={close} />,
                            [MODAL_TYPES.QUESTION_CREATE] : <QuestionCreateModal data={data} closeModal={close}/>,
                            [MODAL_TYPES.DEFAULT] : <div></div>
                        }[bodyType]
                    }
                </div>
            </div>
        </>
    )
};

export default ModalLayout;