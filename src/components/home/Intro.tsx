import { HOME_INTRO_TEXT } from '../../utils/constants';
import CustomButton from '../buttons/CustomButton';

function Intro() {
  return (
    <div className="w-full bg-transparent">
      <div className="flex h-screen flex-row justify-center items-start pt-20 px-5 md:px-20">
        <div className="max-w-[500px] border border-slate-700 md:right-1/4 md:top-32 z-10 text-xl p-4 rounded-md backdrop-blur-sm">
          <div className="text-white dark:text-white">{HOME_INTRO_TEXT}</div>
          <div className="w-full flex justify-start items-start p-2">
            <CustomButton
              text="Start Exploring!"
              styles="bg-blue-600 border my-5 border-slate-50 p-2 text-sm rounded-full text-white"
              action={() => alert('clicked')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;