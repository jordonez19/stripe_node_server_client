import "./App.css";
import "bootswatch/dist/pulse/bootstrap.min.css";
/* stripe */
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/CheckoutForm";
import Subscriptions from "./components/Subscriptions";

function App() {
  const stripePromise = loadStripe(
    "pk_test_51Qb71wRvK5c7Z1at6rFgiscssrWEV1fIbMvfUCrlYTcM9GL1FR7DxSGxFHM3YN8yTowrdyE8kRf0Plp07bUt21Vi00Xgm2d2LX"
  );

  return (
    <>
      <Subscriptions />
      {/* <Elements stripe={stripePromise} >
        <CheckoutForm />
      </Elements> */}
    </>
  );
}

export default App;
