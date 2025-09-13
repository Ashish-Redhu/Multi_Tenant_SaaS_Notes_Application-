export default function HeaderDashboard({tenancyName, tenancyPlan}){
    return(
        <header
            className={`fixed top-0 left-0 w-full shadow-md p-4 text-center flex justify-between items-center ${
                tenancyPlan === "pro"
                ? "bg-gradient-to-bl from-gray-950 to-purple-700 text-white"
                : "bg-gray-800"
            }`}
            >
            <div className="flex-grow text-center">
                <h1 className="text-2xl font-bold">Tenancy - {tenancyName}</h1>
            </div>
            <p className="mr-5 mt-[-10px]">Plan: {tenancyPlan}</p>
        </header>
    )
}