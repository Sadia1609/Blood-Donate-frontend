// import React, { useEffect, useState } from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const MyRequest = () => {
//     const [status, setStatus] = useState("");

//   const [totalRequest, setTotalRequest] = useState(0);
//   const [myRequests, setMyRequests] = useState([]);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   const axiosSecure = useAxiosSecure();

//   useEffect(() => {
//     axiosSecure
//       .get(`/my-request?page=${currentPage - 1}&size=${itemsPerPage}`)
//       .then((res) => {
//         setMyRequests(res.data.request);
//         //pagination count
//         setTotalRequest(res.data.totalRequest);
//       });
//   }, [axiosSecure, currentPage, itemsPerPage]);

//   //number of page
//   const numberOfPages = Math.ceil(totalRequest / itemsPerPage);

//   const pages = [...Array(numberOfPages).keys()].map((e) => e + 1);

//   // console.log(myRequests);
//   // console.log(totalRequest);
// //   console.log(pages);

// const handlePrev = ()=>{
//    if(currentPage > 1){
//      setCurrentPage(currentPage-1)
//    }
// }

// const handleNext = ()=>{
//     if(currentPage < pages.length){
//         setCurrentPage(currentPage+1)
//     }
// }

//   return (
//     <div>
//       <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
//         <table className="table">
//           {/* head */}
//           <thead>
//             <tr>
//               <th></th>
//               <th>Name</th>
//               <th>Hospital Name</th>
//               <th>Blood Group</th>
//             </tr>
//           </thead>
//           <tbody>
//             {myRequests.map((request, index) => (
//               <tr>
//                 <th>{(currentPage * 10) + (index + 1)-10}</th>
//                 <td>{request.recipient_name}</td>
//                 <td>{request.hospital_name}</td>
//                 <td>{request.blood_group}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="flex justify-center mt-12 gap-4">
//         <button onClick={handlePrev} className="btn">Prev</button>
//         {
//             pages.map(page=>
//                 <button
//                 className={`btn ${page === currentPage ? 'bg-[#435585] text-white' : ''}`}
//                  onClick={()=>setCurrentPage(page)}>
//                     {page}
//                 </button>
//             )
//         }
//         <button onClick={handleNext} className="btn">Next</button>
//       </div>
//     </div>
//   );
// };

// export default MyRequest;

import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";

const MyRequest = () => {
  const [status, setStatus] = useState("");
  const [totalRequest, setTotalRequest] = useState(0);
  const [myRequests, setMyRequests] = useState([]);
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(
        `/my-request?page=${currentPage - 1}&size=${itemsPerPage}&status=${status}`
      )
      .then((res) => {
        setMyRequests(res.data.request);

        setTotalRequest(res.data.totalRequest);
      });
  }, [axiosSecure, currentPage, itemsPerPage, status]);


  const numberOfPages = Math.ceil(totalRequest / itemsPerPage);

  const pages = [...Array(numberOfPages).keys()].map((e) => e + 1);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < pages.length) setCurrentPage(currentPage + 1);
  };


  const handleStatusUpdate = (id, newStatus) => {
  axiosSecure
    .patch(`/request-status/${id}`, { status: newStatus })
    .then(() => {
      // refetch using CURRENT page & CURRENT filter
      axiosSecure
        .get(
          `/my-request?page=${currentPage - 1}&size=${itemsPerPage}&status=${status}`
        )
        .then((res) => {
          setMyRequests(res.data.request);
          setTotalRequest(res.data.totalRequest);
        });
    });
};

//delete

const handleDelete = (id) => {
    const confirmDelete = window.confirm(
    "Are you sure you want to delete this donation request?"
  );

  if (!confirmDelete) return;
  axiosSecure
    .delete(`/requests/${id}`)
    .then(() => {
      // refetch using CURRENT page & CURRENT filter
      axiosSecure
        .get(
          `/my-request?page=${currentPage - 1}&size=${itemsPerPage}&status=${status}`
        )
        .then((res) => {
          setMyRequests(res.data.request);
          setTotalRequest(res.data.totalRequest);
        });
    });
};


  return (
    <div>
      {/* Status Filter */}
      <div className="mb-4">
        <select
          className="select select-bordered"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-box border bg-base-100">
       <table className="table">
  <thead>
    <tr>
      <th>Recipient Name</th>
      <th>Recipient Location</th>
      <th>Donation Date</th>
      <th>Donation Time</th>
      <th>Blood Group</th>
      <th>Status</th>
      <th>Donor Info</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {myRequests.map((request) => (
      <tr key={request._id}>
        {/* Recipient Name */}
        <td>{request.recipient_name}</td>

        {/* Location */}
        <td>
          {request.recipient_district}, {request.recipient_upazila}
        </td>

        {/* Date */}
        <td>{request.donation_date || "—"}</td>

        {/* Time */}
        <td>{request.donation_time || "—"}</td>

        {/* Blood Group */}
        <td>{request.blood_group}</td>

        {/* Status */}
        <td className="capitalize font-medium">
          {request.donation_status}
        </td>

        {/* Donor Information */}
        <td>
          {request.donation_status === "inprogress" ? (
            <div className="text-sm">
              <p>{request.requester_name}</p>
              <p className="text-gray-500">{request.requester_email}</p>
            </div>
          ) : (
            "—"
          )}
        </td>

        {/* Actions */}
        <td className="flex flex-wrap gap-2">
          {/* View */}
          <Link
  to={`/dashboard/request-details/${request._id}`}
  className="btn btn-xs"
>
  View
</Link>


          {/* Edit */}
         <Link
  to={`/dashboard/edit-request/${request._id}`}
  className="btn btn-xs"
>
  Edit
</Link>


          {/* Delete */}
          <button
  className="btn btn-xs btn-error"
  onClick={() => handleDelete(request._id, "delete")}
>
  Delete
</button>


          {/* Done / Cancel ONLY when inprogress */}
          {request.donation_status === "inprogress" && (
  <>
    <button
      className="btn btn-xs btn-success"
      onClick={() => handleStatusUpdate(request._id, "done")}
    >
      Done
    </button>

    <button
      className="btn btn-xs btn-warning"
      onClick={() => handleStatusUpdate(request._id, "canceled")}
    >
      Cancel
    </button>
  </>
)}


        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        <button onClick={handlePrev} className="btn btn-sm">
          Prev
        </button>
        {pages.map((page) => (
          <button
            key={page}
            className={`btn btn-sm ${
              page === currentPage ? "bg-[#435585] text-white" : ""
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNext} className="btn btn-sm">
          Next
        </button>
      </div>
    </div>
  );
};

export default MyRequest;

