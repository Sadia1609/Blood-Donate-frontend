import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { FcGoogle } from "react-icons/fc";
import { FaTint, FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaImage, FaMapMarkerAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const { registerWithEmailPassword, setUser, handleGoogleSignin } =
    useContext(AuthContext);
  
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Project color theme
  const colors = {
    primary: '#818281',
    accent: '#871e14',
    dark: '#211e1e',
    light: '#fdfdfd'
  };

  // usestate for district and upazila 
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');

  // for district and upazila data fetch from public folder
  useEffect(() => {
    axios.get('/upazila.json')
      .then(res => {
        setUpazilas(res.data.upazilas);
      });

    axios.get('/district.json')
      .then(res => {
        setDistricts(res.data.districts);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const email = e.target.email.value;
    const pass = e.target.password.value;
    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl;
    const file = photoUrl.files[0];
    const blood = e.target.blood.value;

    // Validation
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;

    if (pass.length < 6) {
      setLoading(false);
      return toast.error("Password must be at least 6 characters");
    }
    if (!uppercase.test(pass)) {
      setLoading(false);
      return toast.error("Password must contain at least one uppercase letter");
    }
    if (!lowercase.test(pass)) {
      setLoading(false);
      return toast.error("Password must contain at least one lowercase letter");
    }

    if (!district) {
      setLoading(false);
      return toast.error("Please select your district");
    }
    if (!upazila) {
      setLoading(false);
      return toast.error("Please select your upazila");
    }

    try {
      let mainPhotoUrl = null;
      
      // Upload photo if provided
      if (file) {
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=1eb52fcd6f930f0298550f42df910f04`,
          { image: file },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        mainPhotoUrl = res.data.data.display_url;
      }

      const formData = {
        email,
        name,
        mainPhotoUrl,
        blood, 
        district,
        upazila
      };

      // Register user with Firebase
      const userCredential = await registerWithEmailPassword(email, pass);
      
      // Update profile
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: mainPhotoUrl,
      });

      setUser(userCredential.user);

      // Save user in database
      try {
        await axios.post("https://blood-donate-backend-six.vercel.app/users", formData);
        console.log("User saved to database");
      } catch (err) {
        console.log("Database save error:", err);
      }

      toast.success("Account created successfully!");
      navigate("/");
      
    } catch (error) {
      console.log(error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const googleSignup = () => {
    setLoading(true);
    handleGoogleSignin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Google signup successful!");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Google signup failed. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 flex items-center justify-center p-4 py-12">
      <title>Register - Blood Donate</title>
      
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
              Join Our Community
            </h2>
            <p className="text-lg mb-8" style={{ color: colors.primary }}>
              Create an account and become a hero by donating blood or requesting help when needed.
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
                  <h3 className="font-semibold" style={{ color: colors.dark }}>Be a Lifesaver</h3>
                  <p className="text-sm text-gray-600">Donate blood and save lives</p>
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
                  <h3 className="font-semibold" style={{ color: colors.dark }}>Get Help Fast</h3>
                  <p className="text-sm text-gray-600">Find donors in your area quickly</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
            
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-6">
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
                Create Account
              </h2>
              <p className="text-sm" style={{ color: colors.primary }}>
                Join our community today
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400 text-sm" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400 text-sm" />
                  </div>
                  <input
                    name="name"
                    type="text"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                  Profile Photo (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaImage className="text-gray-400 text-sm" />
                  </div>
                  <input
                    name="photoUrl"
                    type="file"
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                    accept="image/*"
                  />
                </div>
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                  Blood Group *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaTint className="text-gray-400 text-sm" />
                  </div>
                  <select 
                    name="blood" 
                    defaultValue="" 
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 appearance-none"
                    required
                  >
                    <option disabled value="">Choose Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              {/* District and Upazila in Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* District */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                    District *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaMapMarkerAlt className="text-gray-400 text-sm" />
                    </div>
                    <select 
                      value={district} 
                      onChange={(e) => setDistrict(e.target.value)} 
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 appearance-none"
                      required
                    >
                      <option disabled value=''>Select District</option>
                      {districts.map(d => <option value={d?.name} key={d.id}>{d?.name}</option>)}
                    </select>
                  </div>
                </div>

                {/* Upazila */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                    Upazila *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaMapMarkerAlt className="text-gray-400 text-sm" />
                    </div>
                    <select 
                      value={upazila} 
                      onChange={(e) => setUpazila(e.target.value)} 
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 appearance-none"
                      required
                    >
                      <option disabled value=''>Select Upazila</option>
                      {upazilas.map(u => <option value={u?.name} key={u.id}>{u?.name}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400 text-sm" />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-10 pr-12 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-400 hover:text-gray-600 text-sm" />
                    ) : (
                      <FaEye className="text-gray-400 hover:text-gray-600 text-sm" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Must be 6+ characters with uppercase and lowercase letters
                </p>
              </div>

              {/* Register Button */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-2.5 px-4 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                style={{ backgroundColor: colors.accent }}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
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

              {/* Google Sign Up */}
              <button 
                type="button" 
                onClick={googleSignup}
                disabled={loading}
                className="w-full py-2.5 px-4 border border-gray-300 rounded-lg font-medium transition-all duration-200 hover:bg-gray-50 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-sm"
                style={{ color: colors.dark }}
              >
                <FcGoogle className="text-xl" />
                Continue with Google
              </button>

              {/* Login Link */}
              <div className="text-center pt-2">
                <span className="text-gray-600 text-sm">Already have an account? </span>
                <Link 
                  to="/login" 
                  className="font-medium hover:underline transition-colors duration-200 text-sm"
                  style={{ color: colors.accent }}
                >
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
