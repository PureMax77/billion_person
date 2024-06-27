"use client";

import { IPeople } from "@/app/page";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  person: IPeople;
}

const PersonCard: React.FC<Props> = ({ person }) => {
  const router = useRouter();

  const billion = Math.floor(person.netWorth / 1000);

  return (
    <div
      className="flex flex-col gap-2 justify-center items-center py-4 cursor-pointer transform transition-transform duration-300 hover:scale-105"
      onClick={() => router.push(`/person/${person.id}`)}
    >
      <Image
        src={person.squareImage}
        width={250}
        height={250}
        alt={person.name}
      ></Image>
      <div>{person.name}</div>
      <div>
        {billion} Billion / {person.industries[0]}
      </div>
    </div>
  );
};

export default PersonCard;
