import { HOME_INTRO_TEXT } from "../../utils/constants";
import CustomButton from "../buttons/CustomButton";
import blob from "../../../public/blob.png";

function Intro() {
  return (
    <div className="">
        <div className="flex flex-col md:flex-row h-screen justify-between items-start pt-20 px-20" style={{ backgroundImage: `url(${blob})`, }}>
            <div className="max-w-[500px] z-10 text-xl p-4 rounded-md backdrop-blur-sm">
                <div className="dark:text-white">{HOME_INTRO_TEXT}</div>
                <div className="w-full flex justify-start items-start p-2">
                    <CustomButton 
                        text="Start Exploring!" 
                        styles="bg-blue-600 border my-5 border-slate-50 p-2 text-sm rounded-full text-white" 
                        action={() => alert("clicked")}
                    />
                </div>
            </div>
            {/* <div className="h-96 z-10 w-72 rotate-0 md:mt-0 md:right-32 md:rotate-3 bg-white p-1 border border-slate-50">
                <img src="/girl.jpg" className="absolute rotate-6" alt="image-girl" />
                <img src="/girl.jpg" alt="image-girl" />
            </div> */}
        </div>
    </div>
  )
}

export default Intro