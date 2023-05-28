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
  (typeof TEXT_STYLE_SIZE)[keyof typeof TEXT_STYLE_SIZE];

export const TEXT_STYLE_WEIGHT = {
  default: "default",
  Sb: "Sb",
  Eb: "Eb",
  Reg: "Reg",
  Md: "Md",
  Bd: "Bd",
} as const;

export type TextStyleWeight =
  (typeof TEXT_STYLE_WEIGHT)[keyof typeof TEXT_STYLE_WEIGHT];

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
    [TEXT_STYLE_WEIGHT.Eb]: {
      fontSize: 3.2,
      fontWeight: 800,
    },
    [TEXT_STYLE_WEIGHT.default]: {
      fontSize: 3.2,
      fontWeight: 800,
    },
  },
  [TEXT_STYLE_SIZE.xl]: {
    [TEXT_STYLE_WEIGHT.Bd]: {
      fontSize: 2.4,
      fontWeight: 700,
    },
    [TEXT_STYLE_WEIGHT.default]: {
      fontSize: 2.4,
      fontWeight: 700,
    },
  },
  [TEXT_STYLE_SIZE.lg]: {
    [TEXT_STYLE_WEIGHT.default]: {
      fontSize: 2.1,
      fontWeight: 500,
    },
    [TEXT_STYLE_WEIGHT.Bd]: {
      fontSize: 2.1,
      fontWeight: 700,
    },
    [TEXT_STYLE_WEIGHT.Eb]: {
      fontSize: 2.1,
      fontWeight: 800,
    },
  },
  [TEXT_STYLE_SIZE.md1]: {
    [TEXT_STYLE_WEIGHT.Md]: {
      fontSize: 1.8,
      fontWeight: 500,
    },
    [TEXT_STYLE_WEIGHT.Sb]: {
      fontSize: 1.8,
      fontWeight: 600,
    },
    [TEXT_STYLE_WEIGHT.Bd]: {
      fontSize: 1.8,
      fontWeight: 700,
    },
    [TEXT_STYLE_WEIGHT.Eb]: {
      fontSize: 1.8,
      fontWeight: 800,
    },
  },
  [TEXT_STYLE_SIZE.md2]: {
    [TEXT_STYLE_WEIGHT.Reg]: {
      fontSize: 1.6,
      fontWeight: 400,
    },
    [TEXT_STYLE_WEIGHT.Md]: {
      fontSize: 1.6,
      fontWeight: 500,
    },
    [TEXT_STYLE_WEIGHT.Sb]: {
      fontSize: 1.6,
      fontWeight: 600,
    },
    [TEXT_STYLE_WEIGHT.Bd]: {
      fontSize: 1.6,
      fontWeight: 700,
    },
  },
  [TEXT_STYLE_SIZE.sm]: {
    [TEXT_STYLE_WEIGHT.Reg]: {
      fontSize: 1.5,
      fontWeight: 400,
    },
    [TEXT_STYLE_WEIGHT.Md]: {
      fontSize: 1.5,
      fontWeight: 500,
    },
  },
  [TEXT_STYLE_SIZE.xsm]: {
    [TEXT_STYLE_WEIGHT.Reg]: {
      fontSize: 1.4,
      fontWeight: 400,
    },
    [TEXT_STYLE_WEIGHT.Md]: {
      fontSize: 1.4,
      fontWeight: 500,
    },
    [TEXT_STYLE_WEIGHT.Bd]: {
      fontSize: 1.4,
      fontWeight: 700,
    },
  },
  [TEXT_STYLE_SIZE.xxsm]: {
    [TEXT_STYLE_WEIGHT.default]: {
      fontSize: 1.2,
      fontWeight: 500,
    },
    [TEXT_STYLE_WEIGHT.Md]: {
      fontSize: 1.2,
      fontWeight: 500,
    },
    [TEXT_STYLE_WEIGHT.Reg]: {
      fontSize: 1.2,
      fontWeight: 400,
    },
  },
  [TEXT_STYLE_SIZE.xxxsm]: {
    [TEXT_STYLE_WEIGHT.Reg]: {
      fontSize: 1,
      fontWeight: 400,
    },
    [TEXT_STYLE_WEIGHT.Md]: {
      fontSize: 1,
      fontWeight: 500,
    },
  },
  [TEXT_STYLE_SIZE.xxxxsm]: {
    [TEXT_STYLE_WEIGHT.Md]: {
      fontSize: 1,
      fontWeight: 500,
    },
  },
};

