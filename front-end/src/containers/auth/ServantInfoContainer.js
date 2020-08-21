import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ServantInfo from '../../components/auth/ServantInfo/index';
import useInput from '../../hooks/useInput';
import { NEXT_PAGE } from '../../modules/pageNumber';

const ServantInfoContainer = () => {
  const [nickname, onChangeNickname] = useInput('');

  const dispatch = useDispatch();
  const {
    userInfo: { username },
  } = useSelector((state) => state.user);

  const onSearchHometown = useCallback(() => {
    dispatch({
      type: NEXT_PAGE,
    });
  }, [dispatch]);

  const onSubmitServant = useCallback(() => {
    console.log('onSubmitServant 작동');
  }, []);

  return (
    <>
      <ServantInfo
        username={username}
        nickname={nickname}
        onChangeNickname={onChangeNickname}
        onSearchHometown={onSearchHometown}
        onSubmitServant={onSubmitServant}
      />
    </>
  );
};

export default ServantInfoContainer;
