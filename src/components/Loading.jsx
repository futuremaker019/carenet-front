import React from 'react';
import {useDispatch, useSelector} from "react-redux";

const Loading = () => {

    const isLoading = useSelector(state => state.content.isLoading);
    const dispatch = useDispatch();

    return (
        <>
            {isLoading &&
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[30]">
                    <span className="loading loading-bars loading-lg text-warning"></span>
                </div>
            }
        </>
    );
};

export default Loading;