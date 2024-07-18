"use client";
import { useState } from "react";
// import { fetchUserBookings, cancelBooking } from "../api/index"; // Commented out API imports
import { Booking } from "@/types/userAuthentication";
import { getStatusColor, sampleBookings } from "@/utils/booking/staticData";
import WithAuth from "./withAuth";

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
//Api calling to fetch the user bookings
  // useEffect(() => {
  //   fetchBookings();
  // }, []);

  // Function to fetch bookings (commented out for mock data)
  // const fetchBookings = async () => {
  //   setIsLoading(true);
  //   setError("");
  //   try {
  //     const response = await fetchUserBookings();
  //     setBookings(response.data);
  //   } catch (error) {
  //     setError("Failed to fetch bookings");
  //     console.error("Failed to fetch bookings", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  // Function to handle cancellation (mocked function)
  const handleCancelBooking = (id: string) => {
    // Mock logic to update state or perform other actions
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <ul>
          {/* Sample booking cards */}
          {sampleBookings.map((booking) => (
            <li key={booking.id} className="mb-4">
              <div className="p-4 border border-gray-300 rounded-lg">
                <h3 className="font-bold text-lg">{booking.placeName}</h3>
                <p>{booking.address}</p>
                <p>
                  Check-In: {booking.checkInDate} | Check-Out: {booking.checkOutDate}
                </p>
                <p>
                  Status: <span className={getStatusColor(booking.status)}>{booking.status}</span>
                </p>
                <p>No. of Persons: {booking.persons}</p>
                <p>{booking.details}</p>
                {booking.status !== "Cancelled" && (
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    className="mt-4 bg-rose-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WithAuth(MyBookings);
