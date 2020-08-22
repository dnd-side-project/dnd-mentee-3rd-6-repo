import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ServantInfoForm from '../../components/auth/SignUp/ServantInfo';
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
      <ServantInfoForm
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
