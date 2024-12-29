import React, { useEffect, useState } from "react";
import axios from "axios";

const Subscriptions = () => {
  const [data, setData] = useState([]);

  const getSubscriptions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3005/payment/subscriptions"
      );
      setData(res.data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  const handleSubmit = async (priceId) => {
    const payload = {
        priceId: priceId,
    };
    const res = await axios.post(
      "http://localhost:3005/payment/checkout-subscriptions",
      payload
    );
    window.open(res.data.session.url)
    console.log(res);
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <>
      <div className="text-center mt-5">
        <h2>PRICES</h2>
        <div className="d-flex justify-content-around mt-5">
          {data &&
            data.map((item) => (
              <>
                {console.log(item)}
                <div className="card w-25 text-center" key={item.id}>
                  <div className="card-header">
                    <h4>{item.nickname}</h4>
                  </div>
                  <div className="card-body">
                    <h4>{(item.unit_amount / 100).toFixed(2).replace('.', ',')}</h4>

                  </div>
                  <div className="card-footer">
                    <button
                      onClick={() => {
                        handleSubmit(item.id);
                      }}
                      className="btn btn-primary"
                    >
                      Pay
                    </button>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default Subscriptions;
