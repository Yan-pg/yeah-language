"use client";

import Image from "next/image";
import { Tag } from "@/modules/share/components/Tag";
import { SpeakerSimpleHigh } from "@phosphor-icons/react/dist/ssr";
import { Chat } from "../../models";
import { useCallback, useEffect, useRef, useState } from "react";

interface ChallengeSentenceProps {
  chat: Chat[];
}

interface RadomWords {
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

export function ChallengeSentence({ chat }: ChallengeSentenceProps) {
  const [sentence, setSentence] = useState<Sentence>({} as Sentence);
  const [sentences, setSentences] = useState<Chat[]>(chat);
  const [selectedWords, setSelectedWords] = useState<RadomWords[]>([]);
  const wordsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wordsSelectedRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerSelectedRef = useRef<HTMLHRElement>(null);
  const disabledWordsRef = useRef<(HTMLDivElement | null)[]>([]);

  function choiceSentence() {
    let choiceSentence =
      sentences?.[Math.floor(Math.random() * sentences?.length)];
    const removeSentence = sentences?.filter(
      (sentence) => sentence.id !== choiceSentence.id
    );

    const sentence = {
      ...choiceSentence,
      randomWords: generateRandomWords(
        choiceSentence?.portuguese + " " + choiceSentence?.randomPortuguese
      ),
    };

    setSentences(removeSentence);
    setSentence(sentence);
  }

  function generateRandomWords(sentence: string): RadomWords[] {
    if (!sentence) return [];

    const words = sentence
      .split(" ")
      .sort(() => Math.random() - 0.5)
      .map((word) => {
        return {
          id: Math.random().toString(36).substring(7),
          word,
        };
      });
    return words;
  }

  function handleUnselectWord(id: string, index: number) {
    const filterSelectedRefs = wordsSelectedRefs.current.filter(
      (element, index, array) => array.indexOf(element) === index && element
    );

    const removeWord = selectedWords.filter((word) => word.id !== id);

    const wordIndex = sentence.randomWords.findIndex((word) => {
      return word.id === id;
    });

    const wordRef = wordsRefs.current[wordIndex];
    const disabledWordRef = disabledWordsRef.current[wordIndex];
    const wordSelectedRef = filterSelectedRefs[index];

    if (!wordRef || !disabledWordRef || !wordSelectedRef) return;

    const disabledWordRefPosition = disabledWordRef.getBoundingClientRect();
    const wordSelectedRefPosition = wordSelectedRef.getBoundingClientRect();

    const x = disabledWordRefPosition.x - wordSelectedRefPosition.x;
    const y = disabledWordRefPosition.y - wordSelectedRefPosition.y;

    const translate = `translate(${x}px, ${y}px)`;
    wordSelectedRef.style.transform = translate;

    setTimeout(() => {
      wordRef.style.display = "block";
      wordRef.style.transform = "translate(0px, 0px)";
      setSelectedWords(removeWord);
    }, 300);
  }

  const updateSelectedWords = useCallback(
    ({ wordInstance, wordRef }: updateSelectedWordsProps) => {
      setTimeout(() => {
        wordRef.style.display = "none";
        setSelectedWords([...selectedWords, wordInstance]);
      }, 300);
    },
    [selectedWords]
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

      wordRef.style.transform = transform;

      updateSelectedWords({ wordInstance, wordRef });
    },
    [selectedWords]
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
      const wordRef = wordsRefs.current[index];
      const wordSelectedRef =
        wordsSelectedRefs.current[wordsSelectedRefs.current.length - 1];

      if (!containerSelectedRef.current || !wordRef) return;

      const wordRefPosition = wordRef.getBoundingClientRect();
      const containerSelectedRefPosition =
        containerSelectedRef.current.getBoundingClientRect();

      if (!wordSelectedRef) {
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
    [addEnd, addStart]
  );

  useEffect(() => {
    choiceSentence();
  }, []);

  return (
    <div className="min-h-full h-full w-full flex items-center justify-center flex-1">
      <div className="w-full max-w-xl">
        <div>
          <h1 className="text-3xl font-bold text-[#3C3C3C] line">
            Write this in English
          </h1>

          <div className="flex items-center gap-2">
            <Image src="/ana.png" alt="Ana piture" height={169} width={114} />
            <div>
              <Tag asChild hasShadow={false}>
                <div className="flex items-center gap-2">
                  <button className="text-blue-primary focus:text-gray-600">
                    <SpeakerSimpleHigh size={32} weight="fill" />
                  </button>

                  <span>{sentence.english}</span>
                </div>
              </Tag>
            </div>
          </div>

          <hr className="border-2" />
        </div>

        <div className="mt-1 flex flex-wrap gap-2 min-h-[3.5rem] transition-all duration-400">
          {selectedWords?.map((selected, index) => {
            return (
              <div
                key={selected.id}
                className="transition-all duration-400"
                ref={(element) => wordsSelectedRefs.current.push(element)}
                onClick={() => handleUnselectWord(selected.id, index)}
              >
                <Tag>{selected.word}</Tag>
              </div>
            );
          })}
        </div>

        <hr className="border-2 mt-1" ref={containerSelectedRef} />

        <div className="flex flex-wrap mt-7 gap-2">
          {sentence?.randomWords?.map((radom, index) => {
            return (
              <div key={radom.id} className="relative">
                <div
                  ref={(element) => wordsRefs.current.push(element)}
                  id={radom.id}
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
                  ref={(element) => disabledWordsRef.current.push(element)}
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
