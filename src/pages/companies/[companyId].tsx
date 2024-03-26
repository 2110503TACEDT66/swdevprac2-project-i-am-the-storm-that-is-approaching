import { useRouter } from "next/router";
import Page from "../layout/page";
import { api } from "~/utils/api";
import CompanyDetailSkeleton from "~/components/Card/CompanyDetailCard/CompanyDetailSkeleton";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  Input,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { format } from "date-fns";

export default function CompanyDetail() {
  const router = useRouter();
  const { companyId } = router.query;
  const [open, setOpen] = useState(false);
  const { data, isLoading } = api.company.getCompanyById.useQuery(
    companyId as string,
  );
  const [date, setDate] = useState<Date>();

  const handleClickInterview = () => {
    setOpen(true);
  };

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
                    onClick={handleClickInterview}
                  >
                    Schedule Interview
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Page>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Schedule Your Interview
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Please pick a suitable date and time for your job
                        interview from the calendar below.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center pt-5">
                    <input
                      type="datetime-local"
                      id="meeting-time"
                      name="meeting-time"
                      min="2022-05-10T00:00"
                      max="2022-05-13T23:59"
                    />
                  </div>

                  <div className="mt-5 sm:mt-6">
                    <a
                      href="#"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Confirm Schedule Interview
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
