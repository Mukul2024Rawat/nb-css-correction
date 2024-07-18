import { Booking } from "@/types/userAuthentication";

export const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "text-green-500";
      case "Pending":
        return "text-yellow-500";
      case "Cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };
  // Sample booking data
  export const sampleBookings: Booking[] = [
    {
      id: "booking1",
      placeName: "Cozy Beach House",
      address: "123 Ocean Avenue, Beach City",
      checkInDate: "2024-07-10",
      checkOutDate: "2024-07-15",
      status: "Confirmed",
      persons: 2,
      details: "Enjoy a relaxing stay by the beach!"
    },
    {
      id: "booking2",
      placeName: "Mountain Retreat",
      address: "456 Mountain Road, Serene Valley",
      checkInDate: "2024-08-01",
      checkOutDate: "2024-08-05",
      status: "Pending",
      persons: 3,
      details: "Escape to the mountains for a peaceful getaway."
    },
    {
      id: "booking3",
      placeName: "City Center Apartment",
      address: "789 Main Street, Metro City",
      checkInDate: "2024-07-20",
      checkOutDate: "2024-07-25",
      status: "Cancelled",
      persons: 1,
      details: "Modern apartment in the heart of the city."
    }
  ];
