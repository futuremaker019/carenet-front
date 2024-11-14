import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getQuestion, updateArticle} from "../../../service/questionService.js";
import CustomEditor from "../../../components/CustomEditor.jsx";
import {ArrowUturnLeftIcon} from "@heroicons/react/24/outline/index.js";
import {updateSelection} from "../../../service/selectionService.js";
import DOMPurify from 'isomorphic-dompurify';

/**
    문제 생성 페이지
 */
const Question = () => {
    const [question, setQuestion] = useState({
        id: 0, examId: 0, codeId: 0, name: "", article: "", selections: []
    });
    const [selections, setSelections] = useState({});
    const [initialSelections, setInitialSelections] = useState({});

    const [writable, setWritable] = useState(false);
    const initialState = {0: false, 1:false, 2:false, 3:false, 4:false};
    const [selectionWritable, setSelectionWritable] = useState(initialState);

    const {id} = useParams();

    useEffect(() => {
        handleCallQuestion();
    }, []);

    const handleCallQuestion = async () => {
        const data = await getQuestion({questionId: id});
        setQuestion({...data});

        const selectionList = {};
        data.selections.forEach((item) => {
            selectionList[item.selectionId] = {
               selectionId: item.selectionId,
               content: item.content,
           }
        });
        setSelections(selectionList);
        setInitialSelections(selectionList);
    }

    /** 문제 활성화 or 비활성화 */
    const handleChangeToWritable = () => setWritable(prev => !prev);

    /** 객관식 답 개별 저장 이벤트 */
    const handleUpdateSelection = async (e, selectionId) => {
        if (e.key === 'Enter') {
            const value = e.target.value;
            const data = {
                questionId: id,
                selectionId: selectionId,
                content: value
            }
            await updateSelection(data);
            setSelectionWritable({...initialState});  // 저장 후 인풋 초기화
        }
    }

    const handleUpdateArticle = async (editorValue) => {
        console.log(editorValue)
        await updateArticle({id: id, article: editorValue});
        setQuestion(prev => ({...prev, article: editorValue}));
        setWritable(false);
    }

    /** 객관석 답 onChange */
    const handleChangeSelection = (value, selectionId) => {
        setSelections((prevSelections) => ({
            ...prevSelections,
            [selectionId]: { ...prevSelections[selectionId], content: value },
        }));
    };

    /** 객관식 답 활성화  */
    const handleActiveSelection = (idx) => {
        setSelectionWritable({...initialState, [idx]: true});
    }

    /** 객관식 답 초기화 */
    const handleResetSelections = () => {
        setSelectionWritable({...initialState});
        setSelections({...initialSelections});
    }

    return (
        <div className="p-1">
            <div className={'bg-white rounded-lg p-4'}>
                <p className={`text-[20px] mt-2 mb-3`}>문제 본문</p>
                <>
                    {!writable &&
                        <div
                            className={`mt-2 hover:bg-amber-200 rounded-lg p-2 cursor-pointer`}
                            onClick={handleChangeToWritable}
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question.article) }}
                        />
                    }
                    {writable &&
                        <CustomEditor
                            contentId={parseInt(id)}
                            defaultValue={question.article}
                            save={handleUpdateArticle}
                            cancel={handleChangeToWritable}
                        />
                    }
                </>
            </div>
            <div className="divider"></div>
            <div className={"flex flex-col gap-2"}>
                {Object.values(selections).map((item, index) => (
                    <React.Fragment key={index}>
                        <div className={'flex gap-2 items-center mb-1'}>
                            <div className={'w-3 mr-2'}>{`${index + 1}.`}</div>
                            {selectionWritable[index] ?
                                <label className="input input-bordered flex items-center gap-2 w-full">
                                    <input
                                        type="text"
                                        placeholder={`${index + 1} 번 객관식 답을 작성해주세요.`}
                                        className="grow"
                                        value={item.content}
                                        onKeyDown={(e) => handleUpdateSelection(e, item?.selectionId)}
                                        onChange={(e) => handleChangeSelection(e.target.value, item?.selectionId)}
                                    />
                                    <div
                                        className={'w-8 h-8 hover:bg-amber-300 cursor-pointer flex items-center justify-center rounded-lg'}
                                        onClick={handleResetSelections}
                                    >
                                        <ArrowUturnLeftIcon className="w-4 h-4"/>
                                    </div>
                                </label>
                                :
                                <div
                                    className={`hover:bg¡¡-blue-200 cursor-pointer p-1 rounded-lg`}
                                    onClick={() => handleActiveSelection(index)}
                                >
                                    {item.content}
                                </div>
                            }
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Question;