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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile</h2>
        <div className="text-left">
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-bold">Email:</span> {user.email}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
