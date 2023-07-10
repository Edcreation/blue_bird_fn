import { ChangeEvent, useState } from 'react';
import { useChangeProfileData, useChangeProfilePic } from './hooks';


export const ProfileEditor = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelected(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelected(null);
    }
  };
  const { data, handleDpChange } = useChangeProfilePic();
  return (
    <div className="z-30 w-64 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-slate-600 rounded-md">
      <div className="w-full flex flex-col p-5 justify-center items-center">
        {selected ? <img src={selected} /> : ''}
      </div>
      <div className="p-2 pt-0 flex flex-row justify-around">
        <input
          type="file"
          id="image"
          className="hidden"
          onChange={handleImageChange}
        />
        <button
          onClick={() => document.getElementById('image')?.click()}
          className="p-2 text-sm bg-blue-600 text-white rounded-md"
        >
					Choose Image
        </button>
        {data.loading ?
          <button className="bg-blue-500 px-7 py-2 rounded-md" disabled={true}>
            <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
          </button>:
          <button
            onClick={() => handleDpChange(image)}
            className={`p-2 bg-blue-600 text-white rounded-md text-sm ${
              selected ? '' : 'bg-slate-300 cursor-not-allowed'
            }`}
            disabled={selected ? false : true}
          >
						Confirm
          </button>
        }
      </div>
    </div>
  );
};

export const Editor = ({ type }: { type: 'BIO' | 'NAME' | 'LOCATION' }) => {
  const [data_two, setData_two] = useState('');
  const { handleChange, data } = useChangeProfileData();
  return (
    <div className="w-64 z-30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-5 flex flex-row justify-start bg-slate-600 rounded-md">
      {type === 'BIO' ?
        <textarea
          onChange={(e) => setData_two(e.target.value)}
          value={data_two}
          className="bg-transparent border w-full h-44 focus:outline-none border-slate-500 text-white text-start p-1 mr-1"
          required={true}
        />:
        <input
          onChange={(e) => setData_two(e.target.value)}
          value={data_two}
          type="text"
          className="w-full bg-transparent border-b mr-1 focus:outline-none border-slate-500 text-white"
          required={true}
        />
      }
      {data.loading ?
        <button className="bg-blue-500 px-7 py-2 rounded-md" disabled={true}>
          <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
        </button> : type === 'NAME' ?
          <button
            onClick={data_two != '' ? () => handleChange({ name: data_two }) : () => alert('No Empty Fields')}
            className="p-2 bg-blue-600 h-10 text-white rounded-md text-sm"
          >
					Confirm
          </button> : type === 'BIO' ?
            <button
              onClick={data_two != '' ? () => handleChange({ bio: data_two }) : () => alert('No Empty Fields')}
              className="p-2 bg-blue-600 h-10 text-white rounded-md text-sm"
            >
					Confirm
            </button> : type === 'LOCATION' ?
              <button
                onClick={data_two != '' ? () => handleChange({ location: data_two }) : () => alert('No Empty Fields')}
                className="p-2 bg-blue-600 h-10 text-white rounded-md text-sm"
              >
					Confirm
              </button> :
              ''
      }
    </div>
  );
};
