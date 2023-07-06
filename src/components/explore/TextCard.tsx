import axios from 'axios';
import { TextCardType } from '../../utils/types';
import { useEffect, useState } from 'react';

const usePosterImage = (id: string) => {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get(`https://api.themoviedb.org/3/movie/${id}/images`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
      }
    }).then((result) => {
      setImage(`https://image.tmdb.org/t/p/w500${result.data.posters[0].file_path}`);
      setLoading(false);
    });
  }, [id]);
  return { image, loading };
};

function TextCard({ text, profile, time, shares, likes, comments, poster }: TextCardType) {
  const { image, loading } = usePosterImage(poster);
  return (
    <div className="w-72 mb-5 flex flex-col justify-start max-w-[800px] overflow-hidden  rounded-md border text-sm  border-slate-600 bg-slate-800 text-slate-100"
      style={{ backgroundImage: `url(${image}})`, backgroundSize: 'contain', backgroundPosition: 'center' }}
    >
      <div className="flex flex-row">
        <div className="backdrop-brightness-[0.3] w-full backdrop-blur-md">
          <div className="p-5 flex flex-wrap items-center justify-between">
            <div className="flex flex-row items-center">
              <div className="h-10 w-10 rounded-full overflow-hidden flex justify-center items-center border  border-slate-900 bg-white">
                <img src={profile.image} width="40" height="30" sizes="100vw" className="h-full" alt={profile.username} />
              </div>
              <div className="ml-1 italic font-bold">{profile.username}</div>
            </div>
            <div className="text-slate-500 text-[8px] italic">{time}</div>
          </div>
          <div className="mx-7 mb-2 border-l-2 text-[10px] max-h-[80px] overflow-scroll border-slate-500 px-2">
            {text}</div>
          <div className="w-full flex flex-row items-center justify-between p-1">
            <div className="px-5 flex flex-row items-center justify-start w-4/5 md:w-3/5">
              <button className=" flex flex-row items-center">
                <i className="fa fa-heart text-red-700" aria-hidden="true"></i><p className="ml-1 text-sm text-red-700">{likes}</p>
              </button>
              <button className="ml-3 flex flex-row items-center justify-center">
                <i className="fa fa-retweet text-blue-600" aria-hidden="true"></i><p className="ml-1 text-sm text-blue-600">{shares}</p>
              </button>
              <button className="ml-3 flex flex-row items-center justify-center">
                <i className="fa fa-comments-o text-green-600" aria-hidden="true"></i><p className="ml-1 text-sm text-green-600">{comments}</p>
              </button>
            </div>
            <button className="text-md p-2">
              <i className="fa fa-bookmark" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        {loading ? <div className="w-44 bg-slate-500 animate-pulse"></div> :<div className="w-44"
          style={{
            background:
                        `url(${image || ''})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            transition: '.5s',
            backgroundPosition: 'center'
          }}
        >
        </div>}
      </div>
    </div>
  );
}

export default TextCard;