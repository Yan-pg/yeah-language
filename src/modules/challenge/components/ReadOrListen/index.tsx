"use client";

import Image from "next/image";
import { Tag } from "@/modules/share/components/Tag";
import { SpeakerSimpleHigh } from "@phosphor-icons/react/dist/ssr";
import { Chat } from "../../models";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChallengeType } from "../../templete";

interface ChallengeSentenceProps {
  chat: Chat;
  shouldCleanValues: boolean;
  challengeType: ChallengeType;
  selectedSentence: (sentence: string) => void;
  speak: (text: string, rate?: number) => void;
}

export interface RadomWords {
  id: string;
  word: string;
}

interface Sentence extends Chat {
  randomWords: RadomWords[];
}

interface AddStartProps {
  wordRefPosition: DOMRect;
  containerSelectedRefPosition: DOMRect;
  wordRef: HTMLDivElement;
  wordInstance: RadomWords;
}

interface AddEndProps {
  wordRefPosition: DOMRect;
  wordSelectedRefPosition: DOMRect;
  wordRef: HTMLDivElement;
  wordInstance: RadomWords;
}

interface updateSelectedWordsProps {
  wordRef: HTMLDivElement;
  wordInstance: RadomWords;
}

export function ReadOrListen({
  chat,
  shouldCleanValues,
  challengeType,
  selectedSentence,
  speak,
}: ChallengeSentenceProps) {
  const [sentence, setSentence] = useState<Sentence>({} as Sentence);
  const [selectedWords, setSelectedWords] = useState<RadomWords[]>([]);
  const fistRender = useRef(true);
  const wordsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wordsSelectedRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerSelectedRef = useRef<HTMLHRElement | null>(null);
  const disabledWordsRef = useRef<(HTMLDivElement | null)[]>([]);

  let title =
    challengeType === ChallengeType.WRITE
      ? "Write this in English"
      : "Tap what you hear";

  function choiceSentence() {
    if (challengeType === ChallengeType.WRITE) {
      const randomWords = generateRandomWords(
        chat.randomPortuguese + " " + chat.portuguese
      );

      const sentenceGenerated = {
        ...chat,
        randomWords,
      };

      setSentence(sentenceGenerated);
      return;
    }

    const randomWords = generateRandomWords(
      chat.randomEnglish + " " + chat.english
    );

    const sentenceGenerated = {
      ...chat,
      randomWords,
    };

    setSentence(sentenceGenerated);
  }

  function generateRandomWords(sentence: string): RadomWords[] {
    if (!sentence) return [];

    const words = sentence
      .split(" ")
      .sort(() => Math.random() - 0.5)
      .map((word) => {
        return {
          id: crypto.randomUUID(),
          word,
        };
      });
    return words;
  }

  function generateSelectedWordsToSentences(values: RadomWords[]) {
    return values.map((values) => values.word).join(" ");
  }

  function handleUnselectWord(
    id: string,
    index: number,
    wordInstance: RadomWords
  ) {
    if (challengeType === ChallengeType.LISTEN) {
      speak(wordInstance.word.toLocaleLowerCase(), 0.5);
    }

    const filterSelectedRefs = wordsSelectedRefs.current.filter(
      (element, index, array) => array.indexOf(element) === index && element
    );

    const newSelectedWords = selectedWords.filter((word) => word.id !== id);

    const wordIndex = sentence.randomWords.findIndex((word) => {
      return word.id === id;
    });

    const wordRef = wordsRefs.current[wordIndex];
    const disabledWordRef = disabledWordsRef.current[wordIndex];
    const wordSelectedRef = filterSelectedRefs[index];

    if (!wordRef || !disabledWordRef || !wordSelectedRef) return;

    wordRef.style.display = "block";
    wordRef.style.transform = "translate(0px, 0px)";

    const generateSentence = generateSelectedWordsToSentences(newSelectedWords);
    setSelectedWords(newSelectedWords);
    selectedSentence(generateSentence);
  }

  function speakWordByWord() {
    const words = sentence.english.split(" ");

    words.forEach((word, index) => {
      setTimeout(() => {
        speak(word.toLocaleLowerCase(), 0.1);
      }, 1000 * index);
    });
  }

  const updateSelectedWords = useCallback(
    ({ wordInstance, wordRef }: updateSelectedWordsProps) => {
      const newSelectedWords = [...selectedWords, wordInstance];
      const generateSentence =
        generateSelectedWordsToSentences(newSelectedWords);

      setTimeout(() => {
        wordRef.style.display = "none";
        setSelectedWords(newSelectedWords);
        selectedSentence(generateSentence);
      }, 300);
    },
    [selectedSentence, selectedWords]
  );

  const addStart = useCallback(
    ({
      containerSelectedRefPosition,
      wordRef,
      wordRefPosition,
      wordInstance,
    }: AddStartProps) => {
      let y =
        wordRefPosition.y -
        containerSelectedRefPosition.y +
        (wordRefPosition.height + 6);
      let x = wordRefPosition.x - containerSelectedRefPosition.x;

      if (x > 0) {
        x = -1 * x;
      }

      if (y > 0) {
        y = -1 * y;
      }

      let transform = `translate(${x}px, ${y}px)`;

      console.log("start", transform);
      wordRef.style.transform = transform;

      updateSelectedWords({ wordInstance, wordRef });
    },
    [updateSelectedWords]
  );

  const addEnd = useCallback(
    ({
      wordInstance,
      wordRef,
      wordRefPosition,
      wordSelectedRefPosition,
    }: AddEndProps) => {
      const x =
        wordRefPosition.x -
        wordSelectedRefPosition.x -
        (wordSelectedRefPosition.width + 8);
      const y = wordRefPosition.y - wordSelectedRefPosition.y;

      let transform = `translate(-${x}px, -${y}px)`;

      if (x < 0) {
        transform = `translate(${-1 * x}px, ${-1 * y}px)`;
      }

      wordRef.style.transform = transform;

      updateSelectedWords({ wordInstance, wordRef });
    },
    [updateSelectedWords]
  );

  const handleSelectedWord = useCallback(
    (wordInstance: RadomWords, index: number) => {
      if (challengeType === ChallengeType.LISTEN) {
        speak(wordInstance.word.toLocaleLowerCase(), 0.5);
      }

      const wordRef = wordsRefs.current[index];
      const wordSelectedRef =
        wordsSelectedRefs.current[wordsSelectedRefs.current.length - 1];

      if (!containerSelectedRef.current || !wordRef) return;

      const wordRefPosition = wordRef.getBoundingClientRect();
      const containerSelectedRefPosition =
        containerSelectedRef.current.getBoundingClientRect();

      if (!selectedWords.length || !wordSelectedRef) {
        addStart({
          containerSelectedRefPosition,
          wordRef,
          wordRefPosition,
          wordInstance,
        });
        return;
      }

      const wordSelectedRefPosition = wordSelectedRef.getBoundingClientRect();

      addEnd({
        wordInstance,
        wordRef,
        wordRefPosition,
        wordSelectedRefPosition,
      });
    },
    [addEnd, addStart, challengeType, selectedWords, speak]
  );

  useEffect(() => {
    if (!fistRender.current) {
      console.log({ chat, challengeType, speak });

      choiceSentence();

      return;
    }

    fistRender.current = false;
  }, [challengeType, chat]);

  useEffect(() => {
    if (!shouldCleanValues) return;

    setSelectedWords([]);
    setSentence({} as Sentence);
    wordsRefs.current = [];
    wordsSelectedRefs.current = [];
    disabledWordsRef.current = [];
  }, [shouldCleanValues]);

  return (
    <div className="min-h-full h-full w-full flex items-center justify-center flex-1">
      <div className="w-full max-w-xl">
        <div>
          <h1 className="text-3xl font-bold text-[#3C3C3C] line">{title} </h1>

          {challengeType === ChallengeType.WRITE ? (
            <div className="flex items-center gap-2">
              <Image src="/ana.png" alt="Ana piture" height={169} width={114} />
              <div>
                <Tag asChild hasShadow={false}>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => speak(sentence.english)}
                      className="text-blue-primary focus:text-gray-600"
                    >
                      <SpeakerSimpleHigh size={32} weight="fill" />
                    </button>

                    <span data-cy="sentence">{sentence.english}</span>
                  </div>
                </Tag>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-end gap-4 mt-6">
              <div>
                <Tag asChild isBlue>
                  <button
                    className="text-4xl md:text-7xl  text-white"
                    onClick={() => speak(sentence.english, 0.8)}
                  >
                    <SpeakerSimpleHigh weight="fill" />
                  </button>
                </Tag>
              </div>

              <div>
                <Tag asChild isBlue>
                  <button onClick={speakWordByWord}>
                    <Image
                      className="hidden md:block"
                      src="/turtle.svg"
                      alt="Turle picture"
                      height={42}
                      width={42}
                    />
                    <Image
                      className="md:hidden"
                      src="/turtle.svg"
                      alt="Turle picture"
                      height={20}
                      width={20}
                    />
                  </button>
                </Tag>
              </div>
            </div>
          )}
          <hr className="border-2" />
        </div>

        <div className="mt-1 flex flex-wrap gap-2 min-h-[3.5rem] transition-all duration-400">
          {selectedWords?.map((selected, index) => {
            return (
              <div
                key={selected.id}
                className="transition-all duration-400"
                ref={(element) => {
                  if (!element || wordsRefs.current.includes(element)) {
                    return;
                  }
                  wordsSelectedRefs.current.push(element);
                }}
                onClick={() => handleUnselectWord(selected.id, index, selected)}
              >
                <Tag>{selected.word}</Tag>
              </div>
            );
          })}
        </div>

        <hr className="border-2 mt-1" ref={containerSelectedRef} />

        <div className="flex flex-wrap mt-7 gap-2">
          {sentence &&
            sentence?.randomWords?.map((radom, index) => {
              return (
                <div key={radom.id} className="relative">
                  <div
                    ref={(element) => {
                      if (!element || wordsRefs.current.includes(element)) {
                        return;
                      }

                      wordsRefs.current.push(element);
                    }}
                    id={radom.id}
                    data-cy={radom.word}
                    draggable={true}
                    className="transition-all duration-400 ease-out"
                  >
                    <Tag handleClick={() => handleSelectedWord(radom, index)}>
                      {radom.word}
                    </Tag>
                  </div>

                  <div
                    data-disabled={
                      !!selectedWords.filter((word) => word.id === radom.id)
                        .length
                    }
                    ref={(element) => {
                      const verifyElementAlreadyExists =
                        disabledWordsRef.current.filter(
                          (wordElement) =>
                            wordElement?.innerHTML === element?.innerHTML
                        ).length;

                      if (!element || verifyElementAlreadyExists) {
                        return;
                      }
                      disabledWordsRef.current.push(element);
                    }}
                    className="transition-all hidden opacity-0 data-[disabled=true]:block data-[disabled=true]:opacity-100 duration-400"
                  >
                    <Tag
                      selected={
                        !!selectedWords.filter((word) => word.id === radom.id)
                          .length
                      }
                    >
                      {radom.word}
                    </Tag>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
