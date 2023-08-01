import { useEffect } from "react";

type FetchNextPage = () => void;
type HasNextPage = boolean | undefined;

export function useIntersectionObserver(
  fetchNextPage: FetchNextPage,
  hasNextPage: HasNextPage
) {
  // intersaction 옵션
  const intersectionOptions = {
    root: document.querySelector("#scrollArea"),
    rootMargin: "0px",
    threshold: 0.5,
  };

  // 생성된 객체 중 마지막 객체가 인식되면 다시 query를 호출한다.
  const intersection = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        if (hasNextPage) {
          fetchNextPage();
        }
      }
    });
  }, intersectionOptions);

  const observeElement = (element: Element | null) => {
    if (element) {
      intersection.observe(element);
    }
  };

  // data가 변경될 떄마다 새로운 요소를 감시한다.
  useEffect(() => {
    return () => {
      intersection.disconnect();
    };
  }, []);

  return { observeElement };
}
