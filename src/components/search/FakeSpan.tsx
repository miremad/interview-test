import { useEffect, useRef } from "react";

type FakeSpanPropsType = {
  textValue: string;
  setFakeSpanDomWidth: (t: string) => void;
};
export function FakeSpan({
  textValue,
  setFakeSpanDomWidth,
}: FakeSpanPropsType) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const newWidth = getComputedStyle(ref.current).width;
      setFakeSpanDomWidth(newWidth);
    }
  }, [textValue]);

  return (
    <span ref={ref} className="invisible absolute whitespace-pre">
      {textValue}
    </span>
  );
}
