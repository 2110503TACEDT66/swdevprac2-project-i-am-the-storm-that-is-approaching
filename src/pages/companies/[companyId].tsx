import { useRouter } from "next/router";
import Page from "../layout/page";
import { api } from "~/utils/api";

export default function CompanyDetail() {
  const router = useRouter();
  const { companyId } = router.query;

  const { data, isLoading, error } = api.company.getCompanyById.useQuery(
    companyId as string,
  );
  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Page>
      <div className="mx-auto max-w-screen-xl">
        <h1>{data?.name}</h1>
        <p>{data?.description}</p>
      </div>
    </Page>
  );
}
