import React from "react";
import { RiHomeOfficeFill } from "react-icons/ri";
import { MdLocalPostOffice } from "react-icons/md";
import { GrPhone } from "react-icons/gr";

const Contact = () => {
  return (
    <div>
      <div className="mx-auto flex flex-col justify-center text-center gap-5 py-10">
        <div className="flex flex-col justify-center text-center gap-4 sm:gap-8">
          <h2 className="uppercase font-raleway font-semibold text-[#333333] opacity-80 text-sm">
            Contact us
          </h2>
          <h1
            className="font-raleway text-[#333333] font-bold text-2xl px-5
           sm:text-3xl sm:mx-auto md:text-4xl lg:text-5xl"
          >
            Get in Touch
          </h1>
          <p
            className="font-roboto text-[#999999] mx-auto w-72 text-xs flex justify-center text-center 
          md:text-sm md:w-96"
          >
            Contact us to publish your content and show ads on our website and
            get a good reach.
          </p>
        </div>
      </div>

      <div className="mx-auto mb-12 mt-8 max-w-[1050px] gap-5 flex flex-col justify-between text-center sm:flex-row sm:justify-center sm:text-center md:justify-center md:text-center">
        <div className="w-72 flex flex-col shadow-md mx-auto bg-white rounded-lg justify-between text-center gap-5 p-5">
          <div className="mx-auto p-3 bg-[#7C4EE4] rounded-full text-white text-2xl">
            <RiHomeOfficeFill />
          </div>
          <h1 className="font-raleway text-xl font-semibold text-[#7C4EE4]">
            Office
          </h1>
          <h4 className="font-roboto text-sm font-light text-[#999999]">
            Victoria Street, London, UK
          </h4>
        </div>

        <div className="w-72 flex flex-col mx-auto shadow-md bg-white rounded-lg justify-between text-center gap-5 p-5">
          <div className="mx-auto p-3 bg-[#7C4EE4] rounded-full text-white text-2xl">
            <MdLocalPostOffice />
          </div>
          <h1 className="font-raleway text-xl font-semibold text-[#7C4EE4]">
            Email
          </h1>
          <h4 className="font-roboto text-sm font-light text-[#999999]">
            hammad2004qureshi@gmail.com
          </h4>
        </div>

        <div className="w-72 flex flex-col mx-auto shadow-md bg-white rounded-lg justify-between text-center gap-5 p-5">
          <div className="mx-auto p-3 bg-[#7C4EE4] rounded-full text-white text-2xl">
            <GrPhone />
          </div>
          <h1 className="font-raleway text-xl font-semibold text-[#7C4EE4]">
            Phone
          </h1>
          <h4 className="font-roboto text-sm font-light text-[#999999]">
            0332-3141351
          </h4>
        </div>
      </div>

      <div className="w-full relative h-[1000px]">
        <img
          src="../../contact-us.jpg"
          alt="Contact Us"
          className="w-full max-h-[80vh] object-cover"
        />

        {/* Contact Us Form */}
        <div className="absolute top-60 z-30 left-1/2 transform -translate-x-1/2 w-11/12 md:w-4/6 p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-raleway font-bold text-[#333333] mb-6 text-center">
            Contact Us
          </h2>
          <form className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-roboto text-[#999999] mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-[#cccccc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#7C4EE4]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-roboto text-[#999999] mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-[#cccccc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#7C4EE4]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-roboto text-[#999999] mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-2 border border-[#cccccc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#7C4EE4]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-roboto text-[#999999] mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                className="w-full resize-none px-4 py-2 border border-[#cccccc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#7C4EE4]"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#7C4EE4] text-white font-semibold rounded-md hover:ring-1 hover:ring-[#7C4EE4] hover:font-bold hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-[#7C4EE4]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
