"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/modules/share";
import { Plus, Trash } from "@phosphor-icons/react";
import axios from "axios";
import { OffensiveStatus } from "../enums";

interface Offensive {
  id: string;
  offensiveFrom: string;
  offensiveTo: string;
  status: OffensiveStatus;
}

export function OffensiveTemplate() {
  const [offensives, setOffensives] = useState<Offensive[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function getOffensives() {
      try {
        const { data } = await axios.get("http://localhost:3004/offensive");
        setOffensives(data);
      } catch (error) {
        console.error(error);
      }
    }

    getOffensives();
  }, []);

  async function deleteOffensive(id: string) {
    try {
      await axios.delete(`http://localhost:3004/offensive/${id}`);
      const newOffensives = offensives.filter(
        (offensive) => offensive.id !== id
      );
      setOffensives(newOffensives);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="max-w-5xl  md:gap-5 mx-auto w-full px-4">
      <div className=" flex justify-between items-center mt-10">
        <h1 className="text-green-primary font-bold text-lg ">
          Your offensives
        </h1>

        <div className="max-w-xs w-full">
          <Button onClick={() => router.push("/offensive/create")}>
            Create a new offensive
          </Button>
        </div>
      </div>

      {offensives.length === 0 ? (
        <Link
          href="/offensive/create"
          className="flex items-center gap-3 justify-center w-full text-green-primary"
        >
          <Plus size={24} weight="thin" />
          Create a new offensive
        </Link>
      ) : (
        <div className="mt-10 grid grid-cols-4 gap-4">
          {offensives.map((offensive, index) => (
            <button
              key={offensive.id}
              onClick={() => {
                if (offensive.status === OffensiveStatus.ACTIVE) {
                  router.push(`/offensive/edit/${offensive.id}`);
                }
              }}
              className="w-full bg-green-100 border border-green-900 rounded-xl p-4 text-left flex flex-col cursor-pointer"
            >
              <div className="flex items-center justify-between w-full">
                <p className="text-green-900 font-bold">
                  Offensive - {index + 1}
                </p>

                {offensive.status === OffensiveStatus.ACTIVE && (
                  <button onClick={() => deleteOffensive(offensive.id)}>
                    <Trash weight="bold" className="text-green-900" />
                  </button>
                )}
              </div>
              <span className="break-all text-gray-700">
                {offensive.offensiveFrom} - {offensive.offensiveTo}
              </span>

              {offensive.status === OffensiveStatus.ACTIVE && (
                <span className="bg-green-400 text-xs text-white w-fit p-1 rounded-md mt-2">
                  {offensive.status}
                </span>
              )}
              {offensive.status === OffensiveStatus.DONE && (
                <span className="bg-blue-primary text-xs text-white w-fit p-1 rounded-md mt-2">
                  {offensive.status}
                </span>
              )}
              {offensive.status === OffensiveStatus.REJECTED && (
                <span className="bg-red-400 text-xs text-white w-fit p-1 rounded-md mt-2">
                  {offensive.status}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
