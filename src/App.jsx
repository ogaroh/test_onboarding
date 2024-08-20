import { useState } from "react";
import "./App.css";

import { loadConnectAndInitialize } from "@stripe/connect-js";
import {
  ConnectPayments,
  ConnectAccountOnboarding,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js";

export default function App() {
  // We use `useState` to ensure the Connect instance is only initialized once
  const [stripeConnectInstance] = useState(() => {
    const fetchClientSecret = async () => {
      // Fetch the AccountSession client secret
      const response = await fetch("http://localhost:4242/account_session", { // TODO: 
        method: "POST",
      });
      if (!response.ok) {
        // Handle errors on the client side here
        const { error } = await response.json();
        // console.error("An error occurred: ", error);
        // document.querySelector("#error").removeAttribute("hidden");
        return undefined;
      } else {
        const { client_secret: clientSecret } = await response.json();
        // document.querySelector("#error").setAttribute("hidden", "");
        return clientSecret;
      }
    };

    return loadConnectAndInitialize({
      // This is a placeholder - it should be replaced with your publishable API key.
      // Sign in to see your own test API key embedded in code samples.
      // Don’t submit any personally identifiable information in requests made with this key.
      publishableKey:
        "pk_test_51PiQ4pIWpw89jQNvQqK4DIvrdOBxaQCjSoinCC6v85pSOSxiRmVqU9h38akTBSfq9v9AFcBd4rQEAUftDgz655wN00A1uKBlIt",
      fetchClientSecret: fetchClientSecret,
    });
  });

  return (
    <div className="container">
      <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
        <ConnectAccountOnboarding
          onExit={() => {
            console.log("The account has exited onboarding");
          }}
          // Optional: make sure to follow our policy instructions above
          // fullTermsOfServiceUrl="{{URL}}"
          // recipientTermsOfServiceUrl="{{URL}}"
          // privacyPolicyUrl="{{URL}}"
          // skipTermsOfServiceCollection={false}
          // collectionOptions={{
          //   fields: 'eventually_due',
          //   futureRequirements: 'include',
          // }}
        />
      </ConnectComponentsProvider>
    </div>
  );
}
