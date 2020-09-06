import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IsServantForm from '../../components/auth/SignUp/IsServant';
import { SIGN_UP_3, NEXT_PAGE, NOT_SERVANT_NEXT_PAGE } from '../../modules/auth';

const IsServantContainer = () => {
  const [isServant, setIsServant] = useState(true);

  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth.authInfo);

  /* 페이지 3 - 집사 확인 후 다음 페이지 이동 */
  const onSubmitSignUp = useCallback(() => {
    dispatch({
      type: SIGN_UP_3,
      data: isServant,
    });
    if (!isServant) {
      return dispatch({
        type: NOT_SERVANT_NEXT_PAGE,
      });
    }
    return dispatch({
      type: NEXT_PAGE,
    });
  }, [dispatch, isServant]);

  return (
    <>
      <IsServantForm
        name={name}
        isServant={isServant}
        setIsServant={setIsServant}
        onSubmitSignUp={onSubmitSignUp}
      />
    </>
  );
};

export default IsServantContainer;
