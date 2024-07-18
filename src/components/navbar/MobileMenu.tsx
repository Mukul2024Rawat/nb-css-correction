// components/mobile/MobileMenu.tsx
"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { FaHome, FaSearch, FaUser } from "react-icons/fa";
import { useGlobalModal } from "../../contexts/GlobalModalContext";
import SearchModal from "../modals/SearchModal";
import { useState } from "react";

const MobileMenu = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { openLoginModal} = useGlobalModal();
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  const closeSearchModal = () => {
    setSearchModalOpen(false);
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      router.push("/user/dashboard/profile");
    } else {
      openLoginModal();
    }
  };

  const handleHomeClick = () => {
    router.push("/");
  };

  const handleSearchClick = () => {
    setSearchModalOpen(true);
  };

  return (
    <div className="fixed bottom-0 z-10 w-full md:hidden bg-white text-gray-700 font-semibold shadow-md">
      <ul className="flex justify-around py-4">
        <li className="flex flex-col items-center" onClick={handleHomeClick}>
          <FaHome size={24} />
          <span className="text-xs">Home</span>
        </li>
        <li className="flex flex-col items-center" onClick={handleSearchClick}>
          <FaSearch size={24} />
          <span className="text-xs">Search</span>
        </li>
        <li className="flex flex-col items-center" onClick={handleProfileClick}>
          <FaUser size={24} />
          <span className="text-xs">Profile</span>
        </li>
      </ul>
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={closeSearchModal}
      />
    </div>
  );
};

export default MobileMenu;
