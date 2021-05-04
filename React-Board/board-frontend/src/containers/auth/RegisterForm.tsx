import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { RootState } from "../../modules";
import { changeField, initializeForm, register } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import { check } from "../../modules/user";

function RegisterForm({ history }: RouteComponentProps) {
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch();

  const { form, auth, authError, user } = useSelector((state: RootState) => ({
    form: state.auth.register,
    auth: state.auth.auth,
    authError: state.auth.authError,
    user: state.user.user,
  }));

  const onChange = (e: any): void => {
    const { value, name } = e.target;
    dispatch(changeField({ form: "register", name, value }));
  };

  // 폼 등록
  const onSubmit = (e: any): void => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    if ([username, password, passwordConfirm].includes("")) {
      setError("빈 칸을 모두 입력하세요.");
      return;
    }
    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      dispatch(changeField({ form: "register", name: "password", value: "" }));
      dispatch(
        changeField({ form: "register", name: "passwordConfirm", value: "" })
      );
      return;
    }
    dispatch(register({ username, password }));
  };

  // 처음 렌더링시, form 초기화
  useEffect(() => {
    dispatch(initializeForm("register"));
  }, [dispatch, user]);

  // 회원가입 성공/실패
  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setError("이미 존재하는 계정입니다.");
        return;
      }

      // 기타 이유
      setError("회원가입 실패");
      return;
    }
    if (auth) {
      console.log("회원가입 성공");
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  // 로그인 상태 유지하기
  useEffect(() => {
    if (user) {
      history.push("/");
      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch (e) {
        console.log("localStorage is not working!!");
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
}

export default withRouter(RegisterForm);
