import { getRentalRequestById } from "@/lib/services/getRentRequests";
import { handlePayment } from "../../_actions/paymentActions";

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ requestId: string }>;
}) {

  const { requestId } = await searchParams;
  const result = await getRentalRequestById(requestId);
  const request = result.data;

  return (
    <div className="mx-auto max-w-2xl">

      <h1 className="mb-6 text-3xl font-bold">
        Make Payment
      </h1>

      <div className="rounded-lg border bg-white p-6 shadow-sm">

        <h2 className="text-xl font-semibold">
          Property Details
        </h2>

        <div className="mt-4 space-y-2">
          <p>🏠 {request.property.title}</p>
          <p>📍 {request.property.city}</p>
          <p>💰 BDT {parseInt(request.property.rent).toLocaleString()}/month</p>
        </div>

        <hr className="my-6" />

        <h2 className="text-xl font-semibold">
          Payment Summary
        </h2>

        <div className="mt-4 flex justify-between">
          <span>Total Amount</span>
          <span className="font-bold">
            BDT {parseInt(request.property.rent).toLocaleString()}
          </span>
        </div>

        <form action={handlePayment}>
          <input
            type="hidden"
            name="requestId"
            value={request.id}
          />

          <button
            type="submit"
            className="mt-6 w-full rounded bg-black px-4 py-3 text-white"
          >
            Pay BDT {parseInt(request.property.rent).toLocaleString()}
          </button>
        </form>
      </div>
    </div>
  );
}