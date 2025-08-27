import { PartialTheme } from "@nivo/theming";
import daisyTheme from "@/themes/daisy";

const lightTheme: PartialTheme = {
  background: daisyTheme.light.base100,
  axis: {
    domain: {
      line: {
        strokeWidth: 0,
        stroke: daisyTheme.light.base300,
      },
    },
    ticks: {
      line: {
        strokeWidth: 1,
        stroke: daisyTheme.light.base300,
      },
      text: {
        fill: daisyTheme.light.neutral,
        fontSize: 11,
      },
    },
    legend: {
      text: {
        fill: daisyTheme.light.baseContent,
        fontSize: 13,
        fontWeight: 600,
      },
    },
  },
  legends: {
    text: {
      fontSize: 12,
      fill: daisyTheme.light.baseContent,
    },
    ticks: {
      line: {
        strokeWidth: 1,
        stroke: daisyTheme.light.base300,
      },
      text: {
        fill: daisyTheme.light.neutral,
        fontSize: 10,
      },
    },
    title: {
      text: {
        fill: daisyTheme.light.baseContent,
        fontSize: 10,
        fontWeight: 800,
      },
    },
  },
  tooltip: {
    container: {
      fontSize: "13px",
      background: daisyTheme.light.base100,
      color: daisyTheme.light.baseContent,
      borderRadius: "0.5rem",
      boxShadow: `0 2px 8px 0 ${daisyTheme.light.base200}`,
    },
  },
  labels: {
    text: {
      fill: daisyTheme.light.baseContent,
      fontWeight: 600,
    },
  },
  annotations: {
    text: {
      fill: daisyTheme.light.baseContent,
      outlineWidth: 1.5,
      outlineColor: daisyTheme.light.base100,
      outlineOpacity: 0.35,
    },
    link: {
      stroke: daisyTheme.light.base200,
      strokeWidth: 1.5,
      outlineWidth: 2.5,
      outlineColor: daisyTheme.light.base100,
      outlineOpacity: 0.35,
    },
    outline: {
      stroke: daisyTheme.light.base200,
      strokeWidth: 1.5,
      outlineWidth: 2.5,
      outlineColor: daisyTheme.light.base100,
      outlineOpacity: 0.35,
    },
    symbol: {
      fill: daisyTheme.light.base200,
      outlineWidth: 2.5,
      outlineColor: daisyTheme.light.base100,
      outlineOpacity: 0.35,
    },
  },
};

const darkTheme: PartialTheme = {
  background: daisyTheme.dark.base100,
  axis: {
    domain: {
      line: {
        strokeWidth: 0,
        stroke: daisyTheme.dark.base300,
      },
    },
    ticks: {
      line: {
        strokeWidth: 1,
        stroke: daisyTheme.dark.base300,
      },
      text: {
        fill: daisyTheme.dark.neutralContent,
        fontSize: 11,
      },
    },
    legend: {
      text: {
        fill: daisyTheme.dark.baseContent,
        fontSize: 13,
        fontWeight: 500,
      },
    },
  },
  grid: {
    line: {
      stroke: daisyTheme.dark.base200,
    },
  },
  legends: {
    text: {
      fontSize: 12,
      fill: daisyTheme.dark.baseContent,
    },
    ticks: {
      line: {
        strokeWidth: 1,
        stroke: daisyTheme.dark.base300,
      },
      text: {
        fill: daisyTheme.dark.neutralContent,
        fontSize: 10,
      },
    },
    title: {
      text: {
        fill: daisyTheme.dark.baseContent,
        fontSize: 10,
        fontWeight: 800,
      },
    },
  },
  tooltip: {
    container: {
      fontSize: "13px",
      background: daisyTheme.dark.base200,
      color: daisyTheme.dark.baseContent,
      borderRadius: "0.5rem",
      boxShadow: `0 2px 8px 0 ${daisyTheme.dark.base200}`,
    },
  },
  labels: {
    text: {
      fill: daisyTheme.dark.baseContent,
      fontSize: 12,
      fontWeight: 500,
    },
  },
  dots: {
    text: {
      fill: daisyTheme.dark.neutralContent,
      fontSize: 12,
    },
  },
  annotations: {
    text: {
      fill: daisyTheme.dark.baseContent,
      outlineWidth: 1.5,
      outlineColor: daisyTheme.dark.base100,
      outlineOpacity: 0.35,
    },
    link: {
      stroke: daisyTheme.dark.base200,
      strokeWidth: 1.5,
      outlineWidth: 2.5,
      outlineColor: daisyTheme.dark.base100,
      outlineOpacity: 0.35,
    },
    outline: {
      stroke: daisyTheme.dark.base200,
      strokeWidth: 1.5,
      outlineWidth: 2.5,
      outlineColor: daisyTheme.dark.base100,
      outlineOpacity: 0.35,
    },
    symbol: {
      fill: daisyTheme.dark.base200,
      outlineWidth: 2,
      outlineColor: daisyTheme.dark.base100,
      outlineOpacity: 0.35,
    },
  },
};

export default {
  light: lightTheme,
  dark: darkTheme,
};
