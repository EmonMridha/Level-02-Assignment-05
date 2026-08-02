import { getRentalRequestsForLandlord } from '@/lib/services/getRentRequests'
import { getTotalEarnings } from '@/lib/services/paymentService';
import { getPropertiesForLandlord } from '@/lib/services/propertyService';

const LandlordDashboard = async() => {
  const allRentalRequests = await getRentalRequestsForLandlord()
  const myProperties = await getPropertiesForLandlord()
  const totalProperties = myProperties.data.length;
  const totalRequests = allRentalRequests.data.length;
  const res = await getTotalEarnings()
  const totalEarnings = res.data

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Landlord Dashboard</h1>
      <p>Welcome to the Landlord Dashboard! Here you can manage your properties, view rental requests, and more.</p>

      <div>
        <h2 className="text-xl font-semibold mt-6 mb-2">Recent Rental Requests: {totalRequests}</h2>
      </div>
      <div>
        <h2 className="text-xl font-semibold mt-6 mb-2">Your Properties: {totalProperties}</h2>
      </div>
      <div>
        <h2 className="text-xl font-semibold mt-6 mb-2">Total Earnings: {totalEarnings}</h2>
      </div>
    </div>
  )
}

export default LandlordDashboard