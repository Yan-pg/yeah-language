"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/modules/share";
import { OffensiveStatus } from "../enums";

interface CreateOrEditOffensiveTemplateProps {
  offensiveId?: string;
}

export function CreateOrEditOffensiveTemplate({
  offensiveId,
}: CreateOrEditOffensiveTemplateProps) {
  const [offensiveFrom, setOffensiveFrom] = useState<string>("");
  const [offensiveTo, setOffensiveTo] = useState<string>("");
  const router = useRouter();

  const isEdit = !!offensiveId;

  useEffect(() => {
    if (offensiveId) {
      getOffensive();
    }
  }, [offensiveId]);

  async function getOffensive() {
    try {
      const { data } = await axios.get(
        `http://localhost:3004/offensive/${offensiveId}`
      );
      setOffensiveFrom(data.offensiveFrom);
      setOffensiveTo(data.offensiveTo);
    } catch (error) {
      console.error(error);
    }
  }

  async function createOffensive() {
    try {
      if (!offensiveFrom.length || !offensiveTo.length) {
        alert("Please fill all fields");
        return;
      }

      const data = {
        offensiveFrom,
        offensiveTo,
        status: "active",
      };

      const getActiveOffensive = await axios.get(
        `http://localhost:3004/offensive?status=${OffensiveStatus.ACTIVE}`
      );
      if (getActiveOffensive.data.length > 0) {
        alert("You already have an active offensive");
        return;
      }

      await axios.post("http://localhost:3004/offensive", data);

      router.push("/offensive");
    } catch (error) {
      console.error(error);
    }
  }

  function editOffensive() {
    try {
      if (!offensiveFrom.length || !offensiveTo.length) {
        alert("Please fill all fields");
        return;
      }

      const data = {
        offensiveFrom,
        offensiveTo,
        status: "active",
      };

      axios.put(`http://localhost:3004/offensive/${offensiveId}`, data);
      router.push("/offensive");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="max-w-5xl md:gap-5 mx-auto w-full px-4">
      <h1 className="text-green-primary font-bold text-lg mt-10">
        Create your offensive
      </h1>

      <div className="flex items-center gap-4">
        <div className="flex flex-col mt-3">
          <label htmlFor="from" className="text-lg text-gray-600">
            From
          </label>
          <div>
            <input
              type="date"
              id="from"
              value={offensiveFrom}
              className="text-gray-500"
              onChange={(e) => {
                setOffensiveFrom(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex flex-col mt-3">
          <label htmlFor="from" className="text-lg text-gray-600">
            to
          </label>
          <div>
            <input
              type="date"
              id="from"
              value={offensiveTo}
              className="text-gray-500"
              onChange={(e) => {
                setOffensiveTo(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Button
          onClick={() => {
            if (isEdit) {
              editOffensive();
              return;
            }
            createOffensive();
          }}
        >
          {isEdit ? "Edit" : "Create"}
        </Button>
      </div>
    </div>
  );
}
