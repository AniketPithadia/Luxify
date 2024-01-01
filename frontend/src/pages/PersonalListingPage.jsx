import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const PersonalListingPage = () => {
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const handleShowListings = async () => {
      try {
        setShowListingError(false);
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setShowListingError(true);
          return;
        }
        console.log(data);
        setUserListings(data);
      } catch (err) {
        setShowListingError(true);
      }
    };
    handleShowListings();
  }, [currentUser._id]);

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="my-24 px-6 min-h-screen w-full">
      {userListings.length === 0 && (
        <h1 className="flex justify-center items-center gap-4">
          You have no listings yet!{" "}
          <Link to="/create-listing">
            <button className="bgBaseBrown  text-white p-2 rounded hover:bg-yellow-900 focus:outline-none focus:ring focus:border-orange-950">
              Click here to Create One.
            </button>
          </Link>
        </h1>
      )}
      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4 items-center w-full">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4 md:w-2/4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className="flex   gap-4 items-center">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 border border-red-700 rounded-md p-1"
                >
                  <MdDelete size={25} />
                </button>
                <Link to={`/edit-listing/${listing._id}`}>
                  <button className="text-green-700 border border-green-900 rounded-md p-1">
                    <FaEdit size={25} />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonalListingPage;
