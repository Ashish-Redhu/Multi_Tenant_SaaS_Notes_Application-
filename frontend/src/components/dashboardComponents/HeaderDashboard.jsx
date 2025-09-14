import axios from "axios";
import { FaStar } from "react-icons/fa";

export default function HeaderDashboard({user}){
    const backendURI = import.meta.env.VITE_BACKEND_URI;

    const handleUpgrade = async () => {
        const confirmUpgrade = window.confirm("Are you sure you want to upgrade your tenancy to Pro?");
        if (!confirmUpgrade) return;
    
        try {
          const response = await axios.post(
            `${backendURI}/tenants/${user.tenancy._id}/upgrade`,
            {},
            { withCredentials: true }
          );
          alert(response.data.message);
        } catch (err) {
          console.error(err);
          alert(err.response?.data?.message || "Error upgrading tenancy");
        }
    };

    return(
        <header
            className={`fixed top-0 left-0 w-full shadow-md p-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-0
                        ${user.tenancy.plan === "pro" ? "bg-gradient-to-bl from-gray-950 to-purple-700 text-white" : "bg-gray-800 text-white"}`}
            >
            {/* Heading */}
            <div className="flex justify-center w-full md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                <div className="text-2xl md:text-4xl lg:text-6xl font-bold text-center">
                    {user.tenancy.tenancyName}
                </div>
            </div>

            {/* Buttons and Plan badge */}
            <div className="flex flex-col md:flex-row items-center w-full md:w-auto gap-2 md:gap-4 mt-2 md:mt-0 md:ml-auto justify-center md:justify-end">
                
                {/* Upgrade Button */}
                {user.userType === "admin" && user.tenancy.plan !== "pro" && (
                    <button
                        className="flex items-center justify-center text-white px-3 py-1 md:px-4 md:py-2 rounded-md shadow-md font-semibold
                                    transition-all duration-200 text-sm md:text-base
                                    bg-gradient-to-r from-purple-800 via-violet-900 to-purple-700
                                    hover:from-purple-700 hover:via-violet-800 hover:to-purple-600
                                    hover:shadow-lg hover:cursor-pointer"
                        onClick={handleUpgrade}
                    >
                        Upgrade to Pro
                    </button>
                )}

                {/* Plan Badge */}
                <span
                    className={`inline-flex items-center gap-1 px-2 py-1 md:px-3 md:py-1.5 rounded-full font-semibold text-xs md:text-sm
                                ${user.tenancy.plan === "pro"
                                    ? "bg-yellow-400 text-gray-900 shadow-lg"
                                    : "bg-gray-700 text-gray-300"
                                }`}
                >
                    {user.tenancy.plan === "pro" && <FaStar />}
                    {user.tenancy.plan.toUpperCase()}
                </span>
            </div>
            </header>

    )
}
