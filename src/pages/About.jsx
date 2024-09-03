import React from "react";

const About = () => {
  return (
    <div>
      <div className="mx-auto flex flex-col justify-center text-center gap-5 py-10">
        <div className="flex flex-col justify-center text-center gap-4 sm:gap-8">
          <h2 className="font-raleway font-semibold text-[#333333] opacity-80 text-sm">
            ABOUT US
          </h2>
          <h1
            className="font-raleway text-[#333333] font-bold text-2xl px-5
           sm:text-3xl sm:w-3/4 sm:mx-auto md:text-4xl lg:text-5xl lg:w-2/4"
          >
            Creative Blog Writting and publishing site
          </h1>
          <p
            className="font-roboto text-[#999999] text-xs flex justify-center text-center 
          sm:px-20 md:px-40 md:text-sm lg:px-96 "
          >
            Leverage agile frameworks to provide a robust synopsis for high
            level overviews. Iterative approaches to corporate strategy foster
            collaborative thinking to further the overall value proposition.
          </p>
        </div>
      </div>

      <div className="p-5 object-fill w-full sm:px-12 sm:py-8 md:px-16 md:pb-14 lg:px-24 lg:pb-20">
        <img src="../../about-us.jpg" alt="" className="w-full " />
      </div>

      <div className="p-5 sm:px-12 md:px-16 lg:px-24">
        <div className="flex flex-col gap-8">

          <div className="sm:flex justify-between">

            <div className="flex flex-col gap-4">
              <h3 className="font-roboto font-semibold text-md text-[#666666]">
                HOW WE WORK
              </h3>
              <h1 className="font-raleway font-bold text-2xl md:text-5xl md:w-4/6">
                I will show you how our team works
              </h1>
            </div>

            <div className="font-roboto text-sm text-[#999999] flex-col pt-16 md:text-md md:pt-20 md:w-2/6 md:mr-20 lg:mr-32">
              <p>
                Bring to the table win-win market strategies to ensure perfect
                articles.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:gap-6 md:gap-10 md:mt-10">
            <div className="flex flex-col gap-5 p-6 text-white bg-[#7C4EE4] rounded-xl">
              <h1 className="text-5xl font-lobster tracking-widest font-bold">
                01
              </h1>
              <h2 className="font-raleway font-bold text-xl">Brainstorming</h2>
              <p className="font-roboto text-sm opacity-70 font-light">
                Bring to the table win-win survival strategies to ensure
                proactive domination. At the end of the day, going forward, a
                new normal that has evolved from generation X is on the runway
                heading towards a streamlined cloud solution. User generated
              </p>
              <div>
                <h4 className="font-roboto font-semibold mt-5">Learn More</h4>
                <div className="w-20 h-1 bg-white">
                  <hr />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 p-6 rounded-xl">
              <h1 className="text-5xl font-lobster tracking-widest text-[#999999] opacity-40 font-bold">
                02
              </h1>
              <h2 className="font-raleway font-bold text-xl">Analysing</h2>
              <p className="font-roboto text-sm opacity-70 font-light">
                Capitalize on low hanging fruit to identify a ballpark value
                added activity to beta test. Override the digital divide with
                additional clickthroughs from DevOps. Nanotechnology immersion
                along the information highway will close the loop on focusing
                solely on the bottom line solely on the bottom line.
              </p>
            </div>

            <div className="flex flex-col gap-5 p-6 rounded-xl">
              <h1 className="text-5xl font-lobster tracking-widest text-[#999999] opacity-40 font-bold">
                03
              </h1>
              <h2 className="font-raleway font-bold text-xl">
                News Publishing
              </h2>
              <p className="font-roboto text-sm opacity-70 font-light">
                Leverage agile frameworks to provide a robust synopsis for high
                level overviews. Iterative approaches to corporate strategy
                foster collaborative thinking to further the overall value
                proposition. Organically grow the holistic world view of
                disruptive innovation via workplace diversity and empowerment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
