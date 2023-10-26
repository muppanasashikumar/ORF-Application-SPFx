/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-empty-function */

import { ReactElement, useState } from "react";

export function MultiStepForm(steps: ReactElement[]) {
  const [currentStepIndex, setcurrentStepIndex] = useState(0);
  // const [currentStepIndex, setcurrentStepIndex] = useState(0);
  const [currentheadingindex, setCurrentheading] = useState(0);
  const [completedsteps, setCompleted] = useState({});

  function next() {
    setcurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
    if (currentStepIndex + 1 <= 3) {
      setCurrentheading(0);
    }
    if (3 < currentStepIndex + 1 && currentStepIndex + 1 <= 5) {
      setCurrentheading(1);
    }
    if (currentStepIndex + 1 >= 6) {
      setCurrentheading(2);
    }
    if (
      currentStepIndex === 3 ||
      currentStepIndex === 5 ||
      currentStepIndex === 6
    ) {
      setCompleted({ ...completedsteps, [currentheadingindex]: true });
    }
  }
  function back() {
    setcurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
    if (currentStepIndex - 1 <= 3) {
      setCurrentheading(0);
    }
    if (3 < currentStepIndex - 1 && currentStepIndex - 1 <= 5) {
      setCurrentheading(1);
    }
    if (currentStepIndex - 1 >= 6) {
      setCurrentheading(2);
    }
  }
  function goTo(index: number) {
    setcurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    currentheadingindex,
    completedsteps,
    step: steps[currentStepIndex],
    goTo,
    next,
    back,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    steps,
    setCurrentheading,
  };
}
