import { ValentinesBackground } from "../components/ValentinesBackground";
import SlidingPuzzle from "./SlidingPuzzle";

const PINK_GRADIENT = "#ffe4ec";

export default function PuzzlePage() {
  return (
    <>
      <ValentinesBackground gradient={PINK_GRADIENT} />
      <SlidingPuzzle />
    </>
  );
}
