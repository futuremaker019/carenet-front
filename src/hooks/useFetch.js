import {useDispatch} from "react-redux";
import {isLoading} from "../support/redux/contentSlice.js";
import {api} from "../service/instance.js";
import {useEffect, useState} from "react";
import {initSlicePageable} from "../service/Utils.js";

// const fetchData = async (url, method = 'GET', body = null) => {
//
//     const config = {
//         method,
//         ...(body && { data: body }),
//     };
//
//     try {
//         const response = await api(url, config);
//         if (response && response.status === 200) {
//             return response.data;
//         } else {
//             throw new Error('응답 오류');
//         }
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// };

export const useFetch = (fetchMethod) => {
    const [data, setData] = useState(null);
    const [pageable, setPageable] = useState({...initSlicePageable});

    const dispatch = useDispatch();

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        dispatch(isLoading(true)); // 로딩 시작
        try {
            const response = await fetchMethod();

            // 목록조회와 단일조회를 구분해줘야한다. 데이터도 다르고 pageable 사용 유무도 다르다.
        } finally {
            dispatch(isLoading(false)); // 로딩 종료
        }
    }

    return { data, pageable };
};

export const Method = {
    GET: "GET", POST: "POST", PUT: "PUT", DELETE: "DELETE",
};


