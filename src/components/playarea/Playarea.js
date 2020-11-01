import React, { useState, useEffect } from "react";
import "./PlayArea.scss";
import questions from "../../questions.json";
import scoreRange from "../../scoreRange.json";

import Card from "./card/Card.js";

const PlayArea = (props) => {
  const [cardQuestion, setCardQuestion] = useState({});
  const [allQuestions, setAllQuestions] = useState(questions);
  const [answers, setAnswers] = useState([]);
  const [count, setCount] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [fireworks, setFireworks] = useState(false);

  const sortAnswers = async (question) => {
    return [...question.incorrect, question.correct].sort(
      () => Math.random() - 0.5
    );
  };

  const getQuestion = async () => {
    await allQuestions.sort(() => Math.random() - 0.5);
    const answersSort = await sortAnswers(allQuestions[0]);
    setAnswers(answersSort);
    setCardQuestion(allQuestions[0]);
    allQuestions.shift();
    setFireworks(false);
  };

  const handleFireworks = () => {
    setFireworks(true);
  };

  const flipGame = () => {
    setGameOver(!gameOver);
  };

  const newGame = () => {
    setAllQuestions(questions);
    flipGame();
    props.setScore(0);
    setCount(1);
    getQuestion();
  };

  const handleSubmit = (answer) => {
    // if (answer === cardQuestion.correct) {
    //   props.handleScore();
    // }
    if (count === 10) {
      setCount(count + 1);
      flipGame();
    } else if (count < 10) {
      getQuestion();
      setCount(count + 1);
    }
  };

  useEffect(() => {
    getQuestion();
  }, [gameOver]);

  const cardHtml = (
    <Card
      qst={cardQuestion && cardQuestion.question}
      cor={cardQuestion && cardQuestion.correct}
      inc={cardQuestion && cardQuestion.incorrect}
      answers={answers}
      handleScore={props.handleScore}
      handleSubmit={handleSubmit}
      handleFireworks={handleFireworks}
    />
  );

  const gameOverHtml = (
    <div className="game-over">
      <div>Game over! You scored {props.score} points!</div>
      <div>{scoreRange[props.score]}</div>
      <div className="button new-game" onClick={newGame}>
        new game?
      </div>
    </div>
  );

  const questionNumberHtml = (
    <div className="button question-number">Question #{count}</div>
  );

  const fireWorkHtml = (
    <div className="pyro">
      <div className="before"></div>
      <div className="after"></div>
    </div>
  );

  const scoreHtml = (
    <div className="button score">
      {fireworks && fireWorkHtml}
      {props.score} / 10
    </div>
  );

  return (
    <div className="play-area-container">
      <div className="stat-container">
        {count < 11 && questionNumberHtml}
        {count < 11 && scoreHtml}
      </div>
      {cardQuestion && count < 11 && !gameOver && cardHtml}
      {count > 10 && gameOverHtml}
    </div>
  );
};

export default PlayArea;
