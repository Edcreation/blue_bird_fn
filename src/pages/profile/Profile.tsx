import { useAppSelector } from '../../redux/hooks';
import { useState } from 'react';
import { Editor, ProfileEditor } from './ProfileEditors';
import Manager from './account/Main';
import { BioSkeleton, HeaderSkeleton } from '../../components/skeletons/ProfileSkeletons';

export default function Profile() {
  const { error, profile, loading } = useAppSelector((state) => state.profile);
  return (
    <div className="pt-20 min-h-screen flex flex-col justify-start items-center">
      {loading ?
        <>
          <HeaderSkeleton />
          <BioSkeleton />
        </>: error ?
          <div className=""></div>:
          <>
            <Header profileImage={profile?.image} />
            <Bio
              location={profile?.location}
              bio={profile?.bio}
              name={profile?.name}
            />
          </>
      }
      <Manager />
    </div>
  );
}

function Header({ profileImage }: { profileImage: string }) {
  const [display, setDisplay] = useState(false);
  return (
    <div
      className="w-11/12 md:w-4/5 max-w-[1000px] h-44 rounded-md border border-slate-600"
      style={{
        backgroundImage:
					'url(https://marketplace.canva.com/EAE89qUYCic/1/0/1600w/canva-blue-ocean-tide-beach-motivational-quote-facebook-cover-UlayDxq20Mo.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className=" h-32 w-32 rounded-full bg-white absolute mt-28 ml-5 border overflow-hidden">
        <img
          className="w-full h-full"
          src={`${
            profileImage ||
						'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg'
          }`}
          alt="image"
        />
      </div>
      <div
        onClick={() => setDisplay(true)}
        className="absolute w-7 h-7 mt-52 ml-28 rounded-full bg-white border-2 cursor-pointer flex justify-center items-center"
      >
        <i className="fa fa-pencil" aria-hidden="true"></i>
      </div>
      {display ?
        <>
          <div
            onClick={() => setDisplay(false)}
            className="flex z-30 backdrop-blur-md justify-center items-center absolute w-full h-full left-0"
          ></div>
          <ProfileEditor />
        </>:
        ''
      }
    </div>
  );
}

function Bio({
  bio,
  location,
  name,
}: {
	bio: string;
	location: string;
	name: string;
}) {
  const [display, setDisplay] = useState(false);
  const [type, setType] = useState<'NAME' | 'BIO' | 'LOCATION'>('NAME');
  return (
    <div className="w-11/12 md:w-4/5 max-w-[1000px] border mt-2 flex flex-row border-slate-600 rounded-md">
      <div className="w-44 h-full hidden md:block"></div>
      <div className="w-full  h-full p-5">
        <div className="flex flex-col pt-10 md:pt-0">
          <div className="text-lg font-semibold text-white">
            {name === undefined ?
              <button
                onClick={() => {
                  setDisplay(true);
                  setType('NAME');
                }}
                className="text-sm p-1"
              >
                <i className="fa fa-plus mr-1" aria-hidden="true"></i>Add Name
              </button>:
              <div className="flex flex-row items-center">
                <p>{name}</p>
                <div
                  className="ml-2 text-sm"
                  onClick={() => {
                    setDisplay(true);
                    setType('NAME');
                  }}
                >
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </div>
              </div>
            }
          </div>
          <div className="py-2 text-white flex flex-row items-center">
            <i className="fa fa-map-marker mr-3" aria-hidden="true"></i>
            {location === undefined ?
              <button
                onClick={() => {
                  setDisplay(true);
                  setType('LOCATION');
                }}
                className="text-sm p-1"
              >
                <i className="fa fa-plus mr-1" aria-hidden="true"></i>Add
								Location
              </button>:
              <div className="flex flex-row items-center">
                <p>{location}</p>
                <div
                  className="ml-2 text-sm"
                  onClick={() => {
                    setDisplay(true);
                    setType('LOCATION');
                  }}
                >
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </div>
              </div>
            }
          </div>
          <div className="max-w-[300px] pl-3 border-l border-slate-600 mt-2 text-slate-600">
            {bio === undefined ?
              <button
                onClick={() => {
                  setDisplay(true);
                  setType('BIO');
                }}
                className="text-sm  p-1"
              >
                <i className="fa fa-plus mr-1" aria-hidden="true"></i>Add Bio
              </button>:
              <div className="flex flex-row">
                <p>{bio}</p>
                <div
                  onClick={() => {
                    setDisplay(true);
                    setType('BIO');
                  }}
                  className=" text-white  h-5 p-1 flex justify-center items-center rounded-full"
                >
                  <i className="fa fa-pencil " aria-hidden="true"></i>
                </div>
              </div>
            }
          </div>
        </div>
        {display ?
          <>
            <div
              onClick={() => setDisplay(false)}
              className="flex backdrop-blur-md z-20 justify-center items-center top-0 absolute w-full h-full left-0"
            ></div>
            <Editor type={type} />
          </>:
          ''
        }
      </div>
    </div>
  );
}
