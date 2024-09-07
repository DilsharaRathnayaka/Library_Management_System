import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Profile() {
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert('You need to be logged in to view your profile.');
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-[#c7b0ee]"> {/* Full-screen flex layout with background */}
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full"> {/* Card container */}
        <h2 className="text-3xl font-bold text-center text-Black-600 mb-10">Profile</h2> {/* Title */}
        <div className="text-left space-y-4"> {/* Content section */}
          <p className="text-lg">
            <span className="font-semibold text-teal-400">Email:</span> {user.email}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
