import axios, {AxiosError} from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_HOST;

export const api = axios.create({
    baseURL: BASE_URL,
    // withCredentials: true
});

// api.interceptors.request.use((config) => {
//         const token = localStorage.getItem('accessToken');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     }, (error) => Promise.reject(error)
// );

// Add a response interceptor
api.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const {config, response: {status}} = error;
    // unauthorized 로 넘어온 reponse에만 token을 갱신해준다.
    if (status === 401) {
        try {
            const response = await api.get(`${BASE_URL}/users/reissue`)
            if (response.status === 200) {
                const accessToken = response.data;
                localStorage.removeItem("accessToken");
                localStorage.setItem("accessToken", accessToken);
                config.headers.authorization = `Bearer ${accessToken}`;

                console.info("access token reissued");
            }
        } catch (error) {
            // reissue가 안될시에 사용자 정보를 localstorage에서 지워야 하나?
            // 500 에러가 떨어지며, cookie에 refresh token이라는 value가 없다고 온다.
            if (error instanceof AxiosError) {
                console.log(error)
                const message = error.response?.data.message;
                const status = error.response?.status;      // 500 이다
                if (status === 410) {   // 410 Gone (refresh token 만료시 gone status로 반환하도록 만듬)
                    console.error("refresh Token in cookie was expired. it'll be signed out automatically");
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("user");
                    // store.dispatch(storeOpenSignInDrawer({openSignInDrawer: true}));
                }
            }
            return Promise.reject(error);
        }

        try {
            return axios(config);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    return Promise.reject(error);
});