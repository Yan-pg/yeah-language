"use client";

import { useEffect, useState } from "react";

import units from "@/data/units.json";
import { generateSlug } from "@/tools";
import { ChallengeTemplate } from "@/modules/challenge/templete";
import { Chat } from "@/modules/challenge/models";
import { useParams } from "next/navigation";

interface ChallengePageProps {
  params: {
    slug: string;
  };
}

export default function Challenge() {
  const params = useParams();
  const [sentences, setSentences] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { slug } = params;

    const unit = units.content.find(
      (unit) => generateSlug(unit.title) === slug
    );

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
      {!loading ? (
        <ChallengeTemplate sentences={sentences} />
      ) : (
        <span>loading...</span>
      )}
    </>
  );
}
