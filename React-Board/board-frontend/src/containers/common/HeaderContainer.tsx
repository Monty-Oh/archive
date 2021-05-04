// 로그인 상태 보여주기 위한 컴포넌트
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../components/common/Header';
import { RootState } from '../../modules';
import { logout } from '../../modules/user';

function HeaderContainer() {
  const { user } = useSelector(({ user }: RootState) => ({
    user: user.user,
  }));
  const dispatch = useDispatch();
  const onLogout = (): void => {
    dispatch(logout());
  };

  return <Header user={user} onLogout={onLogout} />;
}

export default HeaderContainer;
