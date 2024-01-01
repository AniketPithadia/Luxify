import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  console.log(listing);
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/getUser/${listing.userRef}`);
        const data = await res.json();
        if (data.success === false) {
          return;
        }
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <div>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={handleChange}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </div>
  );
}

// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// const Contact = ({ listing }) => {
//   const dispatch = useDispatch();
//   const currentUser = useSelector((state) => state.currentUser); // Assuming you have stored the current user in your Redux store

//   const [landlord, setLandlord] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setMessage(e.target.value);
//   };

//   useEffect(() => {
//     const fetchLandlord = async () => {
//       try {
//         const res = await fetch(`/api/user/getUser/${listing.userRef}`);
//         const data = await res.json();
//         if (data.success === false) {
//           return;
//         }
//         setLandlord(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchLandlord();
//   }, [listing.userRef]);

//   const sendEmail = () => {
//     // Check if the required information is available
//     if (currentUser && landlord && message) {
//       const data = {
//         currentUserEmail: currentUser.email,
//         landlordEmail: landlord.email,
//         subject: `Regarding ${listing.name}`,
//         text: message,
//       };

//       // Make a POST request to your backend with the email data
//       fetch("/api/send-email", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       })
//         .then((response) => response.json())
//         .then((result) => {
//           console.log(result.message);
//           // Handle the result as needed
//         })
//         .catch((error) => {
//           console.error("Error sending email:", error);
//         });
//     }
//   };

//   return (
//     <div>
//       {landlord && (
//         <div className="flex flex-col gap-2">
//           <p>
//             Contact <span className="font-semibold">{landlord.username}</span>{" "}
//             for{" "}
//             <span className="font-semibold">{listing.name.toLowerCase()}</span>
//           </p>
//           <textarea
//             name="message"
//             id="message"
//             rows="2"
//             value={message}
//             onChange={handleChange}
//             placeholder="Enter your message here..."
//             className="w-full border p-3 rounded-lg"
//           ></textarea>

//           <button
//             onClick={sendEmail}
//             className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
//           >
//             Send Message
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Contact;
