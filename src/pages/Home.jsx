import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import philosophyBG from './philosophyBG.png';

const Home = () => {
    const isLoggedIn = useSelector((state) => state.users.isLoggedIn);

    return (
        <div 
            className="h-screen flex items-center justify-center"
        >
            <div className="text-center text-white p-4 sm:p-8 md:p-16 lg:p-24"> {/* Padding for mobile-first */}
                <h1 className="text-5xl font-bold mb-4">Welcome to AI Philosophy Navigator</h1>
                <p className="text-xl mb-8">Know the philosophies your worldview is already aligned with with the help of AI and your thoughts.</p>
                {isLoggedIn ? (
                    <Link to="/quiz" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Take the Quiz
                    </Link>
                ) : (
                    <Link to="/login" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Login to Start
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Home;
