"use client";

import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";

export default function Home() {
  const appId = "YOUR_APP_ID";
  const locationId = "YOUR_LOCATION_ID";

  return (
    <PaymentForm
      applicationId={appId}
      locationId={locationId}
      cardTokenizeResponseReceived={async (token) => {
        const result = await submitPayment(token.token);
        console.log(result);
      }}
    >
      <CreditCard />
    </PaymentForm>
  );
}