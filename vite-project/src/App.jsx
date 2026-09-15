import React from 'react';
import ProductCard from './components/ProductCard';

const App = () => {
  return (
    <section className="flex flex-col justify-center items-center min-h-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white py-10">
      {/* Main */}
      <main className="flex flex-col items-center">
        {/* Top */}
        <div className="flex justify-center items-center space-x-4 mb-3">
          <img
            className="w-16 lg:w-28"
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt="react logo"
          />
          <img
            className="w-8 lg:w-10"
            src="https://cdn-icons-png.flaticon.com/128/10238/10238173.png"
            alt="plus icon"
          />
          <img
            className="w-40 lg:w-72"
            src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg"
            alt="razorpay logo"
          />
        </div>

        {/* Title */}
        <h1 className="text-xl text-center lg:text-3xl font-bold mb-4">
          Razorpay Payment Integration using React And Node js
        </h1>

        {/* T-shirt Product Card */}
        <ProductCard />
      </main>
    </section>
  );
};

export default App;