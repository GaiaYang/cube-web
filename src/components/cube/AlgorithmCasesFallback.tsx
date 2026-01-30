import GridListRepeat from "@/components/list/GridListRepeat";
import AlgorithmCaseCard from "./AlgorithmCaseCard";

export default function AlgorithmCasesFallback() {
  return <GridListRepeat count={4} renderItem={renderItem} />;
}

function renderItem() {
  return <AlgorithmCaseCard isLoading />;
}
