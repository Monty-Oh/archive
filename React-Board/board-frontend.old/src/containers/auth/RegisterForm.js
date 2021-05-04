import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({ history }) => {
    const [ error, setError ] = useState(null);
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));

    const onChange = (e) => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value
            })
        );
    };

    // onChange로 인해 바뀐 form 객체의 내용들로 수행
    const onSubmit = (e) => {
        e.preventDefault();
        const { username, password, passwordConfirm } = form;
        if ([username, password, passwordConfirm].includes('')) {
            setError('빈 칸을 입력해주세요');
            return;
        }
        if (password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.');
            dispatch(changeField({ form: 'register', key: 'password', value: '' }));
            dispatch(changeField({ form: 'register', key: 'passwordConfirm', value: '' }));
            return;
        }
        dispatch(register({ username, password }));
    };

    // 맨 처음 렌더링 될 때, 초기화함
    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    // 가입이 이루어지거나 가입 에러 발생 시 호출
    useEffect(() => {
        if (authError) {
            if (authError.response.status === 409) {
                setError('이미 존재하는 계정입니다.');
                return;
            }
            setError('회원가입 실패');
            return;
        }
        if (auth) {
            console.log('회원가입 성공');
            console.log(auth);

            // 가입 성공하면 check를 통해 user state에 정보를 담는다.
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    // user값이 잘 설정 되었는지(잘 check 되었는지), 설정이 잘 되었다면 '/'로 이동한다.
    useEffect(() => {
        if(user) {
            history.push('/');
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                console.log('localStorage is not working');
            }
        }
    }, [user, history]);

    return (
        <AuthForm 
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(RegisterForm);