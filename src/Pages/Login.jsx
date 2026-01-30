// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useContext, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router";
// import { AuthContext } from "../Provider/AuthProvider";
// import auth from "../firebase/firebase.config";
// import { FcGoogle } from "react-icons/fc";
// import toast from "react-hot-toast";

// const Login = () => {
//   const { setUser, handleGoogleSignin } = useContext(AuthContext);
//   const [email, setEmail] = useState("");
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const pass = e.target.password.value;

//     signInWithEmailAndPassword(auth, email, pass)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         setUser(user);
//         toast.success("Login Successfully!");
//         navigate(location.state ? location.state : "/");
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error("Login failed. Please check your credentials.");
//       });
//   };

//   const googleSignin = () => {
//     handleGoogleSignin()
//       .then((result) => {
//         const user = result.user;
//         setUser(user);
//         toast.success("Login Successfully!");
//         navigate(location.state ? location.state : "/");
//       })
//       .catch((err) => {
//         console.log(err);
//         toast.error("Google login failed. Please try again.");
//       });
//   };

//   const handleForget = () => {
//     if (!email) {
//       toast.error("Please enter your email first");
//       return;
//     }
//     navigate(`/forget/${email}`);
//   };

//   return (
//     <div>
//       <title>Login</title>
//       <div className="hero bg-base-200 min-h-screen">
//         <div className="hero-content flex-col lg:flex-row-reverse">
//           <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//             <div className="card-body">
//               <form onSubmit={handleSubmit} className="fieldset">
//                 <label className="label">Email</label>
//                 <input
//                   onChange={(e) => setEmail(e.target.value)}
//                   name="email"
//                   type="email"
//                   className="input"
//                   placeholder="Email"
//                   required
//                 />
//                 <label className="label">Password</label>
//                 <input
//                   name="password"
//                   type="password"
//                   className="input"
//                   placeholder="Password"
//                   required
//                 />
//                 <div>
//                   <button type="button" onClick={handleForget} className="link link-hover">
//                     Forgot password?
//                   </button>
//                 </div> 

//                 <button type="button" onClick={googleSignin} className="btn btn-outline w-full mb-4">
//                   <FcGoogle className="text-xl" />
//                   Continue with Google
//                 </button>

//                 <div className="text-center mb-4">
//                   <span>Don't have an account? </span>
//                   <Link to={"/signup"} className="text-blue-500 hover:underline">
//                     Register
//                   </Link>
//                 </div>
//                 <button type="submit" className="btn btn-neutral w-full">Login</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import auth from "../firebase/firebase.config";
import { FcGoogle } from "react-icons/fc";
import { FaTint, FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaUserShield } from "react-icons/fa";
import toast from "react-hot-toast";

const Login = () => {
  const { setUser, handleGoogleSignin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Project color theme
  const colors = {
    primary: '#818281',
    accent: '#871e14',
    dark: '#211e1e',
    light: '#fdfdfd'
  };

  // Demo credentials
  const demoCredentials = {
    user: {
      email: "inaya@gmail.com",
      password: "123456Ll",
      label: "Demo User"
    },
    admin: {
      email: "admin@gmail.com",
      password: "123456Hh",
      label: "Demo Admin"
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const pass = e.target.password.value;

    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        toast.success("Login Successfully!");
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Login failed. Please check your credentials.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const googleSignin = () => {
    setLoading(true);
    handleGoogleSignin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Login Successfully!");
        navigate(location.state ? location.state : "/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Google login failed. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleForget = () => {
    if (!email) {
      toast.error("Please enter your email first");
      return;
    }
    navigate(`/forget/${email}`);
  };

  // Function to auto-fill demo credentials
  const fillDemoCredentials = (type) => {
    const credentials = demoCredentials[type];
    setEmail(credentials.email);
    setPassword(credentials.password);
    
    // Update form inputs
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    
    if (emailInput) emailInput.value = credentials.email;
    if (passwordInput) passwordInput.value = credentials.password;
    
    toast.success(`${credentials.label} credentials filled! Click Login button.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 flex items-center justify-center p-4">
      <title>Login - Blood Donate</title>
      
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-6 px-8">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.accent }}
              >
                <FaTint className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold" style={{ color: colors.dark }}>
                  Blood Donate
                </h1>
                <p className="text-sm" style={{ color: colors.primary }}>
                  Save Lives Together
                </p>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.dark }}>
              Welcome Back!
            </h2>
            <p className="text-lg mb-8" style={{ color: colors.primary }}>
              Sign in to continue your journey of saving lives and making a difference in your community.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${colors.accent}15` }}
                >
                  <FaTint style={{ color: colors.accent }} />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: colors.dark }}>Donate Blood</h3>
                  <p className="text-sm text-gray-600">Help save lives in your community</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${colors.accent}15` }}
                >
                  <FaUser style={{ color: colors.accent }} />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: colors.dark }}>Request Blood</h3>
                  <p className="text-sm text-gray-600">Find donors when you need help</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
            
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.accent }}
                >
                  <FaTint className="text-xl text-white" />
                </div>
                <h1 className="text-2xl font-bold" style={{ color: colors.dark }}>
                  Blood Donate
                </h1>
              </div>
              <h2 className="text-xl font-bold mb-2" style={{ color: colors.dark }}>
                Welcome Back!
              </h2>
              <p className="text-sm" style={{ color: colors.primary }}>
                Sign in to your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    type="email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                    style={{ focusRingColor: `${colors.accent}50` }}
                    placeholder="Enter your email"
                    value={email}
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                    style={{ focusRingColor: `${colors.accent}50` }}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FaEye className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button 
                  type="button" 
                  onClick={handleForget} 
                  className="text-sm hover:underline transition-colors duration-200"
                  style={{ color: colors.accent }}
                >
                  Forgot password?
                </button>
              </div>

              {/* Demo Credentials */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm font-medium mb-3" style={{ color: colors.dark }}>
                  Try Demo Credentials:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => fillDemoCredentials("user")}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors duration-200 text-sm font-medium"
                  >
                    <FaUser className="text-xs" />
                    Demo User
                  </button>
                  <button
                    type="button"
                    onClick={() => fillDemoCredentials("admin")}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm font-medium"
                  >
                    <FaUserShield className="text-xs" />
                    Demo Admin
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 px-4 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: colors.accent }}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Google Sign In */}
              <button 
                type="button" 
                onClick={googleSignin}
                disabled={loading}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg font-medium transition-all duration-200 hover:bg-gray-50 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                style={{ color: colors.dark }}
              >
                <FcGoogle className="text-xl" />
                Continue with Google
              </button>

              {/* Register Link */}
              <div className="text-center pt-4">
                <span className="text-gray-600">Don't have an account? </span>
                <Link 
                  to="/signup" 
                  className="font-medium hover:underline transition-colors duration-200"
                  style={{ color: colors.accent }}
                >
                  Create Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
