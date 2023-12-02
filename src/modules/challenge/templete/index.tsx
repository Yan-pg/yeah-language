"use client";

import { useEffect, useState } from "react";

import { ReadOrListen } from "../components/ReadOrListen";
import { ProgressBar } from "../components/ProgressBar";
import { Chat } from "../models";
import { Footer, FooterVariant } from "../components/Footer";
import { SpeakChallenge } from "../components/SpeakChallange";
import { useRouter } from "next/navigation";

interface ChallengeTemplateProps {
  sentences: Chat[];
}

export enum ChallengeType {
  WRITE = "WRITE",
  LISTEN = "listen",
  SPEAK = "speak",
}

export function ChallengeTemplate({
  sentences: sentencesFromChat,
}: ChallengeTemplateProps) {
  const [sentence, setSentence] = useState<Chat>({} as Chat);
  const [selectedSentence, setSelectedSentence] = useState("");
  const [footerVariant, setFooterVariant] = useState<FooterVariant>(
    FooterVariant.NORMAL
  );
  const [shouldCleanValues, setShouldCleanValues] = useState(false);
  const [challengeType, setChallengeType] = useState<ChallengeType>(
    ChallengeType.WRITE
  );
  const [isListening, setIsListening] = useState(false);
  const [speakSentence, setSpeakSentence] = useState("");
  const [sentences, setSentences] = useState<Chat[]>(sentencesFromChat);
  const [barPercent, setBarPercent] = useState(0);

  const router = useRouter();

  function choiceSentence() {
    let choiceSentence =
      sentences?.[Math.floor(Math.random() * sentences?.length)];

    setSentence(choiceSentence);

    if (challengeType !== ChallengeType.SPEAK) {
      textToSpeech(choiceSentence.english, 0.8);
    }

    const percent =
      (100 * (sentencesFromChat.length - sentences.length)) /
      sentencesFromChat.length;

    setBarPercent(percent);
  }

  function choiceChallengeType() {
    let choiceChallengeType =
      Object.values(ChallengeType)[
        Math.floor(Math.random() * Object.values(ChallengeType).length)
      ];

    setChallengeType(choiceChallengeType);
  }

  function handleSelectedSentence(selectedSentence: string) {
    setSelectedSentence(selectedSentence);
  }

  function checkCorrectPortugueseSentence() {
    return checkCorrectSentence(selectedSentence === sentence.portuguese);
  }

  function checkSpeakSentence(speakResult: string) {
    speakResult = speakResult.toLowerCase();
    const verifySpeak = speakResult.split(" ").filter((word) => {
      return sentence.english.toLowerCase().includes(word);
    });

    const wordsCorrect = verifySpeak.length;

    const percent = (wordsCorrect * 100) / sentence.english.split(" ").length;

    setSpeakSentence(speakResult);
    checkCorrectSentence(percent >= 70);
  }

  function checkCorrectEnglishSentence() {
    return checkCorrectSentence(selectedSentence === sentence.english);
  }

  function checkCorrectSentence(isCorrect: boolean) {
    if (isCorrect) {
      setFooterVariant(FooterVariant.SUCCESS);
      setShouldCleanValues(true);
      new Audio("/success.wav").play();

      const newSentences = sentences.filter((sentenceItem) => {
        return sentenceItem.id !== sentence.id;
      });

      if (newSentences.length === 0) {
        router.push("/");
      }

      setSentences(newSentences);
    } else {
      new Audio("/error.wav").play();
      setFooterVariant(FooterVariant.ERROR);
    }
  }

  function createSynthesis(): SpeechSynthesis {
    const speechSynthesis: SpeechSynthesis =
      window.speechSynthesis || (window as any).webKitSpeechSynthesis;
    return speechSynthesis;
  }

  function getRecognition() {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    if (!recognition) {
      alert("SpeechRecognition not supported");
      return;
    }

    recognition.lang = "pt_BR";

    return recognition;
  }

  async function SpeechToText() {
    const recognition = getRecognition();

    const onSpeechResult = (event: any) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      checkSpeakSentence(transcript);
      recognition.stop();
    };

    recognition.onresult = onSpeechResult;
    recognition.onstart = (event: any) => {
      setIsListening(true);
    };
    recognition.onend = (event: any) => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (error) {
      console.log({ error });
    }
  }

  function textToSpeech(text: string, rate: number = 1) {
    const speechSynthesis = createSynthesis();
    const speechSynthesisUtterance = new SpeechSynthesisUtterance();

    const voice = speechSynthesis
      .getVoices()
      .find((voice) => voice.name === "Nicky");

    speechSynthesisUtterance.text = text;
    speechSynthesisUtterance.lang = "en-US";
    speechSynthesisUtterance.rate = rate;
    speechSynthesisUtterance.voice = voice ?? null;

    speechSynthesis.speak(speechSynthesisUtterance);
  }

  function handleNextSentence() {
    choiceSentence();
    choiceChallengeType();
    setShouldCleanValues(false);
    setSpeakSentence("");
    setFooterVariant(FooterVariant.NORMAL);
  }

  useEffect(() => {
    window.speechSynthesis;
    choiceSentence();
    choiceChallengeType();
  }, []);

  return (
    <div className="min-h-full w-full mx-auto mt-10 h-screen">
      <div className="max-w-5xl flex-1 mx-auto w-full">
        <ProgressBar progress={barPercent} />
      </div>

      <div className="max-w-5xl mx-auto mt-36">
        <div
          className={`${challengeType !== ChallengeType.SPEAK ? "hidden" : ""}`}
        >
          <SpeakChallenge
            isListening={isListening}
            speakSentence={speakSentence}
            sentence={sentence.english}
            recognizeSpeech={SpeechToText}
          />
        </div>

        <div
          className={`${challengeType === ChallengeType.SPEAK ? "hidden" : ""}`}
        >
          <ReadOrListen
            chat={sentence}
            shouldCleanValues={shouldCleanValues}
            challengeType={challengeType}
            selectedSentence={handleSelectedSentence}
            speak={textToSpeech}
          />
        </div>
      </div>

      <Footer variant={footerVariant}>
        {footerVariant === FooterVariant.NORMAL && (
          <Footer.Normal
            checkCorrectSentence={() => {
              if (
                challengeType === ChallengeType.LISTEN ||
                challengeType === ChallengeType.SPEAK
              ) {
                checkCorrectEnglishSentence();
                return;
              }

              checkCorrectPortugueseSentence();
            }}
          />
        )}
        {footerVariant === FooterVariant.SUCCESS && (
          <Footer.Success handleNextSentence={handleNextSentence} />
        )}
        {footerVariant === FooterVariant.ERROR && (
          <Footer.Error
            correctSolution={
              challengeType === ChallengeType.LISTEN ||
              challengeType === ChallengeType.SPEAK
                ? sentence.english
                : sentence.portuguese
            }
            handleNextSentence={handleNextSentence}
          />
        )}
      </Footer>
    </div>
  );
}
