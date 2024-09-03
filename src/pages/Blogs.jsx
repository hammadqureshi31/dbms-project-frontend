import React, { useEffect, useState } from "react";
import Posts from "../components/Posts";
import { useSelector } from "react-redux";

const Blogs = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState();
  const [sort, setSort] = useState(false);
  const [categry, setCategry] = useState()
  const [postData, setPostData] = useState(null);
  const [filteredPostData, setFilteredPostData] = useState(null);
  const [sortCount, setSortCount] = useState(null)
  const selector = useSelector((state) => state.blogPosts.data);

  useEffect(() => {
    if (selector && selector.length > 0) {
      setPostData(selector);
      setFilteredPostData(selector);
    }
  }, [selector]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);

  };

  const handleApplyFilter = (e) => {
    e.preventDefault();
  
    let filteredData = [...postData];
    
    // Search Term Filter
    if (searchTerm && searchTerm.trim() !== '') {
      const titleMatch = filteredData.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const contentMatch = filteredData.filter((blog) =>
        blog.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
      filteredData = [...new Set([...titleMatch, ...contentMatch])];
    }
  
    // Category Filter
    if (categry && categry !== "uncategorized") {
      filteredData = filteredData.filter((blog) => blog.category === categry);
    }
    
    // Sorting
    if (sort === "desc" && sortCount === true || sortCount == null) {
      filteredData.reverse()
      setSortCount(false)
    } else if (sort === "asc" && sortCount === false || sortCount == null) {
      filteredData.reverse()
      setSortCount(true)
    }
    
    // Update the filtered data
    setFilteredPostData(filteredData);
    // setCategry("uncategorized");
    // setSearchTerm('');
    // setSort('select');
  };
  
  

  

  return (
    <>
      <div className="min-w-full mb-10">
        <div className="mx-auto flex flex-col justify-center text-center gap-5 py-10">
          <div className="flex flex-col justify-center text-center gap-4 sm:gap-8">
            <h2 className="font-raleway font-semibold text-[#333333] opacity-80 text-sm">
              OUR BLOGS
            </h2>
            <h1 className="font-raleway text-[#333333] font-bold text-2xl px-14 sm:text-3xl md:text-4xl lg:text-5xl">
              Find our all blogs from here
            </h1>
            <p className="font-roboto text-[#999999] text-xs flex justify-center text-center sm:px-20 md:px-40 md:text-sm lg:px-96 ">
              our blogs are written from very research and well known writers so
              that we can provide you the best blogs and articles articles for
              you to read them all along
            </p>
          </div>
        </div>

        {/* Toggle Button for Mobile */}
        <div className="flex justify-center md:hidden mb-4">
          <button
            onClick={toggleFilters}
            className="px-6 py-3 rounded-full bg-[#7C4EE4] text-white font-bold hover:bg-purple-700 transition duration-300"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Filter Section */}
        <div
          className={`p-6 bg-gradient-to-b from-[#7C4EE4] to-purple-500 rounded-t-xl shadow-xl lg:px-12 md:py-8 transition-all duration-300 ${
            showFilters ? "block" : "hidden"
          } md:block`}
        >
          <h1 className="text-3xl font-bold font-raleway text-white mb-8 text-center">
            Refine Your Search
          </h1>

          <div className="flex flex-col gap-3 sm:flex-row md:px-10 sm:justify-between">
            {/* Search Term */}
            <div className="flex flex-col items-center md:flex-row md:gap-3">
              <label className="text-lg text-white mb-2 md:mt-2 font-raleway">
                Search Term:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e)=>setSearchTerm(e.target.value)}
                  placeholder="Type to search..."
                  className="w-full px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
                <span className="absolute inset-y-0 right-4 flex items-center text-white">
                  🔍
                </span>
              </div>
            </div>

            {/* Sort */}
            <div className="flex flex-col items-center md:flex-row md:gap-3">
              <label className="text-lg text-white mb-2 md:mt-2 font-raleway">
                Sort By:
              </label>
              <div className="relative">
                <select value={sort}
                onChange={(e)=>setSort(e.target.value)}
                className="w-full px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300">
                  <option value="">Select</option>
                  <option value="asc">Oldest</option>
                  <option value="desc">Latest</option>
                </select>
                <span className="absolute inset-y-0 right-6 flex items-center text-white">
                  ⏳
                </span>
              </div>
            </div>

            {/* Category */}
            <div className="flex flex-col items-center md:flex-row md:gap-3">
              <label className="text-lg text-white mb-2 md:mt-2 font-raleway">
                Category:
              </label>
              <div className="relative">
                <select value={categry}
                onChange={(e)=>setCategry(e.target.value)}
                 className="w-full px-4 py-2  rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300">
                  <option value="uncategorized">Select Category</option>
                  <option value="development">Development</option>
                  <option value="reactjs">React.js</option>
                  <option value="nextjs">Next.js</option>
                </select>
                <span className="absolute inset-y-0 right-6 flex items-center text-white">
                  📚
                </span>
              </div>
            </div>

            {/* Apply Filter Button */}
            <div className="flex justify-center mt-6 md:mt-0">
              <button 
              onClick={handleApplyFilter}
              className="px-6 py-3 text-nowrap rounded-full sm:text-sm bg-white text-[#7C4EE4] font-bold hover:bg-[#7C4EE4] hover:text-white hover:shadow-lg transition duration-300">
                Apply Filters
              </button>
            </div>
          </div>
        </div>


        {/* // All posts */}
        <div className="w-full">
          <Posts postData={filteredPostData}/>
        </div>
      </div>
    </>
  );
};

export default Blogs;
