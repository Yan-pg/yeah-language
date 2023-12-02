"use client";

import { useEffect, useState } from "react";

import { ReadAndWrite, RadomWords } from "../components/ChallengeSentence";
import { ProgressBar } from "../components/ProgressBar";
import { Chat } from "../models";
import { Footer, FooterVariant } from "../components/Footer";

interface ChallengeTemplateProps {
  sentences: Chat[];
}

export function ChallengeTemplate({ sentences }: ChallengeTemplateProps) {
  const [sentence, setSentence] = useState<Chat>({} as Chat);
  const [selectedSentence, setSelectedSentence] = useState("");
  const [footerVariant, setFooterVariant] = useState<FooterVariant>(
    FooterVariant.NORMAL
  );
  const [shouldCleanValues, setShouldCleanValues] = useState(false);

  function choiceSentence() {
    let choiceSentence =
      sentences?.[Math.floor(Math.random() * sentences?.length)];

    setSentence(choiceSentence);
  }

  function handleSelectedSentence(selectedSentence: string) {
    setSelectedSentence(selectedSentence);
  }

  function checkCorrectSentence() {
    if (selectedSentence === sentence.portuguese) {
      setFooterVariant(FooterVariant.SUCCESS);
      setShouldCleanValues(true);
      new Audio("/success.wav").play();
    } else {
      new Audio("/error.wav").play();
      setFooterVariant(FooterVariant.ERROR);
    }
  }

  function speak(text: string) {
    const voice = window.speechSynthesis
      .getVoices()
      .find((voice) => voice.name === "Nicky");

    const speechSynthesisUtterance = new SpeechSynthesisUtterance();
    speechSynthesisUtterance.text = text;
    speechSynthesisUtterance.lang = "en-US";
    speechSynthesisUtterance.rate = 1;
    speechSynthesisUtterance.voice = voice ?? null;
    window.speechSynthesis.speak(speechSynthesisUtterance);
  }

  function handleNextSentence() {
    choiceSentence();
    setFooterVariant(FooterVariant.NORMAL);
    setShouldCleanValues(false);
  }

  useEffect(() => {
    choiceSentence();
    window.speechSynthesis;
  }, []);

  return (
    <div className="min-h-full w-full mx-auto mt-10 h-screen">
      <div className="max-w-5xl flex-1 mx-auto w-full">
        <ProgressBar progress={50} />
      </div>

      <div className="max-w-5xl mx-auto mt-36">
        <ReadAndWrite
          chat={sentence}
          shouldCleanValues={shouldCleanValues}
          selectedSentence={handleSelectedSentence}
          speak={speak}
        />
      </div>

      <Footer variant={footerVariant}>
        {footerVariant === FooterVariant.NORMAL && (
          <Footer.Normal checkCorrectSentence={checkCorrectSentence} />
        )}
        {footerVariant === FooterVariant.SUCCESS && (
          <Footer.Success handleNextSentence={handleNextSentence} />
        )}
        {footerVariant === FooterVariant.ERROR && (
          <Footer.Error correctSolution={sentence.portuguese} />
        )}
      </Footer>
    </div>
  );
}
