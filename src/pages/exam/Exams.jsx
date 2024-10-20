import React from 'react';
import {exams} from "../../dummy/dummy.js";
import moment from "moment";
import TitleCard from "../../components/cards/TitleCard.jsx";
import {TrashIcon} from "@heroicons/react/24/outline/index.js";
import {useDispatch} from "react-redux";
import {openModal} from "../../support/redux/modalSlice.js";
import {MODAL_TYPES} from "../../support/constants/constans.js";
import DocumentIcon from "@heroicons/react/24/outline/DocumentIcon";

/**
 * 모의고사 목록페이지
 */
const Exams = () => {

    const handleCallExams = () => {

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
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                        <tr>
                            <th>순서</th>
                            <th>제목</th>
                            <th>Created At</th>
                            <th>Assigned To</th>
                            <th>Status</th>
                            <th>관리</th>
                        </tr>
                        </thead>
                        <tbody>
                        {exams.data && exams.data.length > 0 ? (
                            exams.data.map((item, index) => (
                                <tr key={index}>
                                    <td>{exams.data.length - index}</td>
                                    <td>{item.first_name}</td>
                                    <td>{moment(new Date()).add(-5 * (index + 2), 'days').format("DD MMM YY")}</td>
                                    <td>{item.last_name}</td>
                                    <td>{getDummyStatus(index)}</td>
                                    <td>
                                        <button className="btn btn-xs btn-square btn-ghost"
                                                onClick={() => deleteExam(index)}>
                                            <TrashIcon className="w-4"/>
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
                </div>
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
