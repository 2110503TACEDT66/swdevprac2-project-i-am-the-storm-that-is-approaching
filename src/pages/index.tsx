import { api } from "~/utils/api";
import Page from "./layout/page";
import CompanyCard from "~/components/Card/CompanyCard";

export default function Home() {
  const { data } = api.company.getAllCompaniesData.useQuery();

  return (
    <Page>
      <div className="mx-5 my-10 max-w-screen-xl sm:mx-auto">
        <div>
          <div className="my-5 text-2xl font-semibold">Company</div>
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {data?.map((company) => (
              <CompanyCard
                key={company.id}
                {...company}
                description={company.description ?? "No description available"}
              />
            ))}
          </ul>
        </div>
      </div>
    </Page>
  );
}
