import React from 'react';

import {StripeProvider} from '@stripe/stripe-react-native';
import CheckoutScreen from './src/Checkout';

function App() {
  return (
    // eslint-disable-next-line react/self-closing-comp
    <StripeProvider
      publishableKey="pk_test_51IVK5JCcKZ8jC0YiVS30snutWCDUSdDmwEeM4IdoqgoZMyMsDcAdmJ1sL1hEAGslkSt4djdwmsOUu0kAtpaotQvJ003aPjTji3"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.stripePayment" // required for Apple Pay
    >
      <CheckoutScreen />
    </StripeProvider>
  );
}

export default App();
