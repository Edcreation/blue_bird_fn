import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeDisplayPicture } from './redux/ChangeDpSlice';
import { changeProfile } from './redux/UpdateProfileSlice';

export const useChangeProfilePic = () => {
  const token = useAppSelector((state) => state.token.value) || '';
  const data = useAppSelector((state) => state.changeDp);
  const dispatch = useAppDispatch();
  const handleDpChange = (path: File | null) => {
    if (path) {
      dispatch(changeDisplayPicture({ token, path }));
    }
  };
  return {
    data,
    handleDpChange,
  };
};

export const useChangeProfileData = () => {
  const token = useAppSelector((state) => state.token.value) || '';
  const data = useAppSelector((state) => state.changeProfileData);
  const dispatch = useAppDispatch();
  const handleChange = (obj: {
		name?: string;
		bio?: string;
		location?: string;
	}) => {
    dispatch(changeProfile({ token, obj }));
  };
  return {
    data,
    handleChange,
  };
};