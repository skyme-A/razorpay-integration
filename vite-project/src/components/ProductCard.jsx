import React, { useState } from "react";

export default function ProductCard() {
    const [paymentDetails, setPaymentDetails] = useState(null);

    const handlePayment = async () => {
        try {
            // 1. Backend server se Order create karwayein
            const res = await fetch("http://localhost:5000/api/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: 350 }),
            });

            const orderData = await res.json();

            if (!orderData.id) {
                alert("Order create nahi ho paya. Backend keys check karein.");
                return;
            }

            // 2. Razorpay Checkout Popup Configuration
            const options = {
                key: "rzp_test_TcNfi1K6MlONQG", // <-- Yahan apni Razorpay Key ID dalein
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Pink T-Shirt Store",
                description: "Payment for T-Shirt",
                order_id: orderData.id,
                handler: function (response) {
                    // Payment complete hone par receipt screen dikhayein
                    setPaymentDetails({
                        paymentId: response.razorpay_payment_id,
                        orderId: response.razorpay_order_id,
                        amount: 350,
                    });
                },
                prefill: {
                    name: "Test Customer",
                    email: "customer@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#1e90ff",
                },
            };

            // 3. Razorpay Popup Open karein
            const razorpayInstance = new window.Razorpay(options);
            razorpayInstance.open();

        } catch (error) {
            console.error("Payment error:", error);
            alert("Backend se connect nahi ho paya!");
        }
    };

    // ✅ Payment complete hone ke baad ye Success Receipt Screen dikhegi:
    if (paymentDetails) {
        return (
            <div className="mt-6 w-96 bg-[#222f3e] text-white rounded-xl shadow-2xl overflow-hidden p-8 border border-green-500/30 flex flex-col items-center text-center">
                {/* Green Checkmark Icon */}
                <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4 ring-8 ring-green-500/10">
                    <svg
                        className="w-10 h-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                <h3 className="text-2xl font-bold text-white mb-1">
                    Payment Successful! 🎉
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                    Aapka order successfully place ho gaya hai.
                </p>

                {/* Receipt Box */}
                <div className="w-full bg-[#1b2430] rounded-lg p-4 mb-6 text-left space-y-2 border border-gray-700">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Amount Paid:</span>
                        <span className="font-semibold text-green-400">₹{paymentDetails.amount}.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Status:</span>
                        <span className="font-semibold text-green-400">Captured ✅</span>
                    </div>
                    <div className="flex flex-col text-sm pt-2 border-t border-gray-700">
                        <span className="text-gray-400 text-xs">Payment ID:</span>
                        <span className="font-mono text-xs text-blue-400 break-all">
                            {paymentDetails.paymentId}
                        </span>
                    </div>
                </div>

                {/* Buy Again Button */}
                <button
                    onClick={() => setPaymentDetails(null)}
                    className="w-full bg-[#1e90ff] hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-md"
                >
                    Buy Another T-Shirt
                </button>
            </div>
        );
    }

    // Normal Product Card:
    return (
        <div className="mt-6 w-96 bg-[#222f3e] text-white rounded-xl shadow-lg overflow-hidden">
            {/* CardHeader */}
            <div className="relative h-96 bg-[#2C3A47] flex items-center justify-center p-6">
                <svg
                    viewBox="0 0 512 512"
                    className="h-72 w-72 drop-shadow-2xl transition-transform hover:scale-105 duration-300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M368.5 73.5c-15.8 19.3-40.4 31.5-67.5 31.5h-90c-27.1 0-51.7-12.2-67.5-31.5L42 124.8c-7.8 3.3-12.3 11.6-10.7 20l24 120c1.8 9.2 10.3 15.6 19.6 14.6l53.1-5.9V448c0 17.7 14.3 32 32 32h192c17.7 0 32-14.3 32-32V273.5l53.1 5.9c9.3 1 17.8-5.4 19.6-14.6l24-120c1.6-8.4-2.9-16.7-10.7-20L368.5 73.5z"
                        fill="#F472B6"
                    />
                    <path
                        d="M211 105h90c27.1 0 51.7-12.2 67.5-31.5-20.5-8.5-44.5-13.5-70-13.5h-85c-25.5 0-49.5 5-70 13.5 15.8 19.3 40.4 31.5 67.5 31.5z"
                        fill="#EC4899"
                    />
                </svg>
            </div>

            {/* CardBody */}
            <div className="p-6">
                <h5 className="mb-2 text-xl font-bold text-white">
                    My First Product
                </h5>
                <p className="text-white text-base">
                    ₹350 <span className="line-through text-gray-400 ml-2">₹699</span>
                </p>
            </div>

            {/* CardFooter */}
            <div className="p-6 pt-0">
                <button
                    onClick={handlePayment}
                    className="w-full bg-[#1e90ff] hover:bg-blue-600 active:scale-95 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md"
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
}