import convert from "@/utils/cube/converter/nnnCubes/specs/nnn";
import convert333 from "@/utils/cube/converter/nnnCubes/specs/333";

const output = {
  nnn: convert,
  "333": convert333,
} as const;

export default output;
