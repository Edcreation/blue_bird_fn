import axios from 'axios';
import { TextCardType } from './types';

export const getPosts = async() => {
  try {
    const posts = await axios.get('http://localhost:3000/api/posts');
    return posts.data.data as TextCardType[];
  } catch (error) {
    return [];
  }
};