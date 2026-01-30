import React, { useContext, useEffect, useState } from "react";

import toast from "react-hot-toast";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure(AuthContext);

  const [profile, setProfile] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => {
          const userData = res.data;
          // If no profile picture in database, use Firebase user photo
          if (!userData.mainPhotoUrl && user.photoURL) {
            userData.mainPhotoUrl = user.photoURL;
          }
          // If no name in database, use Firebase user name
          if (!userData.name && user.displayName) {
            userData.name = user.displayName;
          }
          setProfile(userData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error loading profile:", error);
          // If user doesn't exist, create a basic profile with Firebase data
          const basicProfile = {
            email: user.email,
            name: user.displayName || user.email.split('@')[0],
            mainPhotoUrl: user.photoURL || "https://i.ibb.co/MBtjqXQ/no-avatar.gif",
            role: "donar",
            status: "active"
          };
          setProfile(basicProfile);
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  const handleSave = (e) => {
    e.preventDefault();

    // Prepare data for update
    const updateData = {
      email: user.email,
      ...profile
    };

    console.log("Saving profile:", updateData);

    // First try the database version, then fallback to simple version
    axiosSecure
      .post("/update-profile-db", updateData)
      .then((response) => {
        console.log("Profile update response (DB):", response.data);
        toast.success("Profile updated successfully!");
        setIsEdit(false);
        
        if (response.data.profile) {
          setProfile(response.data.profile);
        }
      })
      .catch((dbError) => {
        console.log("Database update failed, trying simple update:", dbError.message);
        
        // Fallback to simple update
        axiosSecure
          .post("/update-profile", updateData)
          .then((response) => {
            console.log("Profile update response (Simple):", response.data);
            toast.success("Profile updated successfully!");
            setIsEdit(false);
            
            if (response.data.profile) {
              setProfile(response.data.profile);
            }
          })
          .catch((simpleError) => {
            console.error("Both database and simple update failed:", simpleError);
            
            // Last resort: just update locally
            setProfile({
              ...profile,
              updatedAt: new Date().toISOString()
            });
            setIsEdit(false);
            toast.success("Profile updated locally!");
          });
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto my-12 p-6 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Profile</h2>

        {!isEdit && (
          <button
            onClick={() => setIsEdit(true)}
            className="btn btn-sm bg-blue-600 text-white"
          >
            Edit
          </button>
        )}
      </div>

      <div className="flex justify-center mb-6">
        <img
          src={profile?.mainPhotoUrl || user?.photoURL || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
          alt="avatar"
          className="w-24 h-24 rounded-full object-cover border"
          onError={(e) => {
            e.target.src = "https://i.ibb.co/MBtjqXQ/no-avatar.gif";
          }}
        />
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="label">Profile Photo URL</label>
          <input
            type="url"
            value={profile?.mainPhotoUrl || ""}
            disabled={!isEdit}
            onChange={(e) => setProfile({ ...profile, mainPhotoUrl: e.target.value })}
            className="input input-bordered w-full"
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        <div>
          <label className="label">Name</label>
          <input
            type="text"
            value={profile?.name || ""}
            disabled={!isEdit}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Email</label>
          <input
            type="email"
            value={profile?.email || user?.email}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="label">Blood Group</label>
          <select
            disabled={!isEdit}
            value={profile?.blood || ""}
            onChange={(e) => setProfile({ ...profile, blood: e.target.value })}
            className="select select-bordered w-full"
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">District</label>
          <input
            type="text"
            value={profile?.district || ""}
            disabled={!isEdit}
            onChange={(e) =>
              setProfile({ ...profile, district: e.target.value })
            }
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Upazila</label>
          <input
            type="text"
            value={profile?.upazila || ""}
            disabled={!isEdit}
            onChange={(e) =>
              setProfile({ ...profile, upazila: e.target.value })
            }
            className="input input-bordered w-full"
          />
        </div>

        {isEdit && (
          <button className="btn bg-green-600 text-white w-full mt-6">
            Save Changes
          </button>
        )}
      </form>
    </div>
  );
};

export default Profile;
