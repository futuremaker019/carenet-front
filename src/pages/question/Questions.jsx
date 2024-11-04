import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useInView} from "react-intersection-observer";
import TitleCard from "../../components/cards/TitleCard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {openModal} from "../../support/redux/modalSlice.js";
import {MODAL_TYPES} from "../../support/constants/constans.js";
import {TrashIcon} from "@heroicons/react/24/outline/index.js";
import DocumentIcon from "@heroicons/react/24/outline/DocumentIcon.js";
import {getDummyStatus} from "../../dummy/dummy.jsx";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {initSlicePageable} from "../../service/Utils.js";
import {getQuestionsByExamId, getTotalQuestionsByExamId} from "../../service/questionService.js";
import PropTypes from "prop-types";
import TextInput from "../../components/input/TextInput.jsx";

/**
    생성된 문제 목록 페이지
 */
const Questions = () => {
    const [ref, inView] = useInView({threshold: 0.5});
    const [questions, setQuestions] = useState([]);
    const [pageable, setPageable] = useState(initSlicePageable);
    const [search, setSearch] = useState({name: ""});
    const [count, setCount] = useState(0);

    const location = useLocation();
    const navigate = useNavigate();
    const {id} = useParams();

    const scrollContainerRef = useRef(null);    // 스크롤 컨테이너 ref 추가
    const isFirstRender = useRef(true);      // 첫 렌더링 여부를 추적

    const refresh = useSelector(state => state.content.refresh);

    useEffect(() => {
        if (!pageable.last && inView) {
            handleCallData();
        }
    }, [inView]);

    useEffect(() => {
        if (isFirstRender.current) {
            handleGetTotal();
            isFirstRender.current = false;
        } else {
            handleCallRefresh();
        }
    }, [refresh]);

    const handleCallData = async () => {
        const response = await getQuestionsByExamId(pageable, {examId: id});
        setPageable((prev) => ({
            ...prev,
            page: response.last ? prev.page : prev.page + 1,
            last: response.last
        }));
        setQuestions(prev => [...prev, ...response.content])
    }

    const handleGetTotal = useCallback(async () => {
        const totalCount = await getTotalQuestionsByExamId({examId: id});
        setCount(totalCount);
    }, [refresh]);

    const handleCallRefresh = async () => {
        const response = await getQuestionsByExamId(initSlicePageable, {examId: id});
        setPageable(initSlicePageable);
        setQuestions([...response.content]);

        // 새로운 컨텐츠가 등록되었을 때 스크롤을 최상단으로 이동
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({top: 0, behavior: 'smooth'});
        }
    }

    const handleDeleteQuestion = () => {}
    const handleMoveToView = (questionId) => {
        navigate(`${location.pathname}/${questionId}`);
    }

    return (
        <TitleCard title="목록 페이지" topMargin="mt-2" TopSideButtons={<TopSideButtons examId={id} />}>
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
                                <td>item.code.name</td>
                                <td>item.createdUser.name</td>
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

const TopSideButtons = ({examId}) => {

    const dispatch = useDispatch()

    const openAddNewLeadModal = () => {
        dispatch(openModal(
            {title: "문제 등록", bodyType: MODAL_TYPES.QUESTION_CREATE, data: {examId: examId}}
        ));
    }

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>
                등록
            </button>
        </div>
    )

}

TopSideButtons.propTypes = {
    examId: PropTypes.number,
}