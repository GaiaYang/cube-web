import AlgorithmCaseCard from "./AlgorithmCaseCard";

import GridListRepeat from "@/components/list/GridListRepeat";

export default function AlgorithmCasesFallback() {
  return <GridListRepeat count={4} renderItem={renderItem} />;
}

function renderItem() {
  return <AlgorithmCaseCard isLoading />;
}

