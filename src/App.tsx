import { useEffect, useState } from "react";
import { ServiceResultsResponse } from "./server";
import { FeaturefulSearchInput, SearchResults } from "./components/search";



export default function ServiceSearch() {
  const [serviceSearchInputValue, setServiceSearchInputValue] =
    useState<string>("");
  const [services, setServices] = useState<ServiceResultsResponse[]>([]);
  const [filteredServices, setFilteredServices] = useState<
    ServiceResultsResponse[]
  >([]);

  useEffect(() => {
    fetch("/api/services?zoneId=1").then((res) =>
      res.json().then((s) => setServices(s))
    );
  }, []);

  useEffect(() => {
    const results = services.filter((s) =>
      s.name.includes(serviceSearchInputValue)
    );

    if (serviceSearchInputValue.trim() !== "") {
      setFilteredServices(results);
    } else {
      setFilteredServices([]);
    }
  }, [serviceSearchInputValue]);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-white z-[99999] cursor-default">
      <div className="px-3 py-7 max-w-96 m-auto">
        <div className="relative flex items-center w-full shadow-sm rounded-md">
          <div className="flex flex-col justify-center w-full relative">
            <div className="flex items-center p-3 border-gray-200 border rounded-lg h-12">
              <FeaturefulSearchInput
                serviceSearchInputValue={serviceSearchInputValue}
                setServiceSearchInputValue={setServiceSearchInputValue}
                serviceSearchResults={filteredServices}
              />
            </div>
            <span className="absolute left-0 self-center h-9 w-0 border-r-[1px] border-gray-200" />
          </div>
          <SearchResults
            containerClassName="bg-white overflow-auto z-10 mt-12 top-0 max-h-72 absolute w-full border border-[#EAECED] rounded-b-md shadow-sm scrollbar-minimal"
            results={filteredServices}
          />
        </div>
      </div>
    </div>
  );
}
