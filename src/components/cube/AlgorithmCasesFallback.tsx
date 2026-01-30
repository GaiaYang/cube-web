import GridListRepeat from "../list/GridListRepeat";
import AlgorithmCaseCard from "./AlgorithmCaseCard";

export default function AlgorithmCasesFallback() {
  return (
    <GridListRepeat
      count={4}
      renderItem={() => <AlgorithmCaseCard isLoading />}
    />
  );
}
