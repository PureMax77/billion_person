import PersonCard from "@/components/PersonCard";

export interface IPeople {
  id: string;
  name: string;
  squareImage: string;
  newWorth: number;
  industries: string[];
}

async function getPeople(): Promise<IPeople[]> {
  const res = await fetch("https://billions-api.nomadcoders.workers.dev");
  const json: IPeople[] = await res.json();
  const result = json.filter((item) => !item.squareImage.includes("undefined"));
  return result;
}

export default async function Home() {
  const people = await getPeople();

  return (
    <div className="grid grid-cols-4 gap-3">
      {people.map((person, index) => (
        <PersonCard key={index} person={person} />
      ))}
    </div>
  );
}
