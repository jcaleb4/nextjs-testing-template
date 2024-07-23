import { RootState } from '@/store';
import { Token, setToken as setAuthToken } from '@/store/slices/auth-slice';
import { useDispatch, useSelector } from 'react-redux';

const useAuth = () => {
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.auth.token);

  const setToken = ({ token }: { token: Token }) => {
    dispatch(setAuthToken({ token }));
  };

  return { setToken, token };
};

export default useAuth;
