import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import auth from "../firebase/firebase.config";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

const Login = () => {
  const { setUser, handleGoogleSignin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
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
      });
  };

  const googleSignin = () => {
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
      });
  };

  const handleForget = () => {
    if (!email) {
      toast.error("Please enter your email first");
      return;
    }
    navigate(`/forget/${email}`);
  };

  return (
    <div>
      <title>Login</title>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="fieldset">
                <label className="label">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                  required
                />
                <label className="label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="input"
                  placeholder="Password"
                  required
                />
                <div>
                  <button type="button" onClick={handleForget} className="link link-hover">
                    Forgot password?
                  </button>
                </div> 

                <button type="button" onClick={googleSignin} className="btn btn-outline w-full mb-4">
                  <FcGoogle className="text-xl" />
                  Continue with Google
                </button>

                <div className="text-center mb-4">
                  <span>Don't have an account? </span>
                  <Link to={"/signup"} className="text-blue-500 hover:underline">
                    Register
                  </Link>
                </div>
                <button type="submit" className="btn btn-neutral w-full">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
