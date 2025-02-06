import teams from "../../utils/constants/teams";

export default function Team() {
  return (
    <div className="dark:bg-gray-900">
      <div className="container flex justify-center mx-auto pt-16">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-lg text-center font-normal">
            BUILDING TEAM
          </p>
          <h1 className="xl:text-4xl text-3xl text-center text-gray-800 dark:text-gray-200 font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">
            who participated in creating a cinema application
          </h1>
        </div>
      </div>

      <div className="w-full bg-gray-100 px-10 pt-10 dark:bg-gray-800">
        <div className="container flex flex-wrap px-1 py-1 mx-auto">
          <div
            role="list"
            aria-label="Behind the scenes People "
            className="lg:flex md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around"
          >
            {teams.map((person) => (
              <div
                key={person.name}
                role="listitem"
                className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5"
              >
                <div className="rounded overflow-hidden shadow-md bg-white dark:bg-gray-200">
                  <div className="absolute -mt-20 w-full flex justify-center">
                    <div className="h-32 w-32">
                      <img
                        src={person.imageUrl}
                        alt="Display Picture of Andres Berlin"
                        role="img"
                        className="rounded-full object-cover h-full w-full shadow-md"
                      />
                    </div>
                  </div>
                  <div className="px-6 mt-16">
                    <h1 className="font-bold text-3xl text-center mb-1">
                      {person.name}
                    </h1>
                    <p className="text-gray-800 text-sm text-center">
                      {person.role}
                    </p>
                    <p className="text-center text-gray-600 text-base pt-3 font-normal">
                      The CEOs role in raising a companys corporate IQ is to
                      establish an atmosphere that promotes knowledge sharing
                      and collaboration.
                    </p>
                    <div className="w-full flex justify-center pt-5 pb-5">
                      <a 
                      href={person.github} 
                      className="mx-5"
                      target="_blank"
                      >
                        <div aria-label="Github" role="img">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#718096"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-github"
                          >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                        </div>
                      </a>
                      
                      <a href="javascript:void(0)" className="mx-5">
                        <div aria-label="Instagram" role="img">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#718096"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-instagram"
                          >
                            <rect
                              x="2"
                              y="2"
                              width="20"
                              height="20"
                              rx="5"
                              ry="5"
                            ></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
