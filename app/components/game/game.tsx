import { SystemNumbersType } from "@/types";

import { FormEvent, useEffect, useState } from "react";

import Input from "./input";

import { ArrowRight } from "lucide-react";

import { compareNumbers, generateNumber } from "@/app/utils/generateNumbers";

interface GameProps {
  from: SystemNumbersType;
  to: SystemNumbersType;
}

const Game = ({ from, to }: GameProps) => {
  const [generatedNumber, setGeneratedNumber] = useState("");
  const [inputNumber, setInputNumber] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    setGeneratedNumber(generateNumber(from));
    setScore(0);
  }, [from]);

  useEffect(() => {
    if (score === 3) {
      alert("You won!");
      setInputNumber("");
      setScore(0);
    }
  }, [score]);

  const checkNumber = (e: FormEvent) => {
    e.preventDefault();

    if (!inputNumber) return;

    if (compareNumbers(generatedNumber, inputNumber, from, to)) {
      setScore((prev) => prev + 1);
      setGeneratedNumber(generateNumber(from));
      setInputNumber("");
    }
  };

  return (
    <div>
      <form
        className="flex flex-col lg:flex-row items-center gap-1 lg:gap-4 mt-5"
        onSubmit={checkNumber}
      >
        <Input
          id="generated-number"
          value={generatedNumber}
          type={from}
          disabled
        />
        <ArrowRight className="text-primary dark:text-primary-dark mt-5 rotate-90 lg:-rotate-0" />
        <Input
          id="input-number"
          type={to}
          submitabble
          value={inputNumber}
          onChange={({ target }) => setInputNumber(target.value)}
        />
      </form>
      <p className="font-medium text-center text-primary dark:text-primary-dark mt-5 lg:mt-10">
        your score {score}/3
      </p>
    </div>
  );
};

export default Game;
