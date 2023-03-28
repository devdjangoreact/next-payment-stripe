import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { checkout } from "../../checkout";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Physical NFTs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Buy my physical NFTs</h1>
        <div className={styles.grid}>
          <div>
            <Image src="/images/book.png" alt="NFT" width={400} height={400} />
            <p>Very expensive art piece 1</p>
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
              BUY!
            </button>
          </div>
          <div>
            <Image
              src="/images/the-book.png"
              alt="NFT"
              width={400}
              height={400}
            />
            <p>Very expensive art piece 2</p>
          </div>
        </div>
      </main>
    </div>
  );
}
