import React from 'react';
import {Five, Four, One, Three, Two} from "../../assets/index.js";

const Answer = () => {
    return (
        <div className="bg-blue-600 w-[20rem]">
            <div className="bg-emerald-600 h-[5vh] text-xl text-center leading-[3rem]">답안 표기란</div>
            <div className="flex h-[80vh]">
                <div className={`bg-gray-500 w-[3rem]`}>fdskfjlasdkj</div>
                <div className={`bg-amber-200 flex-1`}>
                    <div className={"flex justify-between m-1"}>
                        <One className={"num"}/>
                        <Two className={"num"}/>
                        <Three className={"num"}/>
                        <Four className={"num"}/>
                        <Five className={"num"}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Answer;