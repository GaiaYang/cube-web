import LastLayer from "@/components/diagram/3x3/LastLayer";
// import getCubeColorMap from "@/utils/cube/3x3/getCubeColorMap";

export default function Home() {
  return (
    <div>
      <LastLayer colorMap={{ BC: "blue" }} />
    </div>
  );
}
