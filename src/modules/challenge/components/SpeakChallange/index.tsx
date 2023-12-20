import Image from "next/image";

import { Tag } from "@/modules/share/components/Tag";
import { Microphone, SpeakerSimpleHigh } from "@phosphor-icons/react/dist/ssr";

interface SpeakChallengeProps {
  sentence: string;
  isListening: boolean;
  speakSentence: string;
  recognizeSpeech: () => void;
}

export function SpeakChallenge({
  sentence,
  isListening,
  speakSentence,
  recognizeSpeech,
}: SpeakChallengeProps) {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center gap-2">
        <Image src="/ana.png" alt="Ana piture" height={169} width={114} />
        <div>
          <Tag asChild hasShadow={false}>
            <div className="flex items-center gap-2">
              <button className="text-blue-primary focus:text-gray-600">
                <SpeakerSimpleHigh size={32} weight="fill" />
              </button>

              <span data-cy="cy-sentence">{sentence}</span>
            </div>
          </Tag>
        </div>
      </div>
      <div>
        <Tag asChild>
          <button
            className="flex items-center gap-1 text-blue-primary"
            onClick={recognizeSpeech}
          >
            {!isListening && <Microphone size={20} weight="fill" />}

            <span className="font-semibold">
              {isListening
                ? "Listening"
                : speakSentence.length
                ? speakSentence
                : "Click to talk"}
            </span>
          </button>
        </Tag>
      </div>
    </div>
  );
}
