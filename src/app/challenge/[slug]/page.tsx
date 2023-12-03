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

  useEffect(() => {
    console.log(params);

    const { slug } = params;

    const unit = units.content.find(
      (unit) => generateSlug(unit.title) === slug
    );

    fetch(`http://localhost:3000/api/generate-sentences`, {
      method: "POST",
      body: JSON.stringify({ unit: unit?.contents }),
    })
      .then((response) => response.json())
      .then(({ response }) => setSentences(response));
  }, [params]);

  return (
    <>{sentences.length > 0 && <ChallengeTemplate sentences={sentences} />}</>
  );
}
