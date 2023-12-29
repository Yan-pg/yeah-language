"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { Card } from "../../components";
import { Unit } from "../../models";
import { getSession } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";

interface HomeTemplateProps {
  units: Unit[];
}

export function HomeTemplate({ units }: HomeTemplateProps) {
  const { user } = useUser();
  const [completedChallenges, setCompletedChallenges] = useState<number>(1);

  useEffect(() => {
    if (!user) return;

    const { email } = user;

    axios
      .get(`http://localhost:3004/challenge-complete?id=${email}`)
      .then((res) => {
        if (!res.data) {
          return;
        }

        if (res.data.length === 0) {
          createUser();
          return;
        }

        setCompletedChallenges(res.data[0].last_completed);
      });
  }, [user]);

  async function createUser() {
    try {
      if (!user) return;

      const { sub } = user;

      await axios.post("http://localhost:3004/challenge-complete", {
        id: sub,
        last_completed: 1,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="max-w-5xl p-1 m-auto">
      <section className="gap-4  my-10 grid grid-cols-3">
        {units.map((unit) => (
          <Card
            disabled={completedChallenges < unit.id}
            key={unit.id}
            unit={unit}
          />
        ))}
      </section>
    </main>
  );
}
