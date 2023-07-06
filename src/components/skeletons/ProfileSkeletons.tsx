export function HeaderSkeleton() {
  return (
    <div className="w-11/12 md:w-4/5 max-w-[1000px] h-44 rounded-md border bg-slate-700 border-slate-600">
      <div className=" h-32 w-32 rounded-full  absolute mt-28 ml-5  border border-slate-500 overflow-hidden bg-slate-800"></div>
    </div>
  );
}

export function BioSkeleton() {
  return (
    <div className="w-11/12 md:w-4/5 max-w-[1000px] border mt-2 flex flex-row border-slate-600 rounded-md">
      <div className="w-44 h-full hidden md:block"></div>
      <div className="w-full  h-full p-5">
        <div className="flex flex-col pt-10 md:pt-0">
          <div className="text-lg font-semibold h-7 animate-pulse rounded-sm w-44 bg-slate-400 text-white"></div>
          <div className="py-2 animate-pulse w-36 rounded-sm bg-slate-400 mt-2 text-white"></div>
          <div className="max-w-[300px] pl-3 border-l border-slate-600 mt-2 text-slate-600">
            <div className="py-2 animate-pulse rounded-sm w-48 bg-slate-400 mt-2 text-white"></div>
            <div className="py-2 animate-pulse rounded-sm w-40 bg-slate-400 mt-2 text-white"></div>
            <div className="py-2 animate-pulse rounded-sm w-36 bg-slate-400 mt-2 text-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
}