import Image from "next/image";

interface FinancialAsset {
  exchange: string;
  ticker: string;
  companyName: string;
  numberOfShares: number;
  sharePrice?: number;
  currencyCode: string;
  exchangeRate: number;
  interactive: boolean;
  currentPrice: number;
  exerciseOptionPrice?: number;
}

interface PersonProfile {
  id: string;
  state: string;
  city: string;
  name: string;
  country: string;
  position: number;
  industries: string[];
  financialAssets: FinancialAsset[];
  thumbnail: string;
  squareImage: string;
  bio: string[];
  about: string[];
  netWorth: number;
}

const getPerson = async (id: string): Promise<PersonProfile> => {
  const res = await fetch(
    `https://billions-api.nomadcoders.workers.dev/person/${id}`
  );
  const result = await res.json();
  return result;
};

const formatNumber = (number: number) => {
  return new Intl.NumberFormat("en-US").format(number);
};

const Person: React.FC<any> = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const data = await getPerson(id);

  const billion = Math.floor(data.netWorth / 1000);

  return (
    <div className="flex flex-col items-center">
      {/* top */}
      <div className="flex flex-col gap-3 max-w-4xl w-full bg-slate-900 rounded-lg px-6 py-10 mb-20">
        <Image
          src={data.squareImage}
          width={300}
          height={300}
          alt={data.name}
        ></Image>
        <p className="text-2xl font-bold">{data.name}</p>
        <p>NetWorth: {billion} Billion</p>
        <p>Country: {data.country}</p>
        <p>Industry: {data.industries[0]}</p>
        <p>{data.bio}</p>
      </div>
      {/* bottom */}
      <div className="flex flex-col max-w-4xl w-full bg-slate-900 rounded-lg px-6 py-10 mb-20">
        <p className="text-2xl font-bold mb-6">Financial Assets</p>
        <div className="grid grid-cols-4 gap-3">
          {data.financialAssets.map((asset, index) => {
            return (
              <div
                key={index}
                className="border border-gray-300 rounded-xl px-2 py-3"
              >
                <p>Ticker: {asset.ticker}</p>
                <p>Shares: {formatNumber(asset.numberOfShares)}</p>
                {asset.exerciseOptionPrice && (
                  <p>Exercise Price: ${asset.exerciseOptionPrice}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Person;
