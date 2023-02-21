export const TEXT_STYLE_SIZE = {
  xxl: "2xl",
  xl: "xl",
  lg: "lg",
  md1: "md1",
  md2: "md2",
  sm: "sm",
  xsm: "xsm",
  xxsm: "2xsm",
  xxxsm: "3xsm",
  xxxxsm: "4xsm",
} as const;

export type TextStyleSize =
  typeof TEXT_STYLE_SIZE[keyof typeof TEXT_STYLE_SIZE];

export const TEXT_STYLE_WEIGHT = {
  default: "default",
  Sb: "Sb",
  Eb: "Eb",
  Reg: "Reg",
  Md: "Md",
  Bd: "Bd",
} as const;

export type TextStyleWeight =
  typeof TEXT_STYLE_WEIGHT[keyof typeof TEXT_STYLE_WEIGHT];

interface TextStyle {
  fontSize: number;
  fontWeight: number;
}

/**
 * 텍스트 디자인 토큰
 * e.g. TEXT_STYLES.2xl.default
 */
export const TEXT_STYLES: Record<
  TextStyleSize,
  Partial<Record<TextStyleWeight, TextStyle>>
> = {
  [TEXT_STYLE_SIZE.xxl]: {
    [TEXT_STYLE_WEIGHT.default]: {
      fontSize: 32,
      fontWeight: 800,
    },
  },
  [TEXT_STYLE_SIZE.xl]: {
    [TEXT_STYLE_WEIGHT.default]: {
      fontSize: 24,
      fontWeight: 700,
    },
  },
  [TEXT_STYLE_SIZE.lg]: {
    [TEXT_STYLE_WEIGHT.default]: {
      fontSize: 21,
      fontWeight: 500,
    },
    [TEXT_STYLE_WEIGHT.Bd]: {
      fontSize: 21,
      fontWeight: 700,
    },
    [TEXT_STYLE_WEIGHT.Eb]: {
      fontSize: 21,
      fontWeight: 800,
    },
  },
  [TEXT_STYLE_SIZE.md1]: {
    [TEXT_STYLE_WEIGHT.Md]: {
      fontSize: 18,
      fontWeight: 500,
    },
    [TEXT_STYLE_WEIGHT.Sb]: {
      fontSize: 18,
      fontWeight: 600,
    },
    [TEXT_STYLE_WEIGHT.Eb]: {
      fontSize: 18,
      fontWeight: 800,
    },
  },
  [TEXT_STYLE_SIZE.md2]: {
    [TEXT_STYLE_WEIGHT.Reg]: {
      fontSize: 16,
      fontWeight: 400,
    },
    [TEXT_STYLE_WEIGHT.Md]: {
      fontSize: 16,
      fontWeight: 500,
    },
    [TEXT_STYLE_WEIGHT.Sb]: {
      fontSize: 16,
      fontWeight: 600,
    },
    [TEXT_STYLE_WEIGHT.Bd]: {
      fontSize: 16,
      fontWeight: 700,
    },
  },
  [TEXT_STYLE_SIZE.sm]: {
    [TEXT_STYLE_WEIGHT.Reg]: {
      fontSize: 15,
      fontWeight: 400,
    },
    [TEXT_STYLE_WEIGHT.Md]: {
      fontSize: 15,
      fontWeight: 500,
    },
  },
  [TEXT_STYLE_SIZE.xsm]: {
    [TEXT_STYLE_WEIGHT.Reg]: {
      fontSize: 14,
      fontWeight: 400,
    },
    [TEXT_STYLE_WEIGHT.Md]: {
      fontSize: 14,
      fontWeight: 500,
    },
  },
  [TEXT_STYLE_SIZE.xxsm]: {
    [TEXT_STYLE_WEIGHT.default]: {
      fontSize: 12,
      fontWeight: 500,
    },
  },
  [TEXT_STYLE_SIZE.xxxsm]: {
    [TEXT_STYLE_WEIGHT.default]: {
      fontSize: 10,
      fontWeight: 500,
    },
  },
  [TEXT_STYLE_SIZE.xxxxsm]: {
    [TEXT_STYLE_WEIGHT.default]: {
      fontSize: 18,
      fontWeight: 500,
    },
  },
};

/**
 * 컬러 디자인 토큰
 */
