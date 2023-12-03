"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { ReadOrListen } from "../components/ReadOrListen";
import { ProgressBar } from "../components/ProgressBar";
import { Chat } from "../models";
import { Footer, FooterVariant } from "../components/Footer";
import { SpeakChallenge } from "../components/SpeakChallange";
import { useRouter } from "next/navigation";
import { X } from "@phosphor-icons/react/dist/ssr";
import { Button, Modal } from "@/modules/share";

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
  const [errorsSentences, setErrorsSentences] = useState(3);
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();

  function choiceSentence() {
    let choiceSentence =
      sentences?.[Math.floor(Math.random() * sentences?.length)];

    setSentence(choiceSentence);

    const percent =
      (100 * (sentencesFromChat.length - sentences.length)) /
      sentencesFromChat.length;

    setBarPercent(percent);

    if (challengeType !== ChallengeType.SPEAK) {
      console.log("entrou");
      textToSpeech(choiceSentence.english, 0.8);
    }
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

  function playAudion(name: string) {
    new Audio(`/${name}.wav`).play();
  }

  function checkCorrectSentence(isCorrect: boolean) {
    if (isCorrect) {
      setFooterVariant(FooterVariant.SUCCESS);
      setShouldCleanValues(true);
      playAudion("success");

      const newSentences = sentences.filter((sentenceItem) => {
        return sentenceItem.id !== sentence.id;
      });

      if (newSentences.length === 0) {
        router.push("/");
      }

      setSentences(newSentences);
    } else {
      playAudion("error");

      setFooterVariant(FooterVariant.ERROR);
      setShouldCleanValues(true);
      const newErrorNumber = errorsSentences - 1;
      setErrorsSentences(newErrorNumber);

      if (newErrorNumber === 0) {
        playAudion("game-over");
        router.push("/");
      }
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

  async function speechToText() {
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
    choiceChallengeType();
    choiceSentence();
  }, []);

  return (
    <div className="min-h-full w-full mx-auto mt-10 h-screen">
      <div className="max-w-5xl flex gap-5 items-center flex-1 mx-auto w-full">
        <button>
          <Modal
            isOpen={openModal}
            onOpenChange={(isOpen) => setOpenModal(isOpen)}
          >
            <Modal.Button asChild>
              <X size={30} />
            </Modal.Button>
            <Modal.Content>
              <div className="flex flex-col items-center w-full gap-4">
                <Image src="/bird.svg" alt="bird" height={120} width={120} />
                <span className="text-center font-bold text-xl text-gray-800">
                  Wait one minute !
                </span>

                <div className="text-center">
                  <span className="text-center text-gray-secondary font-medium">
                    You`ve already picked up the pace... if you leave now,
                    you`ll lose your progress
                  </span>
                </div>

                <Button onClick={() => setOpenModal(false)} variant="blue">
                  Learn more!
                </Button>
                <Button
                  onClick={() => router.push("/")}
                  variant="error"
                  typeButton="outline"
                >
                  leave
                </Button>
              </div>
            </Modal.Content>
          </Modal>
        </button>

        <ProgressBar progress={barPercent} />

        <div className="flex items-center gap-1">
          <Image
            data-error={errorsSentences === 0}
            className="data-[error=true]:opacity-0 data-[error=true]:translate-y-10 transition-all duration-1000 ease-in-out"
            src="/heart.svg"
            alt="heart"
            width={32}
            height={32}
          />
          <Image
            data-error={errorsSentences <= 1}
            src="/heart.svg"
            className="data-[error=true]:opacity-0 data-[error=true]:translate-y-10 transition-all duration-1000 ease-in-out"
            alt="heart"
            width={32}
            height={32}
          />
          <Image
            data-error={errorsSentences <= 2}
            src="/heart.svg"
            className="data-[error=true]:opacity-0 data-[error=true]:translate-y-10 transition-all duration-1000 ease-in-out"
            alt="heart"
            width={32}
            height={32}
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-36">
        <div
          className={`${challengeType !== ChallengeType.SPEAK ? "hidden" : ""}`}
        >
          <SpeakChallenge
            isListening={isListening}
            speakSentence={speakSentence}
            sentence={sentence.english}
            recognizeSpeech={speechToText}
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
            wrongSolution={
              challengeType === ChallengeType.SPEAK
                ? speakSentence
                : selectedSentence
            }
            handleNextSentence={handleNextSentence}
          />
        )}
      </Footer>
    </div>
  );
}
