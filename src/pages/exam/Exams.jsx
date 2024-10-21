import React, {useCallback, useEffect, useRef, useState} from 'react';
import moment from "moment";
import TitleCard from "../../components/cards/TitleCard.jsx";
import {TrashIcon} from "@heroicons/react/24/outline/index.js";
import {useDispatch, useSelector} from "react-redux";
import {openModal} from "../../support/redux/modalSlice.js";
import {MODAL_TYPES} from "../../support/constants/constans.js";
import DocumentIcon from "@heroicons/react/24/outline/DocumentIcon";
import {useInView} from "react-intersection-observer";
import {getExams, getTotalExamCount} from "../../service/examService.js";
import styled from "styled-components";
// import {exams} from "../../dummy/dummy.js";

/**
 * 모의고사 목록페이지
 */
const Exams = () => {
    const initPageable = {
        size: 15,
        page: 0,
        sort: 'createdAt,desc',
        last: false
    }
    const [ref, inView] = useInView({threshold: 0.5});
    const [exams, setExams] = useState([]);
    const [pageable, setPageable] = useState(initPageable);
    const [search, setSearch] = useState({name: ""});
    const [count, setCount] = useState(0);

    const isFirstRender = useRef(true); // 첫 렌더링 여부를 추적

    const refresh = useSelector(state => state.content.refresh);

    useEffect(() => {
        if (!pageable.last && inView) {
            handleCallExams();
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

    const handleGetTotal = useCallback(async () => {
        const response = await getTotalExamCount(search);
        setCount(parseInt(response));
    }, [refresh])

    const handleCallExams = async () => {
        const response = await getExams(pageable, search);
        setPageable((prev) => ({
            ...prev,
            page: response.last ? prev.page : prev.page + 1,
            last: response.last
        }));
        setExams(prev => [...prev, ...response.content]);
    }

    const handleCallRefresh = async () => {
        const response = await getExams(initPageable, search);
        setPageable(initPageable);
        setExams([...response.content]);
    }

    const getDummyStatus = (index) => {
        if (index % 5 === 0) return <div className="badge">Not Interested</div>
        else if (index % 5 === 1) return <div className="badge badge-primary">In Progress</div>
        else if (index % 5 === 2) return <div className="badge badge-secondary">Sold</div>
        else if (index % 5 === 3) return <div className="badge badge-accent">Need Followup</div>
        else return <div className="badge badge-ghost">Open</div>
    }

    const deleteExam = (index) => {
        // dispatch(openModal({title : "Confirmation", bodyType : MODAL_BODY_TYPES.CONFIRMATION,
        //     extraObject : { message : `Are you sure you want to delete this lead?`, type : CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE, index}}))
    }

    return (
        <>
            <TitleCard title="목록 페이지" topMargin="mt-2" TopSideButtons={<TopSideButtons/>}>
                <>
                    <div className="overflow-x-auto w-full h-[70vh]">
                        <table className="table w-full">
                            <thead>
                            <tr>
                                <th>순서</th>
                                <th>제목</th>
                                <th>등록자</th>
                                <th>등록일</th>
                                <th>진해단계</th>
                                <th>관리</th>
                            </tr>
                            </thead>
                            <tbody>
                            {exams && exams.length > 0 ? (
                                exams.map((item, index) => (
                                    <tr key={index}>
                                        <td>{count && count - index}</td>
                                        <td>{item.name}</td>
                                        <td>{item.createdAt}</td>
                                        <td>{item.updatedAt}</td>
                                        <td>
                                            <div className="badge badge-primary">In Progress</div>
                                        </td>
                                        <td>
                                            <button className="btn btn-xs btn-square btn-ghost"
                                                    onClick={() => deleteExam(index)}>
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
                </>
            </TitleCard>
        </>
    );
};

export default Exams;

const TopSideButtons = () => {

    const dispatch = useDispatch()

    const openAddNewLeadModal = () => {
        dispatch(openModal({title: "모의고사 등록", bodyType: MODAL_TYPES.EXAM_CREATE}))
    }

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>
                등록
            </button>
        </div>
    )
}
