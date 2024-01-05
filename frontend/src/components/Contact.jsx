import { useEffect, useState } from "react";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
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
            Contact Info of the Property Owner :
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <div className="flex flex-col gap-2 justify-center ">
            <p>
              Name :{" "}
              <span className="font-md font-medium">{landlord.username}</span>
            </p>
            <p>
              Email :
              <span className="font-md font-medium">{landlord.email}</span>{" "}
            </p>
            <p>
              Mobile Number :{" "}
              <span className="font-md font-medium">
                {listing.contactNumber}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
