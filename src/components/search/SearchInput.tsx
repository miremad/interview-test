import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ServiceResultsResponse } from "src/server";
import { FakeSpan } from "./FakeSpan";

type FeaturefulSearchInputProps = {
  serviceSearchInputValue: string;
  setServiceSearchInputValue: (t: string) => void;
  serviceSearchResults: ServiceResultsResponse[];
};
export const FeaturefulSearchInput = ({
  serviceSearchInputValue,
  setServiceSearchInputValue,
  serviceSearchResults,
}: FeaturefulSearchInputProps) => {
  const [suggestionInputPlaceholder, setSuggestionInputPlaceholder] =
    useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setServiceSearchInputValue(value);
  };

  let firstSearchItemText: string = serviceSearchResults[0]?.name
    ? serviceSearchResults[0].name
    : "";

  let isInputValueSubstrinOfFirstSearchItem: boolean =
    serviceSearchInputValue ===
    firstSearchItemText.substring(0, serviceSearchInputValue.length);

  useEffect(() => {
    const newPlaceholder = isInputValueSubstrinOfFirstSearchItem
      ? firstSearchItemText
      : "";

    setSuggestionInputPlaceholder(newPlaceholder);
  }, [serviceSearchInputValue, serviceSearchResults]);

  return (
    <div className="flex w-full">
      <div className="flex justify-between items-center w-full relative overflow-hidden">
        <input
          ref={inputRef}
          type="search"
          className="absolute outline-none text-gray-700"
          style={{ width: "100%", background: "none" }}
          value={serviceSearchInputValue}
          onChange={handleSearchInputChange}
          placeholder="به چه خدمتی نیاز دارید؟"
        />

        {/* <FakeSpan
          textValue={serviceSearchInputValue}
          setFakeSpanDomWidth={setFakeSpanDomWidth}
        /> */}

        <input
          placeholder={suggestionInputPlaceholder}
          className="w-full outline-none"
        />
      </div>
    </div>
  );
};
