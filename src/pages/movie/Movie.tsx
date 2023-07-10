import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import CustomButton from '../../components/buttons/CustomButton';

export type MOVIE = {
    id: string,
    title: string,
    poster_path: string,
    overview: string,
    release_date: string,
}
const useMovies = (query: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [movies, setMovies] = useState<MOVIE[]>([]);
  useEffect(() => {
    setLoading(true);
    axios.get(`https://api.themoviedb.org/3/${query}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
      }
    }).then((response) => {
      setMovies(response.data.results);
      setLoading(false);
    })
      .catch(() => {
        setError('Error Occurred.');
        setLoading(false);
      });
  }, [query]);

  return {
    loading,
    error,
    movies
  };
};

const useSearch = (query: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [movies, setMovies] = useState<MOVIE[]>([]);
  useEffect(() => {
    setLoading(true);
    axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
      }
    }).then((response) => {
      setMovies(response.data.results);
      setLoading(false);
    })
      .catch(() => {
        setError('Error Occurred.');
        setLoading(false);
      });
  }, [query]);

  return {
    loading,
    error,
    movies
  };
};

const SearchBox = () => {
  const navigate = useNavigate();
  const sRef = useRef<HTMLInputElement>(null);
  const handleSearch = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    navigate(`/movie/search/${sRef.current?.value}`);
  };
  return (
    <div className="w-full p-4 pt-16">
      <form onSubmit={handleSearch} className=" flex flex-row">
        <input ref={sRef} type="text" className="w-full text-md p-3 focus:outline-none mr-2 rounded-md bg-transparent border border-slate-500 text-white" />
        <CustomButton text="Search" />
      </form>
    </div>
  );
};

export default function Movie() {
  return (
    <div className="">
      <SearchBox />
      <Routes>
        <Route path="/search/:query" element={<MovieSearch />} />
        <Route path="/" element={<Rows />} />
      </Routes>
    </div>
  );
}

function MovieSearch() {
  const { query } = useParams();
  console.log(query);
  const { loading, error, movies } = useSearch(query || '');
  return (
    <div className="w-full px-2 md:px-12 pb-20 text-white">
      <div className="">
        <div className="pb-4 text-lg">Results for {query}</div>
        <div className="flex basis-2 gap-4 flex-wrap justify-center ">
          {loading ? <MovieCardSkeletonSearch /> : error != '' ? <p>{error}</p> : movies.length === 0 ?
            <div className="w-full h-56 text-center text-white mt-20">{`No results for "${query}"`}</div> : movies.map((movie) => <MovieCard release_date={movie.release_date} overview={movie.overview} title={movie.title} poster={movie.poster_path} /> ) }
        </div>
      </div>
    </div>
  );
}

function Rows() {
  return (
    <div className=" min-h-screen text-white px-1 md:px-10">
      <MovieRow title="Popular movies" query="discover/movie?include_adult=true&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc" />
      <MovieRow title="Trending now" query="trending/movie/day?language=en-US" />
      <MovieRow title="Now Playing" query="movie/now_playing?language=en-US&page=1"/>
      <MovieRow title="Top Rated" query="movie/top_rated?language=en-US&page=1" />
      <MovieRow title="Upcoming Movies" query="movie/upcoming?language=en-US&page=1" />
    </div>
  );
}

function MovieRow({ query, title } : { query: string, title: string }) {
  const { loading, error, movies } = useMovies(query);
  return (
    <div className="">
      <div className="px-2">{title}</div>
      <div className="w-full overflow-x-scroll">
        <div className="flex flex-row gap-4 w-[3000px] px-3 py-5">
          {loading ? <MovieCardSkeleton /> : error != '' ? <p>{error}</p> : movies ?
            movies.map((movie) => <MovieCard overview={movie.overview} release_date={movie.release_date} title={movie.title} poster={movie.poster_path} /> ) : '' }

        </div>
      </div>
    </div>
  );
}

export function MovieCard({ title, poster, overview, release_date } : { title: string, release_date: string, overview: string, poster: string }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="w-44 h-44 flex justify-start items-end hover:z-20 hover:w-72 border border-slate-500 cursor-pointer delay-200 bg-white rounded-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background:
					`url(https://image.tmdb.org/t/p/w500${poster})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        transition: '.5s',
        backgroundPosition: 'center'
      }}
    >
      <div style={{ transition: '.5s', animation: 'ease-in-out' }} className={`${isHovered ? '' : 'hidden'} flex flex-col h-full rounded-md font-semibold p-2 text-sm backdrop-brightness-[0.2] w-full`}>
        <p className="text-md max-w-[135px] pb-2">{title}</p>
        <p className="text-[12px] max-w-[135px] pb-1">{release_date}</p>
        <p className="text-[10px] max-w-[135px] text-slate-300 max-h-[100px] overflow-y-scroll" style={{ transition: '.4s' }}>{overview}</p>
        <div className="w-full flex flex-row justify-around items-end">
          <button className=" p-1">
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
          </button>
          <button className=" p-1">
            <i className="fa fa-comments-o" aria-hidden="true"></i>
          </button>
          <button className=" p-1">
            <i className="fa fa-bookmark-o" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

function MovieCardSkeleton() {
  const skeletonArr: JSX.Element[] = [];
  for (let i = 0; i < 10; i++) {
    skeletonArr.push(<div className="w-44 h-44 flex justify-start items-end border border-slate-600 cursor-pointer delay-200 bg-slate-600 animate-pulse rounded-md"></div>);
  }
  return (
    <div className="">
      <div className="w-full overflow-hidden">
        <div className="flex flex-row gap-4 w-[1400px] px-3 py-5">
          {skeletonArr}
        </div>
      </div>
    </div>
  );
}

function MovieCardSkeletonSearch() {
  const skeletonArr: JSX.Element[] = [];
  for (let i = 0; i < 10; i++) {
    skeletonArr.push(<div className="w-44 h-44 flex justify-start items-end border border-slate-600 cursor-pointer delay-200 bg-slate-600 animate-pulse rounded-md"></div>);
  }
  return skeletonArr;
}
