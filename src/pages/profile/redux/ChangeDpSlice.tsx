import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../../utils/axios.config';

export type InitialState = {
  loading: boolean;
  response: string;
  error: string | null;
};

const initialState: InitialState = {
  loading: false,
  response: '',
  error: null,
};

function rejectWithValue(error: string) {
  throw new Error(error);
}

export const changeDisplayPicture = createAsyncThunk('profile/changeDisplayPicture', async ({ token, path}: { path: File, token: string }) => {
    const formData = new FormData();
    formData.append('image', path);
  return api
    .patch(`/api/profile/image`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'content-type': 'multipart/form-data' }
    })
    .then((response) => {
      return response.data.message;
    })
    .catch((error) => {
      switch (error.response.status) {
        case 500:
          return rejectWithValue('Internal Error.');
        default:
          return rejectWithValue(error.response.data.message);
      }
    });
});

const changeDp = createSlice({
  name: 'changeDisplayPicture',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeDisplayPicture.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changeDisplayPicture.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.response = action.payload;
      state.error = '';
    });
    builder.addCase(changeDisplayPicture.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
  },
});

export default changeDp.reducer;