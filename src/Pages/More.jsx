import { Link } from "react-router";
import { FaQuestionCircle, FaEnvelope } from "react-icons/fa";

const More = () => {
  return (
    <div className="relative">
      <div className="dropdown dropdown-hover">
        <div 
          tabIndex={0} 
          role="button" 
          className="text-white hover:bg-[#871e14] font-medium transition-colors duration-200 px-4 py-2.5 rounded-lg cursor-pointer flex items-center gap-2"
        >
          <span>More</span>
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-white dark:bg-gray-800 rounded-xl z-50 w-56 p-2 shadow-xl border border-gray-100 dark:border-gray-700"
        >
          <li className="mb-2">
            <Link 
              to="/contact" 
              className="hover:bg-[#f8f8f8] dark:hover:bg-gray-700 rounded-lg px-4 py-3 transition-all duration-200 font-medium flex items-center gap-3 group"
            >
              
              <div className="flex-1">
                <span className="text-gray-800 dark:text-white font-medium">Contact Us</span>
                
              </div>
              <svg 
                className="w-4 h-4 text-gray-400 group-hover:text-[#871e14] transition-colors duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </li>
          <li>
            <Link 
              to="/faq" 
              className="hover:bg-[#f8f8f8] dark:hover:bg-gray-700 rounded-lg px-4 py-3 transition-all duration-200 font-medium flex items-center gap-3 group"
            >
            
              <div className="flex-1">
                <span className="text-gray-800 dark:text-white font-medium">FAQ</span>
                
              </div>
              <svg 
                className="w-4 h-4 text-gray-400 group-hover:text-[#871e14] transition-colors duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </li>
          <li>
            <Link 
              to="/volunteer" 
              className="hover:bg-[#f8f8f8] dark:hover:bg-gray-700 rounded-lg px-4 py-3 transition-all duration-200 font-medium flex items-center gap-3 group"
            >
            
              <div className="flex-1">
                <span className="text-gray-800 dark:text-white font-medium">Volunteer</span>
                
              </div>
              <svg 
                className="w-4 h-4 text-gray-400 group-hover:text-[#871e14] transition-colors duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default More;