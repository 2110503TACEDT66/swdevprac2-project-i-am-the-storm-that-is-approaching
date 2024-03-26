import { type FC } from "react";
import Avvvatars from "avvvatars-react";

interface CompanyCardProps {
  name: string;
  description: string;
}

const CompanyCard: FC<CompanyCardProps> = ({ name, description }) => {
  return (
    <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm font-medium text-gray-900">
              {name}
            </h3>
          </div>
          <p className="mt-1 truncate text-sm text-gray-500">{description}</p>
        </div>
        <Avvvatars
          value={name || "Anonymous"}
          size={80}
          border={true}
          radius={100}
        />
      </div>
    </li>
  );
};

export default CompanyCard;
