import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Registration successful!');
      navigate('/profile');
    } catch (error) {
      console.error('Error registering:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen  bg-[#c7b0ee]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create an Account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white font-medium py-3 rounded-lg transition-colors duration-300 hover:bg-[#c7b0ee]"
            >
            Register
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-sm text-center">
          Already have an account? <a href="/login" className="text-black-900 font-semibold hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