export const COLOR_STYLE = {
  THEME: {
    primary: {
      10: {
        Light: "#EDFFF2",
        Dark: "#EDFFF2",
      },
      20: {
        Light: "#DCFFE6",
        Dark: "#DCFFE6",
      },
      30: {
        Light: "#C0FFD2",
        Dark: "#C0FFD2",
      },
      40: {
        Light: "#99FFB6",
        Dark: "#99FFB6",
      },
      70: {
        Light: "#54FF84",
        Dark: "#54FF84",
      },
      100: {
        Light: "#54FF84",
        Dark: "#54FF84",
      },
      110: {
        Light: "#45F076",
        Dark: "#45F076",
      },
      120: {
        Light: "#34E466",
        Dark: "#34E466",
      },
      130: {
        Light: "#19D24D",
        Dark: "#19D24D",
      },
      160: {
        Light: "#16BD45",
        Dark: "#16BD45",
      },
      variant: {
        Light: "#A8EABC",
        Dark: "#A4E9B8",
      },
    },
    secondary: {
      10: {
        Light: "#FFFEED",
        Dark: "#FFFEED",
      },
      20: {
        Light: "#FFFDDD",
        Dark: "#FFFDDD",
      },
      30: {
        Light: "#FFFCC7",
        Dark: "#FFFCC7",
      },
      40: {
        Light: "#FFFAAA",
        Dark: "#FFFAAA",
      },
      70: {
        Light: "#FFF66B",
        Dark: "#FFF66B",
      },
      100: {
        Light: "#FFF849",
        Dark: "#FFF849",
      },
      110: {
        Light: "#FCF326",
        Dark: "#FCF326",
      },
      120: {
        Light: "#FFEA2E",
        Dark: "#FFEA2E",
      },
      130: {
        Light: "#FFDF36",
        Dark: "#FFDF36",
      },
      160: {
        Light: "#F6CF00",
        Dark: "#F6CF00",
      },
      variant: {
        Light: "#E4E2AF",
        Dark: "#E4E2AF",
      },
    },
    negative: "#FF5454",
  },
  Neutral: {
    100: {
      Light: "#1B1B1C",
      Dark: "#FFFFFF",
    },
    90: {
      Light: "#343536",
      Dark: "#F2F3F5",
    },
    80: {
      Light: "#474849",
      Dark: "#EBEDF0",
    },
    70: {
      Light: "#717375",
      Dark: "#DEE0E2",
    },
    40: {
      Light: "#999B9D",
      Dark: "#C4C6C9",
    },
    30: {
      Light: "#C4C6C9",
      Dark: "#999B9D",
    },
    20: {
      Light: "#DEE0E2",
      Dark: "#6E7277",
    },
    10: {
      Light: "#F0F0F1",
      Dark: "#46494B",
    },
    5: {
      Light: "#F3F3F4",
      Dark: "#343536",
    },
    0: {
      Light: "#FFFFFF",
      Dark: "#1B1B1C",
    },
  },
  Text: {
    active: {
      Light: "#0D0D0D",
      Dark: "rgba(255, 255, 255, 0.95)",
    },
    darken: {
      Light: "#303030",
      Dark: "rgba(0, 0, 0, 0.65)",
    },
    default: {
      Light: "#565656",
      Dark: "rgba(255, 255, 255, 0.75)",
    },
    muted: {
      Light: "#929292",
      Dark: "rgba(255, 255, 255, 0.55)",
    },
    disabled: {
      Light: "#C5C5C5",
      Dark: "rgba(255, 255, 255, 0.35)",
    },
    lighten: {
      Light: "#FBFBFB",
      Dark: "rgba(255, 255, 255, 0.95)",
    },
  },
  Background: {
    surface: {
      Light: "#FFFFFF",
      Dark: "#121212",
    },
    onSurface: {
      Light: "#F2F2F2",
      Dark: "#2C2C2C",
    },
    divider: {
      Light: "#EDEDED",
      Dark: "#909092",
    },
    input: {
      Light: "#FAFAFA",
      Dark: "#202020",
    },
    inputBorderDefault: {
      Light: "#E2E2E2",
      Dark: "#9B9B9C",
    },
    inputBorderFocus: {
      Light: "#1B1B1C",
    },
  },
  ACCENT: {
    alwaysRed: "#FF3040",
  },
} as const;
