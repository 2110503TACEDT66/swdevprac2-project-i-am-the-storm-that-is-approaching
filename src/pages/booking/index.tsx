import { api } from "~/utils/api";
import Page from "../layout/page";
import { useSession } from "next-auth/react";
import { type Application } from "../companies/[companyId]";

export default function bookings() {
  const sessionId = useSession().data?.user.id ?? "NO_OP";
  const { data: applications, refetch } =
    api.application.getApplicationsForUser.useQuery(sessionId);
  const applicationsData: Application[] = applications ?? [];
  return (
    <div className="bg-gray-50">
      <Page>
        <div className="mx-5 max-w-screen-xl text-2xl 2xl:mx-auto">
          <div className="mx-auto mt-10 w-screen max-w-7xl">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
              <div className="broder-gray-50 border-b px-4 py-6 sm:px-6">
                <h3 className="text-xl font-semibold leading-7 text-gray-900">
                  Booking
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  Here is your booking. You have the option to edit or delete
                  it. Feel free to make any changes before being selected for an
                  interview!
                </p>
              </div>
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 p-10 pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {applicationsData?.map((job) => (
                  <article
                    key={job.jobListing.id}
                    className="flex max-w-xl flex-col items-start justify-between"
                  >
                    <div className="flex items-center gap-x-4 rounded-full bg-gray-100 p-1 px-3 text-xs">
                      {job.jobListing.type}
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <span className="absolute inset-0" />
                        {job.jobListing.title}
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                        {job.jobListing.description}
                      </p>
                    </div>
                    <div className="text-sm">
                      <button className="mt-5 rounded-lg bg-gray-200 p-1 px-6 font-semibold text-black hover:bg-gray-300">
                        Edit
                      </button>
                      <button className="ml-2 mt-5 rounded-lg bg-red-600 p-1 px-6 font-semibold text-white hover:bg-red-700">
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Page>
    </div>
  );
}
