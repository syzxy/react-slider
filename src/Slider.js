import React, { useEffect, useState } from "react";
import cards from "./data";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px 0"
  },
  slider: {
    height: "400px",
    perspective: "2000px",
    transformStyle: "preserve-3d",
    position: "relative"
  },
  card: {
    cursor: "pointer",
    opacity: 0,
    position: "absolute",
    width: "70%",
    height: "100%",
    right: 0,
    left: 0,
    margin: "0 auto",
    borderRadius: "10px",
    overflow: "hidden",
    transition: "all 0.5s ease-in-out",
    "&$active": {
      opacity: 1,
      boxShadow: "0 0px 30px 5px rgba(0,0,0,0.3)",
      transform: "translate3d(0,0,0)"
    },
    "&$p2": {
      opacity: 1,
      boxShadow: "0 1px 4px 0 rgba(0,0,0,.37)",
      transform: "translate3d(-30%,0,-300px)"
    },
    "&$p1": {
      opacity: 1,
      boxShadow: "0 6px 10px 0 rgba(0,0,0,.3), 0 2px 2px 0 rgba(0,0,0,.2)",
      transform: "translate3d(-18%,0,-200px)"
    },
    "&$n1": {
      opacity: 1,
      boxShadow: "0 6px 10px 0 rgba(0,0,0,.3), 0 2px 2px 0 rgba(0,0,0,.2)",
      transform: "translate3d(18%,0,-200px)"
    },
    "&$n2": {
      opacity: 1,
      boxShadow: "0 1px 4px 0 rgba(0,0,0,.37)",
      transform: "translate3d(30%,0,-300px)"
    }
  },
  active: {},
  p1: {},
  p2: {},
  n1: {},
  n2: {},
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    userSelect: "none",
    pointerEvents: "none"
  },
  label: {
    display: "flex",
    fontSize: "1.2rem",
    alignItems: "center",
    gap: "8px",
    marginTop: "2rem"
  }
}));

export default function Slider() {
  const classes = useStyles();
  const [current, setCurrent] = useState(0);
  const [p1, setP1] = useState();
  const [p2, setP2] = useState();
  const [n1, setN1] = useState();
  const [n2, setN2] = useState();

  // Auto play
  const [autoPlay, setAutoPlay] = useState(false);
  useEffect(() => {
    let timer;
    if (autoPlay) {
      setCurrent((c) => getNext(c));
      timer = setInterval(() => setCurrent((c) => getNext(c)), 1000);
    }
    return () => clearInterval(timer);
  }, [autoPlay]);

  // Update current slide
  useEffect(() => {
    const prev = getPrev(current);
    const next = getNext(current);
    setP1(prev);
    setP2(getPrev(prev));
    setN1(next);
    setN2(getNext(next));
  }, [current]);

  const getNext = (index) => (index + 1) % cards.length;
  const getPrev = (index) => (index - 1 + cards.length) % cards.length;
  const indexToClassName = (index) => {
    if (index === current) return clsx(classes.card, classes.active);
    if (index === p1) return clsx(classes.card, classes.p1);
    if (index === p2) return clsx(classes.card, classes.p2);
    if (index === n1) return clsx(classes.card, classes.n1);
    if (index === n2) return clsx(classes.card, classes.n2);
    return classes.card;
  };
  // console.log(p2, p1, current, n1, n2);

  return (
    <div className={classes.root}>
      <div className={classes.slider}>
        {cards.map((card, i) => (
          <div
            key={card.id}
            className={indexToClassName(i)}
            onClick={() => setCurrent(i)}
            onWheel={() => setCurrent(getNext(i))}
          >
            <img className={classes.image} src={card.src} alt="" />
          </div>
        ))}
      </div>
      <label className={classes.label}>
        Auto play
        <input
          type="checkbox"
          value={autoPlay}
          onChange={() => setAutoPlay((v) => !v)}
        />
      </label>
    </div>
  );
}
