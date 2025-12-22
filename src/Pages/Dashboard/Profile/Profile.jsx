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
          setProfile(res.data);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Failed to load profile");
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  const handleSave = (e) => {
    e.preventDefault();

    axiosSecure
      .put(`/users/${user.email}`, profile)
      .then(() => {
        toast.success("Profile updated successfully");
        setIsEdit(false);
      })
      .catch(() => {
        toast.error("Failed to update profile");
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
          src={profile?.mainPhotoUrl || user?.photoURL}
          alt="avatar"
          className="w-24 h-24 rounded-full object-cover border"
        />
      </div>

      <form onSubmit={handleSave} className="space-y-4">
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
