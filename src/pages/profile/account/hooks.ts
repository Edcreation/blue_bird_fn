import axios from 'axios';
import { useAppSelector } from '../../../redux/hooks';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/axios.config';
import { MOVIE } from '../../movie/Movie';
import { POST } from '../../../utils/types';

export const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [movies, setMovies] = useState<MOVIE[]>([]);
  const search = (query: string) => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          },
        }
      )
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch(() => {
        setError('Error Occurred.');
        setLoading(false);
      });
  };

  return {
    loading,
    error,
    movies,
    search,
  };
};

export const usePost = () => {
  const [loading2, setLoading] = useState(false);
  const [error2, setError] = useState('');
  const token = useAppSelector((state) => state.token.value);
  const navigate = useNavigate();
  const handlePost = (text: string, id: string ) => {
    setLoading(true);
    api.post(`/api/text/${id}`, { text }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(() => {
      setLoading(false);
      navigate('profile');
    }).catch((err) => {
      setError(err.data.message);
      setLoading(false);
    });
  };
  return {
    loading2,
    error2,
    handlePost
  };

};

export const usePosts = () => {
  const token = useAppSelector((state) => state.token.value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState<POST[]>([]);
  useEffect(() => {
    setLoading(true);
    api
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/text`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPosts(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error Occurred.');
        setLoading(false);
      });
  }, [token]);

  return {
    loading,
    error,
    posts,
  };
};

