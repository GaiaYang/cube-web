import { PartialTheme } from "@nivo/theming";
import daisyTheme from "@/themes/daisy";

const nivoThemeFromDaisy = (theme: typeof daisyTheme.light): PartialTheme => ({
  background: theme.base100,
  axis: {
    domain: {
      line: {
        strokeWidth: 0,
        stroke: theme.neutralContent,
      },
    },
    ticks: {
      line: {
        strokeWidth: 1,
        stroke: theme.neutralContent,
      },
      text: {
        fill: theme.baseContent,
        fontSize: 11,
      },
    },
    legend: {
      text: {
        fill: theme.baseContent,
        fontSize: 13,
        fontWeight: 600,
      },
    },
  },
  grid: {
    line: {
      stroke: "oklch(55.1% 0.027 264.364/ 20%)",
    },
  },
  legends: {
    text: {
      fontSize: 12,
      fill: theme.baseContent,
    },
    ticks: {
      line: {
        strokeWidth: 1,
        stroke: theme.base300,
      },
      text: {
        fill: theme.baseContent,
        fontSize: 10,
      },
    },
    title: {
      text: {
        fill: theme.baseContent,
        fontSize: 10,
        fontWeight: 800,
      },
    },
  },
  tooltip: {
    container: {
      fontSize: "13px",
      background: theme.base200,
      color: theme.baseContent,
      padding: "6px 8px",
      borderRadius: "4px",
    },
  },
  labels: {
    text: {
      fill: theme.baseContent,
      fontWeight: 600,
    },
  },
  dots: {
    text: {
      fill: theme.baseContent,
      fontSize: 12,
    },
  },
  annotations: {
    text: {
      fill: theme.baseContent,
      outlineWidth: 1.5,
      outlineColor: theme.base200,
      outlineOpacity: 0.35,
    },
    link: {
      stroke: theme.neutralContent,
      strokeWidth: 1.5,
      outlineWidth: 2.5,
      outlineColor: theme.base200,
      outlineOpacity: 0.35,
    },
    outline: {
      stroke: theme.neutralContent,
      strokeWidth: 1.5,
      outlineWidth: 2.5,
      outlineColor: theme.base200,
      outlineOpacity: 0.35,
    },
    symbol: {
      fill: " theme.neutralContent",
      outlineWidth: 2,
      outlineColor: theme.base200,
      outlineOpacity: 0.35,
    },
  },
});

const theme: { light: PartialTheme; dark: PartialTheme } = {
  light: nivoThemeFromDaisy(daisyTheme.light),
  dark: nivoThemeFromDaisy(daisyTheme.dark),
};

export default theme;
