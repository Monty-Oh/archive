// page
const HOME = '/';

const MAIN = '/';
const getPROFILE = '/profile';
const UPDATE = '/update';
const getJOIN = '/join';


// auth
const AUTH = '/auth';

const postJOIN = '/join';
const putPROFILE = '/profile';
const postLOGIN = '/login';
const LOGOUT = '/logout';
const KAKAO = '/kakao';
const CALLBACK = '/kakao/callback';


// post
const POST = '/post';

const IMG = '/img';
const postPOST = '/';
const HASHTAG = '/hashtag';
const postLIKE = '/:id/like/:do';
const deletePOST = '/:id';


// user
const USER = '/user';

const postFOLLOW = '/:id/follow';
const deleteFOLLOW = '/:id/follow';

const urls = {
    home: HOME,
    main: MAIN,
    getprofile: getPROFILE,
    update: UPDATE,
    getjoin: getJOIN,

    auth: AUTH,
    postjoin: postJOIN,
    putprofile: putPROFILE,
    postlogin: postLOGIN,
    logout: LOGOUT,
    kakao: KAKAO,
    callback: CALLBACK,

    post: POST,
    img: IMG,
    postpost: postPOST,
    hashtag: HASHTAG,

    // 괄호안 조건 시 프론트에서 사용하는 실제 주소로 리턴, else시 라우터 요청 처리를 위한 주소 리턴
    postlike: (id, like) => {
        if (id && like) {
            return `/${id}/like/${like}`;
        } else {
            return postLIKE;
        }
    },
    deletepost: (id) => {
        if (id) {
            return `/${id}`;
        } else {
            return deletePOST;
        }
    },

    user: USER,
    postfollow: (id) => {
        if (id) {
            return `/${id}/follow`;
        } else {
            return postFOLLOW;
        }
    },
    deletefollow: (id) => {
        if (id) {
            return `/${id}/follow`;
        } else {
            return deleteFOLLOW;
        }
    }
};

module.exports = urls;