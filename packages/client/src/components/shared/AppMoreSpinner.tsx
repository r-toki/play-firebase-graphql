import { Center, Spinner } from "@chakra-ui/react";
import { useEffect, useRef, VFC } from "react";
import { useIntersection } from "react-use";

type MoreSpinnerProps = {
  cb: () => void;
};

export const MoreSpinner: VFC<MoreSpinnerProps> = ({ cb }) => {
  const intersectionRef = useRef<HTMLDivElement>(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });
  useEffect(() => {
    if (intersection && intersection.intersectionRatio >= 1) {
      cb();
    }
  }, [intersection]);

  return (
    <Center>
      <Spinner ref={intersectionRef} />
    </Center>
  );
};
