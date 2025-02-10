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
  <div className="bg-gray-800 dark:bg-black">
  <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row items-center justify-between">
    
    {/* COPYRIGHT TEXT */}
    <p className="text-gray-300 text-sm text-center sm:text-left">
      © 2025 DreamCine - All Rights Reserved
    </p>

    {/* SOCIAL MEDIA ICONS */}
    <div className="flex mt-2 sm:mt-0 space-x-4">
      <a href="https://facebook.com" title="Facebook" target="_blank" className="text-gray-300 hover:text-blue-500">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
        </svg>
      </a>
      <a href="https://github.com" title="GitHub" target="_blank" className="text-gray-300 hover:text-gray-600">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.17-3.37-1.17a2.66 2.66 0 00-1.12-1.48c-.91-.62.07-.61.07-.61a2.1 2.1 0 011.54 1.05 2.13 2.13 0 002.92.83 2.13 2.13 0 01.63-1.32c-2.22-.25-4.56-1.11-4.56-4.94a3.87 3.87 0 011.04-2.68 3.61 3.61 0 01.1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02a3.61 3.61 0 01.1 2.64 3.87 3.87 0 011.04 2.68c0 3.84-2.35 4.69-4.58 4.94a2.38 2.38 0 01.68 1.84v2.73c0 .27.18.59.69.48A10 10 0 0012 2z"></path>
        </svg>
      </a>
      <a href="https://instagram.com" title="Instagram" target="_blank" className="text-gray-300 hover:text-pink-500">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
        </svg>
      </a>
    </div>

  </div>
</div>

</footer>

  
  );
}
