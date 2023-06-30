import { generate } from "random-words";
import React, { useState, useRef, useEffect, useMemo, createRef } from "react";
import UpperMenu from "./UpperMenu";
import { useTestMode } from "../Context/TestModeContext";
import Stats from "./Stats";

const TypingBox = () => {
  const inputRef = useRef(null); /* reference to input tag */
  const { testTime } = useTestMode(); // getting the access to value object inside context
  const [countDown, setCountDown] = useState(testTime); // state for couter
  const [testStart, setTestStart] = useState(false); // for checking test started or nor
  const [testEnd, setTestEnd] = useState(false); // for checking test started or nor
  const [intervalId, setIntervalId] = useState(null); // to set the intervals in timer

  const [correctChars, setCorrectChars] = useState(0); // counting correct chars
  const [incorrectChars, setIncorrectChars] = useState(0); // counting incorrect chars
  const [missedChars, setMissedChars] = useState(0); // counting missed chars
  const [extraChars, setExtraChars] = useState(0); // counting extra chars
  const [correctWords, setCorrectWords] = useState(0); // countiong correct words
  const [graphData, setGraphData] = useState([]);

  /* to generate random words from module */
  const [wordsArray, setWordsArray] = useState(() => {
    return generate({ exactly: 80 });
  });

  /*for getting ref of user input*/
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);

  /*ref for each single word in words array*/
  const wordsSpanRef = useMemo(() => {
    return Array(wordsArray.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [wordsArray]);

  /* start timer and setting graph data */
  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);
    setIntervalId(intervalId);
    function timer() {
      setCountDown((latestCountDown) => {
        setCorrectChars((correctChars) => {
          setGraphData((graphData) => {
            /* return graph data array, [calc in time, wpm]  */
            return [
              ...graphData,
              [
                testTime - latestCountDown + 1,
                correctChars / 5 / ((testTime - latestCountDown + 1) / 60),
              ],
            ];
          });
          return correctChars;
        });

        // to stop the counter at 1
        if (latestCountDown === 1) {
          setTestEnd(true);
          clearInterval(intervalId);
          return 0;
        }
        return latestCountDown - 1;
      });
    }
  };

  /* resetting the test on click of time */
  const resetTest = () => {
    clearInterval(intervalId);
    setTestStart(false);
    setCountDown(testTime);
    setCurrWordIndex(0);
    setCurrCharIndex(0);
    setTestEnd(false);
    setWordsArray(generate({ exactly: 80 }));
    resetWordSpanRefClassName();
    focusInput();
  };

  /* resetting all the classess on click of time */
  const resetWordSpanRefClassName = () => {
    wordsSpanRef.map((i) => {
      Array.from(i.current.childNodes).map((j) => {
        j.className = "";
      });
    });

    wordsSpanRef[0].current.childNodes[0].classList = "active";
  };

  /*handles when user types on keyboard */
  const handleUserInput = (e) => {
    if (!testStart) {
      startTimer();
      setTestStart(true);
    }
    console.log(e);
    const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;
    // console.log(allCurrChars[0].innerText)

    // handle space logic
    if (e.keyCode === 32) {
      /*checking for if user typed whole word correctly*/
      let correctCharsInWord =
        wordsSpanRef[currWordIndex].current.querySelectorAll(".correct");
      if (correctCharsInWord.length === allCurrChars.length) {
        setCorrectWords(correctWords + 1);
      }
      // remove cursor from last character of word
      if (allCurrChars.length <= currCharIndex) {
        allCurrChars[currCharIndex - 1].classList.remove("active-right");
      } else {
        // remove cursor from in between of word
        // counting missed characters
        setMissedChars(missedChars + (allCurrChars.length + currCharIndex));
        allCurrChars[currCharIndex].classList.remove("active");
      }

      // after removing extra blikings adding blinker to correct chars
      wordsSpanRef[currWordIndex + 1].current.childNodes[0].className =
        "active";
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(0);
      return;
    }

    // Handle backspace logic
    if (e.keyCode === 8) {
      // avoiding to user not to go back for prev word
      // only current word is allowed
      if (currCharIndex !== 0) {
        // for the last index of word --> backspace
        if (allCurrChars.length === currCharIndex) {
          // for the extra word removal -->  backspace
          if (allCurrChars[currCharIndex - 1].className.includes("extra")) {
            allCurrChars[currCharIndex - 1].remove();
            allCurrChars[currCharIndex - 2].className += " active-right";
          } else {
            allCurrChars[currCharIndex - 1].className = "active";
          }

          setCurrCharIndex(currCharIndex - 1);
          return;
        }
        allCurrChars[currCharIndex].className = ""; // removing all classes
        allCurrChars[currCharIndex - 1].className = "active"; // blinking
        setCurrCharIndex(currCharIndex - 1); //going back
      }
      return;
    }

    // handling extra typing of user
    if (currCharIndex === allCurrChars.length) {
      let newSpan = document.createElement("span");
      newSpan.innerText = e.key;
      newSpan.className = "incorrect extra active-right";
      allCurrChars[currCharIndex - 1].classList.remove("active-right");
      wordsSpanRef[currWordIndex].current.append(newSpan);
      setCurrCharIndex(currCharIndex + 1);
      // increase extra character by 1
      setExtraChars(extraChars + 1);
      return;
    }

    /*user typed correct or not*/
    if (e.key === allCurrChars[currCharIndex].innerText) {
      // console.log("correct")
      allCurrChars[currCharIndex].className = "correct";
      // increase correct character by 1
      setCorrectChars(correctChars + 1);
    } else {
      // console.log("incorrect")
      allCurrChars[currCharIndex].className = "incorrect";
      // increase incorrect character by 1
      setIncorrectChars(incorrectChars + 1);
    }

    // handling blinking of cursor
    if (currCharIndex + 1 === allCurrChars.length) {
      allCurrChars[currCharIndex].className += " active-right";
    } else {
      allCurrChars[currCharIndex + 1].className = "active";
    }

    setCurrCharIndex(currCharIndex + 1);
  };

  /* focus the input field when reloads */
  const focusInput = () => {
    inputRef.current.focus();
  };

  /* calculating wpm  */
  const calculateWPM = () => {
    return Math.round(correctChars / 5 / (testTime / 60));
  };

  /* calculating accuracy */
  const calculateAcc = () => {
    return Math.round((correctWords / currWordIndex) * 100);
  };

  /*when the values of value object clicked this will run*/
  useEffect(() => {
    resetTest(); // calling this func on time click
  }, [testTime]);

  /*when site loads input field should be focused*/
  useEffect(() => {
    focusInput();
    wordsSpanRef[0].current.childNodes[0].className =
      "active"; /*for blinking purpose when site reloads*/
  }, []);

  return (
    <div>
      <UpperMenu countDown={countDown} />
      {testEnd ? (
        <Stats
          wpm={calculateWPM()}
          accuracy={calculateAcc()}
          correctChars={correctChars}
          incorrectChars={incorrectChars}
          missedChars={missedChars}
          extraChars={extraChars}
          graphData={graphData}
        />
      ) : (
        /* we are creating single sinle spans for single single characters
        in single word each character should be pushed into new span
        */
        <div className="type-box" onClick={focusInput}>
          <div className="words">
            {wordsArray.map((word, index) => (
              <span className="word" key={index} ref={wordsSpanRef[index]}>
                {word.split("").map((char, index) => (
                  <span key={index}>{char}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* taking input from user  */}
      <input
        type="text"
        className="hidden-input" /* for hiding and aligning */
        ref={inputRef}
        onKeyDown={handleUserInput}
      />
    </div>
  );
};

export default TypingBox;
