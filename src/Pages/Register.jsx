import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { FcGoogle } from "react-icons/fc";

import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const { registerWithEmailPassword, setUser, user } =
    useContext(AuthContext);

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
    console.log(upazila);
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;
    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl;
    const file = photoUrl.files[0];
    const blood = e.target.blood.value;

    console.log(blood)
    

    console.log(name, photoUrl);
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;

    if (pass.length < 6) {
      return alert("less than 6 characters");
    }
    if (!uppercase.test(pass)) {
      return alert("need a uppercase");
    }
    if (!lowercase.test(pass)) {
      return alert("need a lowercase");
    }

    //photourl response
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=1eb52fcd6f930f0298550f42df910f04`,
      { image: file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const mainPhotoUrl = res.data.data.display_url;

    const formData = {
      email,
      pass,
      name,
      mainPhotoUrl,
     blood, 
     district,
     upazila
    };

    console.log(formData);
   
    

    if (res.data.success == true) {
      registerWithEmailPassword(email, pass)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: mainPhotoUrl,
          })
            .then(() => {
              setUser(userCredential.user);
              //set user in database
              axios
                .post("http://localhost:5000/users", formData)
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => {
                  console.log(err);
                });

              toast.success("Account created successfully!");
            })
            .catch((error) => {
              console.log(error);
              toast.error("Failed to update profile.");
            });
        })

        .catch((err) => {
          console.log(err);
        });
    }
  };

  console.log(user);

  // const googleSignup = () => {
  //   handleGoogleSignin()
  //     .then((result) => {
  //       const user = result.user;
  //       setUser(user);
  //     })
  //     .catch((err) => console.log(err));
  // };

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
                />
                <label className="label">Name</label>
                <input
                  name="name"
                  type="text"
                  className="input"
                  placeholder="your full name"
                />

                <label className="label">PhotoUrl</label>
                <input
                  name="photoUrl"
                  type="file"
                  className="input"
                  placeholder="Enter your photo url"
                />

                <select name="blood" defaultValue="Choose Blood Group" className="select">
                  <option disabled={true}>Choose Blood Group</option>
                  
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>

                <select value={district} onChange={(e)=> setDistrict(e.target.value)} className="select">

                  <option disabled selected value=''>Select Your District</option>
                  {
                    districts.map(d=> <option value={d?.name} key={d.id}>{d?.name}</option>)
                  }
                </select>


                 <select value={upazila} onChange={(e)=> setUpazila(e.target.value)} className="select">

                  <option disabled selected value=''>Select Your Upazila</option>
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
                />
                {/* <div>
                  <a className="link link-hover">Forgot password?</a>
                </div> */}

                {/* <button onClick={googleSignup} className="btn">
                  <FcGoogle />
                </button> */}

                <div>
                  <span>Already have an account? </span>
                  <Link to={"/login"} className="text-blue-500">
                    Login
                  </Link>
                </div>
                <button className="btn btn-neutral mt-4">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
