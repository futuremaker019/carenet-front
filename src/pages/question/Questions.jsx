import React, {useRef, useState} from 'react';
import {useInView} from "react-intersection-observer";
import TitleCard from "../../components/cards/TitleCard.jsx";
import {useDispatch} from "react-redux";
import {openModal} from "../../support/redux/modalSlice.js";
import {MODAL_TYPES} from "../../support/constants/constans.js";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/outline/index.js";
import DocumentIcon from "@heroicons/react/24/outline/DocumentIcon.js";
import {exams, getDummyStatus, questions} from "../../dummy/dummy.jsx";
import {useNavigate, useParams} from "react-router-dom";

/**
    생성된 문제 목록 페이지
 */
const Questions = () => {
    const initPageable = {
        size: 15,
        page: 0,
        sort: 'createdAt,desc',
        last: false
    }
    const [ref, inView] = useInView({threshold: 0.5});
    // const [questions, setQuestions] = useState([]);
    const [pageable, setPageable] = useState(initPageable);
    const [search, setSearch] = useState({name: ""});
    const [count, setCount] = useState(10);

    const {examId} = useParams();
    const navigate = useNavigate();

    const scrollContainerRef = useRef(null); // 스크롤 컨테이너 ref 추가
    const isFirstRender = useRef(true); // 첫 렌더링 여부를 추적

    const handleDeleteQuestion = () => {}
    const handleMoveToView = (questionId) => {
        navigate(`/exams/${examId}/questions/${questionId}`);
    }

    return (
        <TitleCard title="목록 페이지" topMargin="mt-2" TopSideButtons={<TopSideButtons/>}>
            <div className="overflow-x-auto w-full h-[70vh]" ref={scrollContainerRef}>
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th className={`w-[100px]`}>순서</th>
                        <th>제목</th>
                        <th className={"w-[150px]"}>상태</th>
                        <th className={"w-[150px]"}>코드</th>
                        <th className={"w-[150px]"}>등록자</th>
                        <th className={"w-[200px]"}>등록일</th>
                        <th className={"w-[150px]"}>관리</th>
                    </tr>
                    </thead>
                    <tbody>
                    {questions && questions.length > 0 ? (
                        questions.map((item, index) => (
                            <tr key={index}>
                                <td>{count && count - index}</td>
                                <td>
                                    <div className={`cursor-pointer`} onClick={() => handleMoveToView(item.id)}>{item.name}</div>
                                </td>
                                <td>
                                    {getDummyStatus(index)}
                                </td>
                                <td>{item.code.name}</td>
                                <td>{item.createUser.name}</td>
                                <td>{item.createdAt}</td>
                                <td>
                                    <button className="btn btn-xs btn-square btn-ghost"
                                            onClick={() => handleDeleteQuestion(item.id, index)}>
                                        <TrashIcon className="w-5 h-5"/>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">
                                <div className="hero bg-base-200 flex items-center justify-center h-[60vh]">
                                    <div className="hero-content text-accent text-center">
                                        <div className="max-w-md w-[50rem]">
                                            <DocumentIcon className="h-14 w-14 inline-block"/>
                                            <h1 className="text-xl mt-2 font-bold">No Data</h1>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <div ref={ref} className={'h-[20px]'}></div>
            </div>
        </TitleCard>
    );
};

export default Questions;

const TopSideButtons = () => {

    const dispatch = useDispatch()

    const openAddNewLeadModal = () => {
        dispatch(openModal({title: "문제 등록", bodyType: MODAL_TYPES.EXAM_CREATE}))
    }

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>
                등록
            </button>
        </div>
    )
}