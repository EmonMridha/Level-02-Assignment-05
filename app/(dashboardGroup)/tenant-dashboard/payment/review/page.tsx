import { submitReview } from '@/app/(dashboardGroup)/_actions/reviewActionForm';
import { getPropertyById } from '@/lib/services/getPropertyById';


const Review = async ({ searchParams }: { searchParams: { propertyId: string } }) => {
    const { propertyId } = await searchParams;
    const res = await getPropertyById(propertyId);
    const result = await res.data
    return (
        <div>
            <form action={submitReview} className="space-y-4">
                <input
                    type="hidden"
                    name="propertyId"
                    value={propertyId}
                />

                <h1>{result.title}</h1>

                <label>Rating</label>
                <select name="rating" required>
                    <option value="5">5 ⭐</option>
                    <option value="4">4 ⭐</option>
                    <option value="3">3 ⭐</option>
                    <option value="2">2 ⭐</option>
                    <option value="1">1 ⭐</option>
                </select>

                <label>Comment</label>
                <textarea
                    name="comment"
                    required
                    placeholder="Write your review..."
                />

                <button type="submit">
                    Submit Review
                </button>
            </form>
        </div>
    )
}

export default Review