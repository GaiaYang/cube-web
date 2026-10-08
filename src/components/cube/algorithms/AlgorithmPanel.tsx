import { cn } from "cn";

import { Divider } from "@/components/daisy-ui/divider";
import { Skeleton } from "@/components/daisy-ui/skeleton";
import type { CommonDefinition } from "@/types/cube/common";

import AlgorithmDisplay from "./AlgorithmDisplay";

export interface AlgorithmPanelProps extends CommonDefinition {
  renderPattern?: React.ReactNode;
}

/** 公式面板 */
export default function AlgorithmPanel({
  // id,
  name,
  setupAlgorithm,
  algorithms,
  renderPattern,
}: AlgorithmPanelProps) {
  return (
    <div className="w-full grow px-6">
      <div className="flex items-center gap-6 max-md:flex-col">
        <figure className="max-md:self-center">
          {renderPattern ? (
            <div className="size-40">{renderPattern}</div>
          ) : null}
        </figure>
        <div className="max-md:w-full">
          <h1
            className={cn(
              "mb-5 font-mono text-4xl font-extrabold",
              "max-md:text-center",
            )}
          >
            {name}
          </h1>
          <h3 className="mb-2 font-semibold">設置</h3>
          <AlgorithmDisplay algorithm={setupAlgorithm} />
        </div>
      </div>
      <Divider />
      <h3 className="mb-2 text-xl font-semibold">公式表</h3>
      <ul>
        {algorithms.map((item, index) => (
          <li key={index}>
            <AlgorithmDisplay algorithm={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AlgorithmPanelFallback() {
  return (
    <div className="w-full grow px-6" aria-busy="true">
      <div className="flex items-center gap-6 max-md:flex-col">
        <Skeleton className="size-40" />
        <div className="max-md:w-full">
          <Skeleton className="mb-5 h-10 w-40" />
          <Skeleton className="h-6 w-64" />
        </div>
      </div>
    </div>
  );
}
