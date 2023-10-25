export const themeSetting = (mode) => {
  return {
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            cursor: "pointer",
            color: mode === "dark" ? "#E4F1FF" : "#27005D",
          },
        },
      },

      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: mode === "dark" ? "#FFFD8C" : "#9400FF",
            fontSize: "26px",
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableFocusRipple: true,
          disableElevation: true,
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            color: mode === "dark" ? "#000" : "#fff",
          },
        },
      },
    },

    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              dark: "#E4F1FF",
              main: "#FFFD8C",
              light: "#FFFD8C",
            },
            neutral: {
              dark: "#E4F1FF",
              main: "#AED2FF",
              light: "#0f172a",
              text: "#FFF",
            },
            background: {
              default: "#0f172a",
              alt: "#132036",
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: "#9400FF",
              main: "#27005D",
              light: "#E4F1FF",
            },
            neutral: {
              dark: "#27005D",
              main: "#AED2FF",
              light: "#f1f5f9",
              text: "#9400FF",
            },
            background: {
              default: "#E4F1FF",
              alt: "#FFF",
            },
          }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
