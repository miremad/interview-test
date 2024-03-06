import { ServiceResultsResponse } from "src/server";

type SearchResultsPropsType = {
  results: ServiceResultsResponse[];
  containerClassName: string;
};
export function SearchResults({
  results,
  containerClassName,
}: SearchResultsPropsType) {
  return (
    <ul className={containerClassName}>
      {results.map(({ name }) => (
        <li
          key={name}
          className="border-b border-b-[#F5F5F5] p-3 cursor-pointer hover:bg-[#E5F1FF] list-none select-none"
        >
          {name}
        </li>
      ))}
    </ul>
  );
}
