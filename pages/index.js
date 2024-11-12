import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import {abs, factorial, forEach, isInteger, isNegative} from "mathjs";
import {useEffect, useState} from "react";

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

    let a = document.getElementById("a").value;
    let b = document.getElementById("b").value;
    let n = document.getElementById("n").value;

    const exponent = a-n;
    if (!isInteger(Number(a))) {
        let d = b;
        for (let i = 0; i < abs(n); i++) {
            let c = a-i;
            d = d*c;
        }
        answer = d;
    }
    else if (Number(a) >= 0) {
        if(Number(n) > Number(a)){
            answer = null;
        }
        else {
            answer = (b * factorial(Number(a))) / factorial(Number(a) - Number(n));
        }
    }
    else if (a < 0) {
        let top = (abs(a)-1+Number(n));
        let bottom = (abs(a)-1);
        if (top < 0) {
            top = 0;
        }
        else if (bottom < 0) {
            bottom = 0;
        }
        else{
            answer = ((a/(abs(a)))**Number(n)) * (b * (factorial(top)/factorial(bottom)));
        }
    }
    document.getElementById("answer").innerHTML = "Answer: " + answer + "x<sup>" + exponent + "</sup>";
}

export default function Derivative() {

    const answer = 0;

    const [aSize, setASize] = useState(1.4);
    const [bSize, setBSize] = useState(1.4);
    const [nSize, setNSize] = useState(1.4);
    const resizeA= ()=> {
        let a = document.getElementById("a").value;
        setASize(a.length + 0.3);
    }
    const resizeB= () => {
        let b = document.getElementById("b").value;
        setBSize(b.length + 0.3);
    }
    const resizeN= () => {
        let n = document.getElementById("n").value;
        setNSize(n.length + 0.3);
    }

  return (
    <>
      <Head>
        <title>nth Derivative</title>
        <meta name="nth Derivative Calculator" content="nth Derivative Calculator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/nthDerivative.svg" />
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
                    (<div className={styles.frac}>
                        <span>a</span>
                        <span className={styles.symbol}>/</span>
                        <span className={styles.bottom}>|a|</span>

                    </div>)<sup>n</sup>
                    <div className={styles.frac}>
                        <span>b*((|a|-1)+n)!</span>
                        <span className={styles.symbol}>/</span>
                        <span className={styles.bottom}>(|a|-1)!</span>

                    </div>
                    x<sup>a-n</sup></h2>
            </div>
            <div className={styles.function}>
                <form onChange={(e) => nthDerivative(e, answer)}>
                    <label htmlFor="geist-sans">f
                        <sup>
                            (<input type={"number"} style={{"width": nSize + "ch"}} placeholder={"n"} inputMode={"numeric"} id={"n"} name={"n"} onChange={()=>resizeN()}></input>)
                        </sup> (x) = <input type={"number"} style={{"width": bSize + "ch"}} placeholder={"b"} inputMode={"numeric"} id={"b"} name={"b"} onChange={()=>resizeB()}></input>x<sup>
                            <input type={"number"} style={{"width": aSize + "ch"}} placeholder={"a"} inputMode={"numeric"} id={"a"} name={"a"} onChange={()=>resizeA()}></input>
                    </sup></label>


                    <div className={styles.answer}>
                        <h3 id={"answer"}>Answer: 0 </h3>
                    </div>
                </form>
            </div>

        </main>
      </div>
    </>
  );
}
