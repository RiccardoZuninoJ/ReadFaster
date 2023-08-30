"use client";

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { Page, Text, View, Document, StyleSheet, render, PDFViewer, PDFDownloadLink, Font, BlobProvider, pdf } from '@react-pdf/renderer';
import { Syne } from 'next/font/google';
const syne = Syne({ subsets: ['latin'] });
import CookieConsent, { Cookies, getCookieConsentValue } from "react-cookie-consent";

import Link from 'next/link';
import { initGA, logPageView } from './ga-utils';
Font.register({
  family: 'Inter',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf',
      fontWeight: 100,
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf',
      fontWeight: 200,
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf',
      fontWeight: 300,
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf',
      fontWeight: 500,
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf',
      fontWeight: 600,
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf',
      fontWeight: 700,
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf',
      fontWeight: 800,
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf',
      fontWeight: 900,
    },
  ],
});
export default function Home() {

  const acceptCookiesHandler = () => {
    if (process.env.REACT_APP_GOOGLE_ANALYTICS_ID) {
      initGA(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
    }
  }

  const declineCookieHandler = () => {
    Cookies.remove("_ga");
    Cookies.remove("_gat");
    Cookies.remove("_gid");
  }
  useEffect(() => {
    const isConsent = getCookieConsentValue();
    if (isConsent === "true") {
      acceptCookiesHandler();
    } else {
      declineCookieHandler();
    }

  }, []);

  // Log page view
  useEffect(() => {
    if (getCookieConsentValue() === "true") {
      console.log("Cookies are accepted");
      initGA(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
      logPageView();
    }
  });

  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [blob, setBlob] = useState(null);
  const [pdfResult, setPdfResult] = useState(null);
  const [pdfLink, setPdfLink] = useState(null);
  const [fontSize, setFontSize] = useState(10);
  const [rows, setRows] = useState(5);
  const textRef = useRef();
  const resultRef = useRef();

  //Generate PDF using output and ReactPDF
  async function generatePDF(e) {
    e.preventDefault();
    //Add result to PDF

    // Convert result in a way that ReactPDF can read.
    // Convert <span className='font-bold'></span> to <Text></Text>

    const document = await pdf(
      < Document >
        < Page size="A4"
        >
          <View
            style={{
              fontFamily: 'Inter',
              padding: '20px',
            }}
          >
            <Text
              style={{
                fontSize: '10px',
                textAlign: 'center',
                marginBottom: '20px',
                fontFamily: 'Inter',
                color: '#010101',
              }}
            >
              Generated using READFASTER.RICCARDOZUNINOJ.NINJA.
              Donate to remove the watermark.
            </Text>
            <View style={{
              fontSize: `${fontSize}px`,
            }}>
              {pdfResult}
              <Text
                style={{
                  fontSize: '10px',
                  textAlign: 'center',
                  marginBottom: '20px',
                  fontFamily: 'Inter',
                  color: '#010101',
                }}
              >
                Generated using RICCARDOZUNINOJ.NINJA/READFAST.
                Donate to remove the watermark.
              </Text>
            </View>
          </View>
        </Page >
      </Document >
    ).toBlob();

    window.open(URL.createObjectURL(document));

  }

  function convertText(e) {
    //Calculate the number of rows
    setRows(textRef.current.value.split('\n').length);
    e.preventDefault();
    //First 1/5 letters of each word must be made bold. the entire text is then put on result
    //Split the text into an array
    const lines = text.split('\n')
    const output = lines.map((line, index) => {
      if (line === '')
        return <br key={index}></br>;
      return (
        <p
          key={
            index
          }
        >
          {
            //Split the line into an array
            line.split(' ').map((word, index) => {

              return (
                <span
                  key={
                    word + index
                  }
                >
                  <span

                    className='font-bold'
                  >
                    {word.slice(0, Math.ceil(word.length / 3))}
                  </span>
                  <span

                    className="font-light"
                  >
                    {word.slice(Math.ceil(word.length / 3))} {" "}
                  </span>
                </span>
              )
            })
          }
        </p>
      )
    })

    const pdfOutput = lines.map((line, index) => {
      if (line === '')
        return <Text
          key={index}
        >{'\n'}</Text>;
      return (
        <Text
          key={
            index * index
          }
        >
          {
            //Split the line into an array
            line.split(' ').map((word, index) => {
              return (
                <Text
                  key={
                    word + index
                  }
                >
                  <Text
                    style={{ fontFamily: 'Inter', fontWeight: '800' }}
                  >
                    {word.slice(0, Math.ceil(word.length / 3))}
                  </Text>
                  <Text

                  >
                    {word.slice(Math.ceil(word.length / 3))} {" "}
                  </Text>
                </Text>
              )
            })
          }
        </Text >
      )
    })

    setPdfResult(pdfOutput);
    setResult(output);

  }

  return (
    <div className="min-h-screen">
      <div className='bg-purple-500 px-10 py-4 flex'>
        <svg xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <span className='font-bold text-white ml-2'>READFASTER is still under development and is released as a beta. Many bugs can occur and will be fixed.
          This project is open source, so feel free to contribute on my GitHub page.
        </span>
      </div>
      <div className="px-10">
        <h1 className='
        font-bold text-3xl text-center mx-auto mt-8
      '

        >
          <p className='font-bold text-sm'>READFASTER.RICCARDOZUNINOJ.NINJA</p>
          <span className="bg-purple-500 p-2 text-white text-sm mx-2 rounded-xl">v0.2 Beta version</span>
          <br></br>
          <p
            className={syne.className + " text-5xl mt-3 mb-4"}
          >
            Read faster, using &quot;bold&quot; techniques.<br></br>
            For free.
          </p>
        </h1>
        <hr></hr>


        <div className='mt-10'>


          <div className='mt-10 w-full lg:flex'>
            <div
              className='sm:flex-wrap lg:flex-1'
            >
              <div className="px-4 py-2 bg-white lg:rounded-l-lg dark:bg-gray-800 border border-gray-200">
                <label htmlFor="input" className="sr-only">Insert your text here...</label>
                <textarea
                  ref={textRef}
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  id="input" rows={rows} className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Insert your text here" required></textarea>
                <div className="flex items-center justify-between py-2 border-t dark:border-gray-600">
                  <button className=
                    'w-full items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800'
                    onClick={
                      (e) => convertText(e)
                    }
                  >
                    Convert your text
                  </button>
                </div>
              </div>


            </div>
            <div
              className='flex-1'
            >

              <div>
                <div className="w-full mb-4 border border-gray-200 rounded-r-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                  <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                    <div

                      style={{ fontSize: `${fontSize}px` }}
                      id="output" rows="4" className="w-full px-0 text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Output" required>

                      {result}
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                    <button onClick={
                      (e) => generatePDF(e)
                    } className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                      Export as PDF
                    </button>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Font size
                      <input type="number" className="rounded-xl ml-4" min="10" max="50" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />
                    </p>
                    <button disabled type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-900 hover:bg-gray-800">
                      Export as Markdown (disabled)
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
          {pdfLink} {blob}
        </div>
        <div
          className='mt-10'
        >
          <hr></hr>
          <h1 className='font-bold mt-4'>How does it work?</h1>
          <p>
            This tool makes the start of each word bold.
            In this way you can be able to understand the word without reading the whole word.
          </p>
          <h1 className='font-bold'>How to use it?</h1>
          <p>
            Just enter the text and click on the button (or do not, it will convert automatically 😊).
          </p>
          <h1 className='font-bold text-orange-500'>Do you think this is useful?</h1>
          <Link
            href="https://www.buymeacoffee.com/riccardozuninoj">
            <button className='
          bg-orange-500
          text-white
          font-bold
          py-2
          px-4
          rounded
          
        '

            >
              Donate (Buy me a coffee)
            </button>
          </Link>
        </div>
      </div >
      <div className='mt-20 pb-10'>
        <hr></hr>

        <h1 className='font-bold text-center mt-10'>Made with <span className='text-red-500'>♥</span> by RiccardoZuninoJ.</h1>
        <p className='text-center'>Contribute on <Link href="https://github.com/RiccardoZuninoJ/ReadFaster">GitHub</Link>
        </p>
      </div >
      <CookieConsent enableDeclineButton
        onAccept={acceptCookiesHandler}
        onDecline={declineCookieHandler}

      >
        This website uses cookies to ensure you get the best experience on our website.

      </CookieConsent>
    </div >
  )
}
