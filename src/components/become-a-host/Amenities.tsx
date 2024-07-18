import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setAmenities } from '@/store/slices/formSlice';
import { FiWifi, FiTv, FiHome } from 'react-icons/fi';
import { MdKitchen, MdLocalLaundryService, MdAcUnit, MdFitnessCenter, MdOutdoorGrill, MdPets, MdLocalParking, MdPool } from 'react-icons/md';
import { FaFirstAid, FaShieldAlt, FaBell } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';

interface Amenity {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const amenities: Amenity[] = [
  { id: '1', name: 'Air conditioning', icon: <MdAcUnit /> },
  { id: '2', name: 'Kitchen', icon: <MdKitchen /> },
  { id: '3', name: 'Washing machine', icon: <MdLocalLaundryService /> },
  { id: '4', name: 'Exercise equipment', icon: <MdFitnessCenter /> },
  { id: '5', name: 'Parking', icon: <MdLocalParking /> },
  { id: '6', name: 'Swimming pool', icon: <MdPool /> },
  { id: '7', name: 'Outdoor dining area', icon: <MdOutdoorGrill /> },
  { id: '8', name: 'First aid kit', icon: <FaFirstAid /> },
  { id: '9', name: 'Pet allowed', icon: <MdPets /> },
  { id: '10', name: 'Smoke alarm', icon: <FaBell /> },
  { id: '11', name: 'Security and monitoring', icon: <FaShieldAlt /> },
  { id: '12', name: 'WiFi', icon: <FiWifi /> },
  { id: '13', name: 'TV', icon: <FiTv /> },
  { id: '14', name: 'Dedicated workspace', icon: <FiHome /> },
];

const AmenitiesStep = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const dispatch = useDispatch();
  const selectedAmenities = useSelector((state: RootState) => state.form.amenities.map(a => a.amenity_id));
  const [localSelectedAmenities, setLocalSelectedAmenities] = useState<string[]>(selectedAmenities.map(id => id.toString()));

  const toggleAmenity = (id: string) => {
    setLocalSelectedAmenities(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    dispatch(setAmenities(localSelectedAmenities.map(id => ({ amenity_id: parseInt(id) }))));
  }, [localSelectedAmenities, dispatch]);

  const isComplete = localSelectedAmenities.length >= 5;

  return (
    <div className="flex flex-col h-screen bg-zinc-200">
      <Header />
      <main className="flex-grow overflow-y-auto pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">Tell guests what your place has to offer</h1>
            <p className="text-gray-600 mb-6">You can add more amenities after you publish your listing.</p>
            
            <h2 className="text-xl font-semibold mb-4 text-gray-700">What about these guest favourites?</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {amenities.map((amenity) => (
                <button
                  key={amenity.id}
                  onClick={() => toggleAmenity(amenity.id)}
                  className={`flex items-center p-4 border rounded-lg transition-all duration-200 ${
                    localSelectedAmenities.includes(amenity.id)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-2xl mr-3">{amenity.icon}</span>
                  <span className="font-medium">{amenity.name}</span>
                </button>
              ))}
            </div>

            {!isComplete && (
              <p className="mt-6 text-red-500 font-medium">Please select at least 5 amenities.</p>
            )}

            {isComplete && (
              <p className="mt-6 text-green-500 font-medium">
                Great! You&apos;ve selected {localSelectedAmenities.length} amenities.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer onBack={onBack} onNext={onNext} isNextDisabled={!isComplete} />
    </div>
  );
};

export default AmenitiesStep;