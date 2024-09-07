import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './AddBook.css'; // Import the CSS file

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
    <div className="add-book-container"> {/* Updated class */}
      <div className="add-book-card"> {/* Updated class */}
        <h2 className="add-book-title">Profile</h2> {/* Updated class */}
        <div className="text-left">
          <p className="label"> {/* Updated class */}
            <span className="font-semibold text-teal-400">Email:</span> {user.email}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
