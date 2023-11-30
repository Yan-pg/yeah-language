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

export function ChallengeSentence({ chat }: ChallengeSentenceProps) {
  const [sentence, setSentence] = useState<Sentence>({} as Sentence);
  const [sentences, setSentences] = useState<Chat[]>(chat);
  const [selectedWords, setSelectedWords] = useState<RadomWords[]>([
    {
      id: "vbp3vf",
      word: "nesta",
    },
  ]);
  const wordsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wordsSelectedRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  function handleUnselectWord(id: string) {
    const removeWord = selectedWords.filter((word) => word.id !== id);
    setSelectedWords(removeWord);
  }

  const handleSElectedWord = useCallback(
    (wordInstance: RadomWords, index: number) => {
      const wordRef = wordsRefs.current[index];
      const wordSelectedRef =
        wordsSelectedRefs.current[wordsSelectedRefs.current.length - 1];

      if (!wordSelectedRef) {
        setSelectedWords([...selectedWords, wordInstance]);
        return;
      }

      if (!wordRef) return;
      const wordRefPosition = wordRef.getBoundingClientRect();
      const wordSelectedRefPosition = wordSelectedRef.getBoundingClientRect();

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
      // wordRef.style.opacity = "0";

      setTimeout(() => {
        wordRef.style.opacity = "0";
        setSelectedWords([...selectedWords, wordInstance]);
      }, 300);
    },
    [selectedWords, wordsRefs, wordsSelectedRefs, setSelectedWords]
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

        <div className="mt-1 flex flex-wrap gap-2 min-h-[3rem]">
          {selectedWords?.map((selected) => {
            return (
              <div
                className="transition-all"
                key={selected.id}
                ref={(element) => wordsSelectedRefs.current.push(element)}
              >
                <Tag handleClick={() => handleUnselectWord(selected.id)}>
                  {selected.word}
                </Tag>
              </div>
            );
          })}
        </div>

        <hr className="border-2 mt-1" />

        <div className="flex flex-wrap mt-7 gap-2">
          {sentence?.randomWords?.map((radom, index) => {
            return (
              <div key={radom.id} className="relative">
                <div
                  ref={(element) => wordsRefs.current.push(element)}
                  id={radom.id}
                  className="transition-all duration-400 ease-out"
                >
                  <Tag handleClick={() => handleSElectedWord(radom, index)}>
                    {radom.word}
                  </Tag>
                </div>

                <div
                  data-disabled={
                    !!selectedWords.filter((word) => word.id === radom.id)
                      .length
                  }
                  className="absolute top-0 hidden data-[disabled=true]:block translateY-[-100%]"
                >
                  <Tag
                    selected={
                      !!selectedWords.filter((word) => word.id === radom.id)
                        .length
                    }
                    handleClick={() => handleSElectedWord(radom, index)}
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
