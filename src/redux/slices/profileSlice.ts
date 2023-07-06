import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../utils/axios.config';

export type InitialState = {
  loading: boolean;
  profile: USER_PROFILE;
  error: string | null;
};

export type USER_PROFILE = {
    _id: string,
    userId: string,
    __v: number, 
    image: string,
    bio: string,
    location: string,
    name: string
}

const initialState: InitialState = {
  loading: false,
  profile: {
    _id: '',
    userId: '',
    __v: 0, 
    image: '',
    bio: '',
    location: '',
    name: ''
  },
  error: null,
};

function rejectWithValue(error: string) {
  throw new Error(error);
}

export const fetchProfile = createAsyncThunk('profile/getProfile', async (token: string) => {
  return api
    .get(`/api/profile`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      console.log(response.data.data)
      return response.data.data;
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

const fetchProfileSlice = createSlice({
  name: 'fetchProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action: PayloadAction<USER_PROFILE>) => {
      state.loading = false;
      state.profile = action.payload;
      state.error = '';
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
  },
});

export default fetchProfileSlice.reducer;