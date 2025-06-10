
//  const Quote = () => {
//    return (
//      <div className="bg-slate-200 h-screen flex flex-col justify-center">
//        <div className="justify-center flex ">
//             <div className="text-3xl mx-auto font-bold max-w-lg text-justify">
//                 "Your voice matters. Share your knowledge, shape the world.
//                 Join a community of writers, thinkers, and creators."
//             </div>
//         </div>
//             <div className="text-xl text-left pl-32 mt-5 font-semibold ">
//                 Margaret Atwood
//             </div>
            
//             <div className="text-sm text-left pl-32 mt-1  font-light">
//                 Novelist | Poet | Author
//             </div>
//      </div>

//    )
//  }
 
//  export default Quote


const Quote = () => {
  return (
    <div className="bg-black text-gray-300 h-screen flex flex-col justify-center items-center font-inter px-4">
      <div className="max-w-2xl text-center">
        <p className="text-2xl md:text-3xl font-semibold leading-relaxed italic  max-w-2xl mx-auto px-4">
        “When you have a great story in your mind, the best way to share it is to publish it. Just get it out there.”
        </p>

        <div className="mt-3 text-lg font-medium ">Reid Hoffman</div>
        <div className="text-sm font-light ">
          CO-founder &nbsp;|&nbsp; LinkedIn 
        </div>
      </div>
    </div>
  );
};

export default Quote;
