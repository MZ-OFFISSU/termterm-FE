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

// export type TextStyleWeight =
//   typeof TEXT_STYLE_WEIGHT[keyof typeof TEXT_STYLE_WEIGHT];

interface TextStyle {
  fontSize: number;
  fontWeight: number;
}

export type TextStyleWeight = {
  default?: TextStyle;
  Sb?: TextStyle;
  Eb?: TextStyle;
  Reg?: TextStyle;
  Md?: TextStyle;
  Bd?: TextStyle;
};

/**
 * 텍스트 디자인 토큰
 * e.g. TEXT_STYLES.2xl.default
 */
// export const TEXT_STYLES: Record<
//   TextStyleSize,
//   Record<TextStyleWeight, TextStyle>>
export const TEXT_STYLES: Record<TextStyleSize, TextStyleWeight> = {
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

export const COLOR_THEME = {
  primary: "primary",
  secondary: "secondary",
  negative: "negative",
} as const;

export const COLOR_THEME_VOLUME = {
  variant: "variant",
  160: "160",
  130: "130",
  120: "120",
  110: "110",
  100: "100",
  70: "70",
  40: "40",
  30: "30",
  20: "20",
  10: "10",
};

export const COLOR_NEUTRAL = {
  100: "100",
  90: "90",
  80: "80",
  70: "70",
  40: "40",
  30: "30",
  20: "20",
  10: "10",
  5: "05",
  0: "00",
} as const;

export const COLOR_TEXT = {
  active: "active",
  darken: "darken",
  default: "default",
  muted: "muted",
  disabled: "disabled",
  lighten: "lighten",
} as const;

export const COLOR_BACKGROUND = {
  surface: "surface",
  onSurface: "on-surface",
  divider: "divider",
  input: "input",
  inputBorderDefault: "input-border-default",
  inputBorderFocus: "input-border-focus",
} as const;

export const COLOR_ACCENT = {
  alwaysRed: "always-red",
} as const;

export const COLOR_TYPE = {
  Theme: "THEME",
  Neutral: "NEUTRAL",
  Text: "TEXT",
  Background: "BACKGROUND",
  ACCENT: "ACCENT",
} as const;

export const COLOR_MODE = {
  Light: "Light",
  Dark: "Dark",
} as const;

export type ColorType = typeof COLOR_TYPE[keyof typeof COLOR_TYPE];
export type ColorTheme = typeof COLOR_THEME[keyof typeof COLOR_THEME];
export type ColorThemeVolume =
  typeof COLOR_THEME_VOLUME[keyof typeof COLOR_THEME_VOLUME];
export type ColorNeutral = typeof COLOR_NEUTRAL[keyof typeof COLOR_NEUTRAL];
export type ColorText = typeof COLOR_TEXT[keyof typeof COLOR_TEXT];
export type ColorBackground =
  typeof COLOR_BACKGROUND[keyof typeof COLOR_BACKGROUND];
export type ColorAccent = typeof COLOR_ACCENT[keyof typeof COLOR_ACCENT];

export type ColorPicks<T extends ColorType> = T extends "THEME"
  ? ColorTheme
  : T extends "NEUTRAL"
  ? ColorNeutral
  : T extends "TEXT"
  ? ColorText
  : T extends "BACKGROUND"
  ? ColorBackground
  : T extends "ACCENT"
  ? ColorAccent
  : never;

/**
 * 컬러 디자인 토큰
 */
export const COLOR_STYLE: Record<ColorType, any> = {
  [COLOR_TYPE.Theme]: {
    [COLOR_THEME.primary]: {
      [COLOR_THEME_VOLUME[10]]: {
        [COLOR_MODE.Light]: "#EDFFF2",
        [COLOR_MODE.Dark]: "#EDFFF2",
      },
      [COLOR_THEME_VOLUME[20]]: {
        [COLOR_MODE.Light]: "#DCFFE6",
        [COLOR_MODE.Dark]: "#DCFFE6",
      },
      [COLOR_THEME_VOLUME[30]]: {
        [COLOR_MODE.Light]: "#C0FFD2",
        [COLOR_MODE.Dark]: "#C0FFD2",
      },
      [COLOR_THEME_VOLUME[40]]: {
        [COLOR_MODE.Light]: "#99FFB6",
        [COLOR_MODE.Dark]: "#99FFB6",
      },
      [COLOR_THEME_VOLUME[70]]: {
        [COLOR_MODE.Light]: "#54FF84",
        [COLOR_MODE.Dark]: "#54FF84",
      },
      [COLOR_THEME_VOLUME[100]]: {
        [COLOR_MODE.Light]: "#54FF84",
        [COLOR_MODE.Dark]: "#54FF84",
      },
      [COLOR_THEME_VOLUME[110]]: {
        [COLOR_MODE.Light]: "#45F076",
        [COLOR_MODE.Dark]: "#45F076",
      },
      [COLOR_THEME_VOLUME[120]]: {
        [COLOR_MODE.Light]: "#34E466",
        [COLOR_MODE.Dark]: "#34E466",
      },
      [COLOR_THEME_VOLUME[130]]: {
        [COLOR_MODE.Light]: "#19D24D",
        [COLOR_MODE.Dark]: "#19D24D",
      },
      [COLOR_THEME_VOLUME[160]]: {
        [COLOR_MODE.Light]: "#16BD45",
        [COLOR_MODE.Dark]: "#16BD45",
      },
      [COLOR_THEME_VOLUME.variant]: {
        [COLOR_MODE.Light]: "#A8EABC",
        [COLOR_MODE.Dark]: "#A4E9B8",
      },
    },
    [COLOR_THEME.secondary]: {
      [COLOR_THEME_VOLUME[10]]: {
        [COLOR_MODE.Light]: "#FFFEED",
        [COLOR_MODE.Dark]: "#FFFEED",
      },
      [COLOR_THEME_VOLUME[20]]: {
        [COLOR_MODE.Light]: "#FFFDDD",
        [COLOR_MODE.Dark]: "#FFFDDD",
      },
      [COLOR_THEME_VOLUME[30]]: {
        [COLOR_MODE.Light]: "#FFFCC7",
        [COLOR_MODE.Dark]: "#FFFCC7",
      },
      [COLOR_THEME_VOLUME[40]]: {
        [COLOR_MODE.Light]: "#FFFAAA",
        [COLOR_MODE.Dark]: "#FFFAAA",
      },
      [COLOR_THEME_VOLUME[70]]: {
        [COLOR_MODE.Light]: "#FFF66B",
        [COLOR_MODE.Dark]: "#FFF66B",
      },
      [COLOR_THEME_VOLUME[100]]: {
        [COLOR_MODE.Light]: "#FFF849",
        [COLOR_MODE.Dark]: "#FFF849",
      },
      [COLOR_THEME_VOLUME[110]]: {
        [COLOR_MODE.Light]: "#FCF326",
        [COLOR_MODE.Dark]: "#FCF326",
      },
      [COLOR_THEME_VOLUME[120]]: {
        [COLOR_MODE.Light]: "#FFEA2E",
        [COLOR_MODE.Dark]: "#FFEA2E",
      },
      [COLOR_THEME_VOLUME[130]]: {
        [COLOR_MODE.Light]: "#FFDF36",
        [COLOR_MODE.Dark]: "#FFDF36",
      },
      [COLOR_THEME_VOLUME[160]]: {
        [COLOR_MODE.Light]: "#F6CF00",
        [COLOR_MODE.Dark]: "#F6CF00",
      },
      [COLOR_THEME_VOLUME.variant]: {
        [COLOR_MODE.Light]: "#E4E2AF",
        [COLOR_MODE.Dark]: "#E4E2AF",
      },
    },
    [COLOR_THEME.negative]: "#FF5454",
  },
  [COLOR_TYPE.Neutral]: {
    [COLOR_NEUTRAL[100]]: {
      [COLOR_MODE.Light]: "#1B1B1C",
      [COLOR_MODE.Dark]: "#FFFFFF",
    },
    [COLOR_NEUTRAL[90]]: {
      [COLOR_MODE.Light]: "#343536",
      [COLOR_MODE.Dark]: "#F2F3F5",
    },
    [COLOR_NEUTRAL[80]]: {
      [COLOR_MODE.Light]: "#474849",
      [COLOR_MODE.Dark]: "#EBEDF0",
    },
    [COLOR_NEUTRAL[70]]: {
      [COLOR_MODE.Light]: "#717375",
      [COLOR_MODE.Dark]: "#DEE0E2",
    },
    [COLOR_NEUTRAL[40]]: {
      [COLOR_MODE.Light]: "#999B9D",
      [COLOR_MODE.Dark]: "#C4C6C9",
    },
    [COLOR_NEUTRAL[30]]: {
      [COLOR_MODE.Light]: "#C4C6C9",
      [COLOR_MODE.Dark]: "#999B9D",
    },
    [COLOR_NEUTRAL[20]]: {
      [COLOR_MODE.Light]: "#DEE0E2",
      [COLOR_MODE.Dark]: "#6E7277",
    },
    [COLOR_NEUTRAL[10]]: {
      [COLOR_MODE.Light]: "#F0F0F1",
      [COLOR_MODE.Dark]: "#46494B",
    },
    [COLOR_NEUTRAL[5]]: {
      [COLOR_MODE.Light]: "#F3F3F4",
      [COLOR_MODE.Dark]: "#343536",
    },
    [COLOR_NEUTRAL[0]]: {
      [COLOR_MODE.Light]: "#FFFFFF",
      [COLOR_MODE.Dark]: "#1B1B1C",
    },
  },
  [COLOR_TYPE.Text]: {
    [COLOR_TEXT.active]: {
      [COLOR_MODE.Light]: "#0D0D0D",
      [COLOR_MODE.Dark]: "rgba(255, 255, 255, 0.95)",
    },
    [COLOR_TEXT.darken]: {
      [COLOR_MODE.Light]: "#303030",
      [COLOR_MODE.Dark]: "rgba(0, 0, 0, 0.65)",
    },
    [COLOR_TEXT.default]: {
      [COLOR_MODE.Light]: "#565656",
      [COLOR_MODE.Dark]: "rgba(255, 255, 255, 0.75)",
    },
    [COLOR_TEXT.muted]: {
      [COLOR_MODE.Light]: "#929292",
      [COLOR_MODE.Dark]: "rgba(255, 255, 255, 0.55)",
    },
    [COLOR_TEXT.disabled]: {
      [COLOR_MODE.Light]: "#C5C5C5",
      [COLOR_MODE.Dark]: "rgba(255, 255, 255, 0.35)",
    },
    [COLOR_TEXT.lighten]: {
      [COLOR_MODE.Light]: "#FBFBFB",
      [COLOR_MODE.Dark]: "rgba(255, 255, 255, 0.95)",
    },
  },
  [COLOR_TYPE.Background]: {
    [COLOR_BACKGROUND.surface]: {
      [COLOR_MODE.Light]: "#FFFFFF",
      [COLOR_MODE.Dark]: "#121212",
    },
    [COLOR_BACKGROUND.onSurface]: {
      [COLOR_MODE.Light]: "#F2F2F2",
      [COLOR_MODE.Dark]: "#2C2C2C",
    },
    [COLOR_BACKGROUND.divider]: {
      [COLOR_MODE.Light]: "#EDEDED",
      [COLOR_MODE.Dark]: "#909092",
    },
    [COLOR_BACKGROUND.input]: {
      [COLOR_MODE.Light]: "#FAFAFA",
      [COLOR_MODE.Dark]: "#202020",
    },
    [COLOR_BACKGROUND.inputBorderDefault]: {
      [COLOR_MODE.Light]: "#E2E2E2",
      [COLOR_MODE.Dark]: "#9B9B9C",
    },
    [COLOR_BACKGROUND.inputBorderFocus]: {
      [COLOR_MODE.Light]: "#1B1B1C",
      //다크모드 토큰 없음
      [COLOR_MODE.Dark]: "",
    },
  },
  [COLOR_TYPE.ACCENT]: {
    [COLOR_ACCENT.alwaysRed]: "#FF3040",
  },
};
