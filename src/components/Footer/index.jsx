export default function Footer() {
  // const currentYear = new Date().getFullYear();
  return (
    <footer className="text-gray-600 body-font dark:bg-gray-900">
  <div className="container px-5 py-10 mx-auto flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-between">
    
    {/* LOGO */}
    <div className="w-64 flex-shrink-0 text-center sm:text-left">
      <a className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start text-gray-900">
        <img
          src="../public/DreamCine.jpeg"
          className="rounded-full mb-2 sm:mb-0 sm:mr-3 h-12 sm:h-9"
          alt="Dream Cine Studios"
        />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-xl">
          Dream-Cine Studios
        </span>
      </a>
      <p className="mt-2 text-sm text-gray-500">
        Experience the best cinematic journey, anytime, anywhere
        Your go-to online movie ticket booking platform
      </p>
    </div>

    {/* NAVIGATION LINKS */}
    <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-between sm:items-start mt-6 sm:mt-0 space-y-3 sm:space-y-0 sm:space-x-8">
      <a href="/movies">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm text-center sm:text-left dark:text-gray-400 hover:scale-110">
          MOVIES
        </h2>
      </a>
      <a href="/teams">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm text-center sm:text-left dark:text-gray-400 hover:scale-110">
          TEAM
        </h2>
      </a>
      <a href="/contacts">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm text-center sm:text-left dark:text-gray-400 hover:scale-110">
          CONTACT US
        </h2>
      </a>
    </div>
  </div>
</footer>

  
  );
}
