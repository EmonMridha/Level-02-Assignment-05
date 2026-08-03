import { getRentalRequestsForLandlord } from "@/lib/services/getRentRequests"
import RequestsClient from './RequestsClient'

export default async function RequestsPage() {
    const res = await getRentalRequestsForLandlord()
    const requests = res.data || []

    return <RequestsClient requests={requests} />
}