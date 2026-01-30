import { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { 
  FaQuestionCircle, 
  FaEnvelope, 
  FaChevronDown, 
  FaHome,
  FaSignOutAlt,
  FaTachometerAlt,
  FaBars,
  FaTimes,
  FaHandsHelping,
  FaHeart
} from "react-icons/fa";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Color theme
  const colors = {
    primary: '#818281',
    accent: '#871e14',
    dark: '#211e1e',
    light: '#fdfdfd'
  };

  const logout = () => {
    signOut(auth);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
      isActive 
        ? 'text-white shadow-md transform scale-105' 
        : 'text-gray-700 hover:text-white hover:shadow-sm hover:transform hover:scale-105'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
      isActive 
        ? 'text-white shadow-md' 
        : 'text-gray-700 hover:text-white hover:shadow-sm'
    }`;


  return (
    <nav 
      className="sticky top-0 z-50 shadow-lg backdrop-blur-sm"
      style={{ 
        backgroundColor: `${colors.light}f5`,
        borderBottom: `1px solid ${colors.accent}20`
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 font-bold text-2xl transition-transform duration-200 hover:scale-105"
            style={{ color: colors.accent }}
          >
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
              style={{ 
                backgroundColor: colors.accent,
                background: `linear-gradient(135deg, ${colors.accent} 0%, #a91e1e 100%)`
              }}
            >
              <FaHeart className="text-white text-xl animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl leading-tight">BloodDonate</span>
              <span className="text-xs font-normal opacity-75 leading-tight">Save Lives</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            
            {/* Home */}
            <NavLink 
              to="/" 
              className={navLinkClass}
              style={({ isActive }) => ({
                backgroundColor: isActive ? colors.accent : 'transparent'
              })}
            >
              <div className="flex items-center space-x-2">
                <FaHome className="text-sm" />
                <span>Home</span>
              </div>
            </NavLink>

            {/* Donation Requests - Private Route */}
            {user && (
              <NavLink 
                to="/donation-requests" 
                className={navLinkClass}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? colors.accent : 'transparent'
                })}
              >
                Donation Requests
              </NavLink>
            )}

            {/* About */}
            <NavLink 
              to="/about" 
              className={navLinkClass}
              style={({ isActive }) => ({
                backgroundColor: isActive ? colors.accent : 'transparent'
              })}
            >
              About
            </NavLink>

            {/* More Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-white transition-all duration-200 hover:shadow-sm hover:transform hover:scale-105"
                style={{ 
                  backgroundColor: 'transparent',
                  ':hover': { backgroundColor: colors.accent }
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = colors.accent;
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#374151';
                }}
              >
                <span>More</span>
                <FaChevronDown className="text-xs transition-transform duration-200 group-hover:rotate-180" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div 
                  className="rounded-xl shadow-xl border overflow-hidden"
                  style={{ 
                    backgroundColor: colors.light,
                    borderColor: `${colors.accent}20`
                  }}
                >
                  <Link 
                    to="/contact" 
                    className="flex items-center p-4 hover:bg-gray-50 transition-colors duration-200 group/item"
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                      style={{ backgroundColor: `${colors.accent}15` }}
                    >
                      <FaEnvelope style={{ color: colors.accent }} />
                    </div>
                    <div>
                      <div className="font-semibold" style={{ color: colors.dark }}>
                        Contact Us
                      </div>
                      <div className="text-sm" style={{ color: colors.primary }}>
                        Get in touch with us
                      </div>
                    </div>
                  </Link>
                  
                  <Link 
                    to="/faq" 
                    className="flex items-center p-4 hover:bg-gray-50 transition-colors duration-200 group/item"
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                      style={{ backgroundColor: `${colors.accent}15` }}
                    >
                      <FaQuestionCircle style={{ color: colors.accent }} />
                    </div>
                    <div>
                      <div className="font-semibold" style={{ color: colors.dark }}>
                        FAQ
                      </div>
                      <div className="text-sm" style={{ color: colors.primary }}>
                        Frequently asked questions
                      </div>
                    </div>
                  </Link>

                  <Link 
                    to="/volunteer" 
                    className="flex items-center p-4 hover:bg-gray-50 transition-colors duration-200 group/item"
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                      style={{ backgroundColor: `${colors.accent}15` }}
                    >
                      <FaHandsHelping style={{ color: colors.accent }} />
                    </div>
                    <div>
                      <div className="font-semibold" style={{ color: colors.dark }}>
                        Volunteer
                      </div>
                      <div className="text-sm" style={{ color: colors.primary }}>
                        Join our volunteer team
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Funding - Only for logged in users */}
            {user && (
              <NavLink 
                to="/donate" 
                className={navLinkClass}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? colors.accent : 'transparent'
                })}
              >
                Funding
              </NavLink>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {!user ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="px-6 py-2 rounded-lg font-medium border-2 transition-all duration-200 hover:shadow-md hover:transform hover:scale-105"
                  style={{ 
                    borderColor: colors.accent,
                    color: colors.accent,
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = colors.accent;
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = colors.accent;
                  }}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-6 py-2 rounded-lg font-medium text-white transition-all duration-200 hover:shadow-md hover:transform hover:scale-105"
                  style={{ backgroundColor: colors.accent }}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = '0.9';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = '1';
                  }}
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="relative group">
                <button className="flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 hover:shadow-md">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2" style={{ borderColor: `${colors.accent}30` }}>
                    <img
                      src={user.photoURL || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-sm" style={{ color: colors.dark }}>
                      {user.displayName || 'User'}
                    </div>
                    <div className="text-xs" style={{ color: colors.primary }}>
                      {user.email}
                    </div>
                  </div>
                  <FaChevronDown className="text-xs transition-transform duration-200 group-hover:rotate-180" />
                </button>
                
                {/* User Dropdown */}
                <div className="absolute top-full right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <div 
                    className="rounded-xl shadow-xl border overflow-hidden"
                    style={{ 
                      backgroundColor: colors.light,
                      borderColor: `${colors.accent}20`
                    }}
                  >
                    <Link 
                      to="/dashboard" 
                      className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <FaTachometerAlt className="mr-3" style={{ color: colors.accent }} />
                      <span style={{ color: colors.dark }}>Dashboard</span>
                    </Link>
                    <button 
                      onClick={logout}
                      className="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors duration-200 text-left"
                    >
                      <FaSignOutAlt className="mr-3" style={{ color: colors.accent }} />
                      <span style={{ color: colors.dark }}>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg transition-colors duration-200"
            style={{ color: colors.accent }}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t" style={{ borderColor: `${colors.accent}20` }}>
            <div className="space-y-2">
              
              {/* Home */}
              <NavLink 
                to="/" 
                className={mobileNavLinkClass}
                onClick={closeMobileMenu}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? colors.accent : 'transparent'
                })}
              >
                <div className="flex items-center space-x-3">
                  <FaHome />
                  <span>Home</span>
                </div>
              </NavLink>

              {/* Donation Requests - Private Route */}
              {user && (
                <NavLink 
                  to="/donation-requests" 
                  className={mobileNavLinkClass}
                  onClick={closeMobileMenu}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? colors.accent : 'transparent'
                  })}
                >
                  Donation Requests
                </NavLink>
              )}

              {/* About */}
              <NavLink 
                to="/about" 
                className={mobileNavLinkClass}
                onClick={closeMobileMenu}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? colors.accent : 'transparent'
                })}
              >
                About
              </NavLink>

              {/* Contact */}
              <NavLink 
                to="/contact" 
                className={mobileNavLinkClass}
                onClick={closeMobileMenu}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? colors.accent : 'transparent'
                })}
              >
                Contact Us
              </NavLink>

              {/* FAQ */}
              <NavLink 
                to="/faq" 
                className={mobileNavLinkClass}
                onClick={closeMobileMenu}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? colors.accent : 'transparent'
                })}
              >
                FAQ
              </NavLink>

              {/* Volunteer */}
              <NavLink 
                to="/volunteer" 
                className={mobileNavLinkClass}
                onClick={closeMobileMenu}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? colors.accent : 'transparent'
                })}
              >
                <div className="flex items-center space-x-3">
                  <FaHandsHelping />
                  <span>Volunteer</span>
                </div>
              </NavLink>

              {/* Funding - Only for logged in users */}
              {user && (
                <NavLink 
                  to="/donate" 
                  className={mobileNavLinkClass}
                  onClick={closeMobileMenu}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? colors.accent : 'transparent'
                  })}
                >
                  Funding
                </NavLink>
              )}

              {/* Auth Section */}
              <div className="pt-4 border-t" style={{ borderColor: `${colors.accent}20` }}>
                {!user ? (
                  <div className="space-y-2">
                    <Link 
                      to="/login" 
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 rounded-lg font-medium text-center border-2 transition-colors duration-200"
                      style={{ 
                        borderColor: colors.accent,
                        color: colors.accent
                      }}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 rounded-lg font-medium text-center text-white transition-colors duration-200"
                      style={{ backgroundColor: colors.accent }}
                    >
                      Register
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center px-4 py-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 mr-3" style={{ borderColor: `${colors.accent}30` }}>
                        <img
                          src={user.photoURL || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-sm" style={{ color: colors.dark }}>
                          {user.displayName || 'User'}
                        </div>
                        <div className="text-xs" style={{ color: colors.primary }}>
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <Link 
                      to="/dashboard" 
                      onClick={closeMobileMenu}
                      className="flex items-center px-4 py-3 rounded-lg transition-colors duration-200"
                      style={{ color: colors.dark }}
                    >
                      <FaTachometerAlt className="mr-3" style={{ color: colors.accent }} />
                      Dashboard
                    </Link>
                    <button 
                      onClick={logout}
                      className="w-full flex items-center px-4 py-3 rounded-lg transition-colors duration-200 text-left"
                      style={{ color: colors.dark }}
                    >
                      <FaSignOutAlt className="mr-3" style={{ color: colors.accent }} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;