import { useSeconds } from "../hooks/seconds";
import "./SecondsButton.css";

type Props = {
  stopId: string;
};
export function SecondsButton({ stopId }: Props) {
  const { toggleSeconds } = useSeconds();

  const handleClick = () => {
    toggleSeconds();
  };

  const isLeastUsedStop = stopId === "H14";

  return (
    <>
      {isLeastUsedStop && (
        <span className="SecondsButton" onClick={handleClick}>
          ⏱️
        </span>
      )}
    </>
  );
}
