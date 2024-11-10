import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import {factorial} from "mathjs";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const nthDerivative = (e, answer) => {
    const a = e.target.a
    const b = e.target.b;
    const n = e.target.n;

    if(a >= 1) {
        answer = (b*factorial(a))/factorial(a-n);
    }
    else if(a < 0) {

    }
}

export default function Home() {
    const answer = 0;
  return (
    <>
      <Head>
        <title>nth Derivative</title>
        <meta name="nth Derivative Calculator" content="nth Derivative Calculator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>
          <div className={styles.title}>
            <h1>nth Derivative</h1>
          </div>
            <div className={styles.description}>
                <h2> Parent Function: f(x)=bx<sup>a</sup></h2>
                <br/><br/>
                <h2> Positive nth Derivative Function: f<sup>(n)</sup>(x)=
                    <div className={styles.frac}>
                        <span>b*a!</span>
                        <span className={styles.symbol}>/</span>
                        <span className={styles.bottom}>(a-n)!</span>

                    </div>x<sup>a-n</sup></h2>
                <h2> Negative nth Derivative Function: f<sup>(n)</sup>(x)=
                    <div className={styles.frac}>
                        <span>b*((|a|-1)+n)!</span>
                        <span className={styles.symbol}>/</span>
                        <span className={styles.bottom}>(|a|-1)!</span>

                    </div>x<sup>a-n</sup></h2>
            </div>
            <div className={styles.function}>
                <form onChange={(e) => nthDerivative(e, answer)}>
                    <label htmlFor="geist-sans">Enter a: </label>
                    <input type={"number"} inputMode={"numeric"} id={"a"}></input>
                    <br/>
                    <label htmlFor="geist-mono">Enter b: </label>
                    <input type={"number"} inputMode={"numeric"} id={"b"}></input>
                    <br/>
                    <label htmlFor="geist-mono">Enter n: </label>
                    <input type={"number"} inputMode={"numeric"} id={"n"}></input>
                </form>
            </div>
            <div className={styles.answer}>
                <h3> Answer: {answer}</h3>
            </div>
        </main>
      </div>
    </>
  );
}
