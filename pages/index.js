import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import {abs, concat, evaluate, factorial, forEach, fraction, isInteger, isNegative} from "mathjs";
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

const gcd = (a, b) => {
        if (b === 0) {
            return a;
        }
        return gcd(b, a % b);
    }

const reduceFraction = (n, d) => {
    let greatestCommonFactor = gcd(n, d);
    n /= greatestCommonFactor;
    d /= greatestCommonFactor;
    return [n, d];
}

const decToFrac = (x) => {
    let a = '';
    let normalNumber = '';
    let numerator = '';
    let isAfterDecimal = false;

    let decimalPlace = 1;
    x.toString().split("").forEach((char) => {
        if(char === ".") {
            isAfterDecimal = true;
        }
        if(isInteger(Number(char)) && isAfterDecimal === false) {
            normalNumber += char;
        } else if(isAfterDecimal && isInteger(Number(char))) {
            numerator += char;
            decimalPlace *= 10;
        }
    })

    if(isAfterDecimal) {
        numerator = ((Number(numerator) + (Number(normalNumber) * Number(decimalPlace)))).toString();
        let reducedFraction = reduceFraction(Number(numerator), Number(decimalPlace));
        a+= "<math> <mfrac> <mn>" + reducedFraction[0] + "</mn> <mn>" + (reducedFraction[1]) + "</mn> </mfrac></math>"
    } else {
        a=normalNumber;
    }
    return a;
}

const multiplyX = (b, x, a) => {
        let answer = x**a;
        answer *= b;
        return answer;
}


