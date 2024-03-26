import { useRouter } from "next/router";
import Page from "../layout/page";
import { api } from "~/utils/api";
import CompanyDetailSkeleton from "~/components/Card/CompanyDetailCard/CompanyDetailSkeleton";

export default function CompanyDetail() {
  const router = useRouter();
  const { companyId } = router.query;

  const { data, isLoading } = api.company.getCompanyById.useQuery(
    companyId as string,
  );

  return (
    <div className="bg-gray-50">
      <Page className="mx-auto mt-10 max-w-screen-xl">
        {!isLoading && data ? (
          <div className="mx-auto w-screen max-w-7xl">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
              <div className="px-4 py-6 sm:px-6">
                <h3 className="text-xl font-semibold leading-7 text-gray-900">
                  {data?.name}
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  {data?.description}
                </p>
              </div>
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">
                      Adress
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {data?.address}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">
                      Industry
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {data?.industry}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">
                      Website
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {data?.website}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">
                      Telephone
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {data?.telephone}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Size</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {data?.size}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <CompanyDetailSkeleton />
          </div>
        )}

        <div className="mx-auto mt-10 w-screen max-w-7xl">
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="broder-gray-50 border-b px-4 py-6 sm:px-6">
              <h3 className="text-xl font-semibold leading-7 text-gray-900">
                Open Postion
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Expore out open poisition and join us!
              </p>
            </div>
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 p-10 pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {data?.jobListings.map((job) => (
                <article
                  key={job.id}
                  className="flex max-w-xl flex-col items-start justify-between"
                >
                  <div className="flex items-center gap-x-4 rounded-full bg-gray-100 p-1 px-3 text-xs">
                    {job.type}
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <span className="absolute inset-0" />
                      {job.title}
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      {job.description}
                    </p>
                  </div>
                  <button
                    className="mt-5 rounded-lg bg-indigo-500 p-1 px-6
                   font-semibold text-white hover:bg-indigo-600"
                  >
                    Schedule Interview
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Page>
    </div>
  );
}
