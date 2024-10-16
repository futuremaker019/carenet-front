import React from 'react';
import MDEditor from '@uiw/react-md-editor';

/**
    문제 생성 페이지
 */
const QuestionCreate = () => {
    const [question, setQuestion] = React.useState('');
    const [answers, setAnswers] = React.useState({});

    /**
     * 데이터 구조를 어떻게 가져갈까
     */
    const data = {
        question: {
            article: "",
        },
        answers: [
            {number: 1, answer: "1번 객관식 답"},
            {number: 2, answer: "2번 객관식 답"},
            {number: 3, answer: "3번 객관식 답"},
            {number: 4, answer: "4번 객관식 답"},
            {number: 5, answer: "5번 객관식 답"},
        ],
        orders: 0,
    };

    return (
        <div className="p-10">
            <MDEditor
                value={question}
                onChange={setQuestion}
            />
            <div className={"pt-5 flex flex-col gap-2"}>
                <div>
                    <input type="text" placeholder="1번" className="input input-bordered w-full"/>
                </div>
                <div>
                    <input type="text" placeholder="2번" className="input input-bordered w-full"/>
                </div>
                <div>
                    <input type="text" placeholder="3번" className="input input-bordered w-full"/>
                </div>
                <div>
                    <input type="text" placeholder="4번" className="input input-bordered w-full"/>
                </div>
                <div>
                    <input type="text" placeholder="5번" className="input input-bordered w-full"/>
                </div>
            </div>
        </div>
    );
};

export default QuestionCreate;