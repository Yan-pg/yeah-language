"use client";

import { useEffect, useState } from "react";

import units from "@/data/units.json";
import { generateSlug } from "@/tools";
import { ChallengeTemplate } from "@/modules/challenge/templete";
import { Chat } from "@/modules/challenge/models";
import { useParams } from "next/navigation";
import { Loading } from "@/modules/share";

export default function Challenge() {
  const params = useParams();
  const [sentences, setSentences] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const { slug } = params;

  const unit = units.content.find((unit) => generateSlug(unit.title) === slug);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/generate-sentences`, {
      method: "POST",
      body: JSON.stringify({ unit: unit?.contents }),
    })
      .then((response) => response.json())
      .then(({ response }) => {
        setSentences(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {!loading && sentences.length > 0 ? (
        <ChallengeTemplate sentences={sentences} unitId={unit?.id || 1} />
      ) : (
        <div className="h-screen flex w-full m-auto max-w-[162px] items-center justify-center">
          <div className="text-center">
            <Loading />

            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-600">Loading...</h1>
              <span className="mr-5">Wait a minute</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
