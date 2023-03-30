import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { checkout } from "../../checkout";

import { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";

import axios from "axios";
import { products } from "../data";

export default function Home() {
  const [amount, setAmount] = useState(10);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const addPaypalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=AR3oM4ssoaSVICpdYUu-N0LiB73CI3T5DEo3xyhug50fQY7D0BYzPEkRFWkqENIritLXgYYX9HjS2aho`;
    script.async = true;

    script.onload = () => setScriptLoaded(true);

    document.body.appendChild(script);
  };

  const addblockonomicsScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.blockonomics.co/js/pay_button.js`;
    script.async = true;

    script.onload = () => setScriptLoaded(true);

    document.body.appendChild(script);
  };

  useEffect(() => {
    addPaypalScript();
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Physical NFTs</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <div className={"container"}>
        <div>
          <Image src="/images/book.png" alt="NFT" width={400} height={400} />
          {/* STRIPE */}
          <button
            onClick={() => {
              checkout({
                lineItems: [
                  {
                    price: "price_1MqgUSAVH8wxQqMmfnYEFhtT",
                    quantity: 1,
                  },
                ],
              });
            }}
          >
            Stripe - BUY!
          </button>
          <span> ----</span>
          {/* PAYPAL */}
          {scriptLoaded ? (
            <PayPalButton
              amount={amount}
              onSuccess={(details, data) => {
                //save the transaction
                console.log(details);
              }}
            />
          ) : (
            <span>Loading...</span>
          )}
          <form action="https://bitpay.com/checkout" method="post">
            <input type="hidden" name="action" value="checkout" />
            <input type="hidden" name="posData" value="" />
            <input type="hidden" name="notificationType" value="json" />
            <input
              type="hidden"
              name="data"
              value="Ena7Y9t21MTV9aT0gMfKy3PQ5PAEZME9SCx5Zn3o72H/xnUPulhkTygr54QiM+x2ofYfSYaCiHIiyZVJmHT16batIyyZzefxImVd+Ngo14uJAA2HU0tPKk+TG2mcdd/ulXHA8G9iAGLibNhrdDjvQg=="
            />
            <input
              type="image"
              src="https://bitpay.com/cdn/en_US/bp-btn-pay-currencies.svg"
              name="submit"
              // style="width: 210px"
              alt="BitPay, the easy way to pay with bitcoins."
            />
          </form>
          <a
            href="https://www.blockonomics.co/pay-url/55194a64d94f40f3"
            className="blockoPayBtn"
            data-toggle="modal"
            data-uid="55194a64d94f40f3"
          >
            Blockonomics
            <img
              width="160"
              src="https://www.blockonomics.co/img/pay_with_bitcoin_medium.png"
            />
          </a>
        </div>
        {products.map((product, index) => {
          return <Products key={index} product={product} />;
        })}
      </div>
    </div>
  );
}
const Products = ({ product }) => {
  const [loading, setLoading] = useState(false);

  const coinbase = async () => {
    setLoading(true);
    try {
      const data = await axios.post("/api/init", { id: product.id });
      setLoading(false);
      window.open(data.data.hosted_url, "_blank");
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>{product.name}</h4>
      <p>{product.description}</p>
      <p>
        Price: {product.price} {product.currency}
      </p>
      <button onClick={coinbase} disabled={loading}>
        {" "}
        Pay With Crtpto{" "}
      </button>
    </div>
  );
};
