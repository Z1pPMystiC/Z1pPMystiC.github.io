import { ValentinesBackground } from "../components/ValentinesBackground";
import SlidingPuzzle from "./SlidingPuzzle";

const PINK_GRADIENT = "linear-gradient(135deg, #fff5f7 0%, #ffe4ec 50%, #ffd1dc 100%)";

export default function PuzzlePage() {
  return (
    <>
      <ValentinesBackground gradient={PINK_GRADIENT} />
      <SlidingPuzzle />
    </>
  );
}
