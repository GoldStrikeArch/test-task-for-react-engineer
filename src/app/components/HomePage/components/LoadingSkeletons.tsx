import { CARD_WIDTH, ITEMS_PER_PAGE } from "@/constants";
import { Skeleton } from "antd";

export const LoadingSkeletons = () => {
  const arr = new Array(ITEMS_PER_PAGE).fill(false);

  return (
    <>
      {arr.map((_) => (
        <div key={Math.random() * Date.now()} style={{ width: CARD_WIDTH }}>
          <Skeleton active />
          <Skeleton.Button active />
        </div>
      ))}
    </>
  );
};
