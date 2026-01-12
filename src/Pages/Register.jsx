import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const { registerWithEmailPassword, setUser, handleGoogleSignin } =
    useContext(AuthContext);
  
  const navigate = useNavigate();

    //usestate for district and upazila 
    const [upazilas, setUpazilas] = useState([])
    const [districts, setDistricts] = useState([])
    const [district, setDistrict] = useState('')
    const [upazila, setUpazila] = useState('')


    //for district and upazila data fetch from public folder
    useEffect(()=>{
      axios.get('/upazila.json')
      .then(res=>{
       setUpazilas(res.data.upazilas)
        
      })

      axios.get('/district.json')
      .then(res=>{
        setDistricts(res.data.districts)
      })

    },[])
    // console.log(upazila);
    

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      return toast.error("Password must be at least 6 characters");
    }
    if (!uppercase.test(pass)) {
      return toast.error("Password must contain at least one uppercase letter");
    }
    if (!lowercase.test(pass)) {
      return toast.error("Password must contain at least one lowercase letter");
    }

    if (!district) {
      return toast.error("Please select your district");
    }
    if (!upazila) {
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
    }
  };

  const googleSignup = () => {
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
      });
  };

  return (
    <div>
      <title>Register</title>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="fieldset">
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                  required
                />
                <label className="label">Name</label>
                <input
                  name="name"
                  type="text"
                  className="input"
                  placeholder="Your full name"
                  required
                />

                <label className="label">Photo (Optional)</label>
                <input
                  name="photoUrl"
                  type="file"
                  className="input"
                  accept="image/*"
                />

                <label className="label">Blood Group</label>
                <select name="blood" defaultValue="" className="select" required>
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

                <label className="label">District</label>
                <select 
                  value={district} 
                  onChange={(e)=> setDistrict(e.target.value)} 
                  className="select"
                  required
                >
                  <option disabled value=''>Select Your District</option>
                  {
                    districts.map(d=> <option value={d?.name} key={d.id}>{d?.name}</option>)
                  }
                </select>

                <label className="label">Upazila</label>
                <select 
                  value={upazila} 
                  onChange={(e)=> setUpazila(e.target.value)} 
                  className="select"
                  required
                >
                  <option disabled value=''>Select Your Upazila</option>
                  {
                    upazilas.map(u=> <option value={u?.name} key={u.id}>{u?.name}</option>)
                  }
                </select>

                <label className="label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="input"
                  placeholder="Password"
                  required
                />

                <button type="button" onClick={googleSignup} className="btn btn-outline w-full mb-4">
                  <FcGoogle className="text-xl" />
                  Continue with Google
                </button>

                <div className="text-center mb-4">
                  <span>Already have an account? </span>
                  <Link to={"/login"} className="text-blue-500 hover:underline">
                    Login
                  </Link>
                </div>
                <button type="submit" className="btn btn-neutral w-full">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