export interface colorTheme {
  THEME: {
    primary: {
      10: string;
      20: string;
      30: string;
      40: string;
      70: string;
      100: string;
      110: string;
      120: string;
      130: string;
      160: string;
      variant: string;
    };
    secondary: {
      10: string;
      20: string;
      30: string;
      40: string;
      70: string;
      100: string;
      110: string;
      120: string;
      130: string;
      160: string;
      variant: string;
    };
    negative: {
      10: string;
      100: string;
    };
    positive: {
      10: string;
      100: string;
    };
  };
  Neutral: {
    100: string;
    90: string;
    80: string;
    70: string;
    40: string;
    30: string;
    20: string;
    10: string;
    5: string;
    0: string;
  };
  Text: {
    active: string;
    darken: string;
    default: string;
    muted: string;
    disabled: string;
    lighten: string;
  };
  Background: {
    surface: string;
    onSurface: string;
    divider: string;
    input: string;
    inputBorderDefault: string;
    inputBorderFocus: string;
  };
  ACCENT: {
    alwaysRed: string;
  };
}

/**
 * 라이트모드 컬러 디자인 토큰
 */
export const LIGHT_COLOR_STYLE: colorTheme = {
  THEME: {
    primary: {
      10: "#EDFFF2",
      20: "#DCFFE6",
      30: "#C0FFD2",
      40: "#99FFB6",
      70: "#54FF84",
      100: "#54FF84",
      110: "#45F076",
      120: "#34E466",
      130: "#19D24D",
      160: "#16BD45",
      variant: "#A8EABC",
    },
    secondary: {
      10: "#FFFEED",
      20: "#FFFDDD",
      30: "#FFFCC7",
      40: "#FFFAAA",
      70: "#FFF66B",
      100: "#FFF849",
      110: "#FCF326",
      120: "#FFEA2E",
      130: "#FFDF36",
      160: "#F6CF00",
      variant: "#E4E2AF",
    },
    negative: {
      10: "#FFEDED",
      100: "#FF5454",
    },
    positive: {
      10: "#ECF8FF",
      100: "#31B5FF",
    },
  },
  Neutral: {
    100: "#1B1B1C",
    90: "#343536",
    80: "#474849",
    70: "#717375",
    40: "#999B9D",
    30: "#C4C6C9",
    20: "#DEE0E2",
    10: "#F0F0F1",
    5: "#F3F3F4",
    0: "#FFFFFF",
  },
  Text: {
    active: "#0D0D0D",
    darken: "#303030",
    default: "#565656",
    muted: "#929292",
    disabled: "#C5C5C5",
    lighten: "#FBFBFB",
  },
  Background: {
    surface: "#FFFFFF",
    onSurface: "#F2F2F2",
    divider: "#EDEDED",
    input: "#FAFAFA",
    inputBorderDefault: "#E2E2E2",
    inputBorderFocus: "#1B1B1C",
  },
  ACCENT: {
    alwaysRed: "#FF3040",
  },
} as const;

/**
 * 다크모드 컬러 디자인토큰
 */
export const DARK_COLOR_STYLE: colorTheme = {
  THEME: {
    primary: {
      10: "#EDFFF2",
      20: "#DCFFE6",
      30: "#C0FFD2",
      40: "#99FFB6",
      70: "#54FF84",
      100: "#54FF84",
      110: "#45F076",
      120: "#34E466",
      130: "#19D24D",
      160: "#16BD45",
      variant: "#A4E9B8",
    },
    secondary: {
      10: "#FFFEED",
      20: "#FFFDDD",
      30: "#FFFCC7",
      40: "#FFFAAA",
      70: "#FFF66B",
      100: "#FFF849",
      110: "#FCF326",
      120: "#FFEA2E",
      130: "#FFDF36",
      160: "#F6CF00",
      variant: "#E4E2AF",
    },
    negative: {
      10: "#FFEDED",
      100: "#FF5454",
    },
    positive: {
      10: "#ECF8FF",
      100: "#31B5FF",
    },
  },
  Neutral: {
    100: "#FFFFFF",
    90: "#F2F3F5",
    80: "#EBEDF0",
    70: "#DEE0E2",
    40: "#C4C6C9",
    30: "#999B9D",
    20: "#6E7277",
    10: "#46494B",
    5: "#343536",
    0: "#1B1B1C",
  },
  Text: {
    active: "rgba(255, 255, 255, 0.95)",
    darken: "rgba(0, 0, 0, 0.65)",
    default: "rgba(255, 255, 255, 0.75)",
    muted: "rgba(255, 255, 255, 0.55)",
    disabled: "rgba(255, 255, 255, 0.35)",
    lighten: "rgba(255, 255, 255, 0.95)",
  },
  Background: {
    surface: "#121212",
    onSurface: "#2C2C2C",
    divider: "#909092",
    input: "#202020",
    inputBorderDefault: "#9B9B9C",
    inputBorderFocus: "",
  },
  ACCENT: {
    alwaysRed: "#FF3040",
  },
} as const;