export default function Derivative() {

    const [answer, setAnswer] = useState({ans: "", exp: "", var: "x",})

    let isChecked = false;

    const [aSize, setASize] = useState(1.4);
    const [bSize, setBSize] = useState(1.4);
    const [nSize, setNSize] = useState(1.4);
    const [xSize, setXSize] = useState(1.4);

    const [fn, setFn] = useState([{a: null, b: null, n: null, key: 0}])

    const [x, setX] = useState("")

    const nthDerivative = (e) => {

        fn.a = document.getElementById("a").value;
        fn.b = document.getElementById("b").value;
        fn.n = document.getElementById("n").value;
        setX(document.getElementById("x").value);

        answer.exp = fn.a - fn.n;
        answer.var = "x";
        if (!isInteger(Number(fn.a))) {
            let d = fn.b;
            if (fn.n > 0) {
                for (let i = 0; i < fn.n; i++) {
                    let c = fn.a - i;
                    d = d * c;
                }
            } else if (fn.n <= 0) {
                for (let i = 0; i < abs(fn.n); i++) {
                    let c = Number(fn.a) + Number(i) + 1;
                    d = d / c;
                }
            }
            answer.ans = d;

            // Later feature

            // if (isChecked === true) {
            //     setAnswer(decToFrac(answer));
            // }

        } else if (Number(fn.a) >= 0) {
            if (Number(fn.n) > Number(a)) {
                answer.ans = 0;
            } else {
                answer.ans = (fn.b * factorial(Number(fn.a))) / factorial(Number(fn.a) - Number(fn.n));
            }
        } else if (fn.a < 0) {
            let top = (abs(fn.a) - 1 + Number(fn.n));
            let bottom = (abs(fn.a) - 1);
            if (top < 0) {
                top = 0;
            } else if (bottom < 0) {
                bottom = 0;
            } else {
                answer.ans = ((fn.a / (abs(fn.a))) ** Number(fn.n)) * (fn.b * (factorial(top) / factorial(bottom)));
            }
        }
        if(x.toString() !== "") {
            answer.ans = multiplyX(answer.ans, x, answer.exp);
            answer.var = "";
            answer.ans.toString();
        }


    }


    const resizeA = () => {
        let a = document.getElementById("a").value;
        setASize(a.length + 0.4);
        if (a === "") {
            setASize(1.4);
        }
        if (window.innerHeight < 1240) {
            setASize(a.length + 0.5);
            if (a === "") {
                setASize(1.7);
            }
        }
    }
    const resizeB = () => {
        let b = document.getElementById("b").value;
        setBSize(b.length + 0.4);
        if (b === "") {
            setBSize(1.4);
        }
        if (window.innerHeight < 1240) {
            setBSize(b.length + 0.5);
            if (b === "") {
                setBSize(1.7);
            }
        }
    }
    const resizeN = () => {
        let n = document.getElementById("n").value;
        setNSize(n.length + 0.4);
        if (n === "") {
            setNSize(1.4);
        }
        if (window.innerHeight < 1240) {
            setNSize(n.length + 0.5);
            if (n === "") {
                setNSize(1.7);
            }
        }
    }
    const resizeX = () => {
        let x = document.getElementById("x").value;
        setXSize(x.length + 0.4);
        if (x === "") {
            setXSize(1.4);
        }
        if (window.innerHeight < 1240) {
            setXSize(x.length + 0.5);
            if (x === "") {
                setXSize(1.7);
            }
        }
    }

    return (
        <>
            <Head>
                <title>nth Derivative</title>
                <meta name="nth Derivative Calculator" content="nth Derivative Calculator"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/nthDerivative.svg"/>
            </Head>
            <div
                className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
            >
                <main className={styles.main}>
                    <div className={styles.title}>
                        <h1>nth Derivative</h1>
                    </div>
                    <div className={styles.description}>
                        <h2> Parent Function: </h2>
                        <math>
                            <mstyle className={styles.notation}>
                                <mi>f</mi>
                                <mo>(</mo>
                                <mi>x</mi>
                                <mo>)</mo>
                                <mo>=</mo>
                                <mi>b</mi>
                                <msup>
                                    <mi>x</mi>
                                    <mi>a</mi>
                                </msup>
                            </mstyle>
                        </math>
                        <br/><br/>
                        <h2> Positive and Fractional nth Derivative Function: </h2>
                        <math>
                            <mstyle className={styles.notation}>
                                <mi>f</mi>
                                <msup>
                                    <mrow>
                                        <mo>(</mo>
                                        <mi>x</mi>
                                        <mo>)</mo>
                                    </mrow>
                                    <mi>n</mi>
                                </msup>
                                <mo>=</mo>
                                <mfrac>
                                    <mrow>
                                        <mo>(</mo>
                                        <mi>b</mi>
                                        <mo>*</mo>
                                        <mi>a</mi>
                                        <mo>!</mo>
                                        <mo>)</mo>
                                    </mrow>
                                    <mrow>
                                        <mo>(</mo>
                                        <mi>a</mi>
                                        <mo>-</mo>
                                        <mi>n</mi>
                                        <mo>)</mo>
                                        <mo>!</mo>
                                    </mrow>
                                </mfrac>

                            </mstyle>
                        </math>
                        <h2> Negative nth Derivative Function:</h2>
                        <math>
                            <mstyle className={styles.notation}>
                                <mi>f</mi>
                                <msup>
                                    <mrow>
                                        <mo>(</mo>
                                        <mi>x</mi>
                                        <mo>)</mo>
                                    </mrow>
                                </msup>
                                <mo>=</mo>
                                <msup>
                                    <mrow>
                                        <mo>(</mo>
                                        <mfrac>
                                            <mi>a</mi>
                                            <mrow>
                                                <mo>|</mo>
                                                <mi>a</mi>
                                                <mo>|</mo>
                                            </mrow>
                                        </mfrac>
                                        <mo>)</mo>
                                    </mrow>
                                    <mi>n</mi>
                                </msup>
                                <mo>*</mo>
                                <mo>(</mo>
                                <mfrac>
                                    <mrow>
                                        <mo>(</mo>
                                        <mi>b</mi>
                                        <mo>(</mo>
                                        <mo>(</mo>
                                        <mo>|</mo>
                                        <mi>a</mi>
                                        <mo>|</mo>
                                        <mo>-</mo>
                                        <mn>1</mn>
                                        <mo>+</mo>
                                        <mi>n</mi>
                                        <mo>)</mo>
                                        <mo>!</mo>
                                        <mo>)</mo>
                                        <mo>)</mo>
                                    </mrow>
                                    <mrow>
                                        <mo>(</mo>
                                        <mo>|</mo>
                                        <mi>a</mi>
                                        <mo>|</mo>
                                        <mo>-</mo>
                                        <mn>1</mn>
                                        <mo>)</mo>
                                        <mo>!</mo>
                                    </mrow>
                                </mfrac>
                                <mo>)</mo>
                            </mstyle>
                        </math>
                    </div>
                    <div className={styles.function}>
                        <form onChange={nthDerivative}>
                            {/*Later Feature*/}
                            {/*<div className={styles.checkbox}>*/}
                            {/*    <label style={{"fontSize": "1vb"}}>Fractional Answers: </label><input type={"checkbox"} onClick={() => (isChecked = !isChecked)}></input>*/}
                            {/*</div>*/}
                                <label htmlFor="geist-sans">
                                    <math>
                                        <mi>f</mi>
                                    </math>
                                    <sup>
                                        <math>
                                            <mo>(</mo>
                                        </math>
                                        <input type={"number"} style={{"width": nSize + "ch"}} placeholder={"n"}
                                                inputMode={"numeric"} id={"n"} name={"n"}
                                                onChange={() => resizeN()}></input>
                                        <math>
                                            <mo>)</mo>
                                        </math>
                                    </sup>
                                    <math>
                                        <mo>(</mo>
                                    </math><input type={"number"} style={{"width": xSize + "ch"}} id={"x"}
                                                   placeholder={"x"} onChange={resizeX}></input>
                                    <math>
                                        <mo>)</mo>
                                        <mo>=</mo>
                                    </math>
                                    <input
                                        type={"number"}
                                        style={{"width": bSize + "ch"}}
                                        placeholder={"b"}
                                        inputMode={"numeric"} id={"b"}
                                        name={"b"}
                                        onChange={() => resizeB()}></input><math><mi>x</mi></math><sup>
                                        <input type={"number"} style={{"width": aSize + "ch"}} placeholder={"a"}
                                               inputMode={"numeric"} id={"a"} name={"a"}
                                               onChange={() => resizeA()}></input>
                                    </sup>
                                <div id={"addedTerms"}>

                                </div></label>
                            <div className={styles.answer}>
                                <h3 id={"answer"}>Answer: {answer.ans} {answer.var} <sup> {answer.exp} </sup> </h3>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}