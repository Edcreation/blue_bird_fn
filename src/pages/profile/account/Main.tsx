import { SetStateAction, useState } from 'react';
import { TextCard } from '../../../components';
import CustomButton from '../../../components/buttons/CustomButton';
import { MOVIE } from '../../movie/Movie';
import { usePost, usePosts, useSearch } from './hooks';

export default function Manager() {
  const [tab, setTab] = useState(0);
  return (
    <div className="text-white w-11/12 md:w-4/5 max-w-[1000px] mt-5 mb-20 border-slate-500 pb-3 pt-0 border ">
      <div className="w-full flex flex-row justify-between pb-2 pt-0">
        <button
          onClick={() => setTab(0)}
          className="p-2 w-full mr-1 bg-slate-700 "
        >
					Create
        </button>
        <button
          onClick={() => setTab(1)}
          className="p-2 w-full mr-1 bg-slate-700 "
        >
					Your posts
        </button>
        <button
          onClick={() => setTab(2)}
          className="p-2 w-full mr-1 bg-slate-700 "
        >
					Saved
        </button>
        <button
          onClick={() => setTab(3)}
          className="p-2 w-full mr-0 bg-slate-700 "
        >
					Saved
        </button>
      </div>
      <div className="p-2 min-h-[500px]">
        {tab === 0 && <CreatePost />}
        {tab === 1 && <Posts />}
        {tab === 2 && <SavedMovies />}
      </div>
    </div>
  );
}

function Posts() {
  const { loading, error, posts } = usePosts();
  return (
    <div className="w-full max-h-[500px] overflow-scroll flex flex-wrap gap-2 justify-center items-center">
      {loading ?
        <div className="">Loading</div>: error != '' ?
          <p>{error}</p>: posts.length === 0 ?
            <div className="w-full  h-56 text-center text-white mt-20">{'No Posts Yet.'}</div>:
            posts.map((post, index) =>
              <TextCard
                key={index}
                id={post.id}
                text={post.text}
                profile={{
                  username: post.userId.username,
                  image: post.profileId.image,
                }}
                time={post.date}
                likes="0"
                comments="0"
                poster={post.movieId}
                shares="0"
              />
            )
      }
    </div>
  );
}

function CreatePost() {
  const [key, setKey] = useState<string>('');
  const [text, setText] = useState<string>('');
  const { loading2, error2, handlePost } = usePost();
  const [selected, setSelected] = useState<MOVIE | null>(null);
  const { search, loading, movies, error } = useSearch();
  const changeSearch = (e: { target: { value: SetStateAction<string>; }; }) => {
    setKey(e.target.value);
    search(key || '');
  };
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    handlePost(text, selected?.id || '');
  };
  return (
    <div className="w-full p-2">
      {error2 != '' ? <p className="p-1 bg-red-900">{error2}</p> : ''}
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
        <div className="text-center w-full">Create your post</div>
        <div className="w-11/12 flex justify-center flex-col items-center mt-5">
          <input
            type="search"
            value={key}
            onChange={changeSearch}
            className="p-2 w-full bg-slate-900 border border-slate-500 focus:outline-none"
          />
        </div>
        {key === '' ?
          '':
          <div className="w-11/12 h-[300px] pb-20 z-20 overflow-scroll p-1 border border-slate-700 bg-slate-800 mt-2">
            {loading ?
              <div className="w-full h-56 flex items-center justify-center text-center">
                <i className="fa fa-spinner fa-spin text-blue-600" aria-hidden="true"></i>
              </div>: error != '' ?
                <div className="">{error}</div> :
                movies.map((movie, index) =>
                  <div onClick={() => {
                    setSelected(movie);
                    setKey('');
                  }} key={index} className="cursor-pointer p-3 border-slate-500 bg-slate-900 border flex flex-row">
                    <div className="w-10 h-10 overflow-hidden border">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        className="w-full"
                      />
                    </div>
                    <div className="max-w-[200px] p-2 pt-0">
                      <div className="text-[13px]">{movie.title}</div>
                      <div className="text-[10px] text-slate-500">{movie.release_date}</div>
                    </div>
                  </div>
                )
            }
          </div>
        }
        {selected != null &&
                    <>
                      <div className="p-1 mt-2 w-11/12 text-slate-400 text-start">Selected movie</div>
                      <div className="w-11/12 border flex flex-col md:flex-row p-4 border-slate-500 mt-2">
                        <div className="w-32 h-48 border border-slate-400 overflow-hidden">
                          <img className="w-full" src={`https://image.tmdb.org/t/p/w500${selected.poster_path}`} alt={selected.title} />
                        </div>
                        <div className="p-2 pt-0 max-w-[400px]">
                          <div className="text-lg pb-0 py-2 md:py-0">
                            {selected.title} . <span className="text-[12px] text-slate-500">{selected.release_date}</span>
                          </div>
                          <div className="py-2 text-[12px] max-w-[500px] max-h-[160px] overflow-scroll">
                            {selected.overview}
                          </div>
                        </div>
                      </div>
                    </>
        }
        <div className="p-1 mt-2 w-11/12 text-slate-400 text-start">Add a Conversation</div>
        <div className="w-11/12">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="p-2 w-full bg-slate-900 border border-slate-500 focus:outline-none mt-2 h-44"
            placeholder="..."
          />
        </div>
        <div className="mt-2">
          { loading2 ? <button disabled={true} className="rounded-md w-44 p-2 bg-blue-200">Loading..</button> :
            <CustomButton text="Post" styles=" rounded-md w-44 p-2 bg-blue-600" />
          }
        </div>
      </form>
    </div>
  );
}

function SavedMovies() {
  return (
    <div className="w-full flex flex-wrap gap-2 place-content-center"></div>
  );
}
