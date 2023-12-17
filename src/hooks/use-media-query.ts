import { useTheme } from "@mui/material/styles";
import { useMediaQuery as useMaterialMediaQuery } from "@mui/material";

export const useMediaQuery = () => {
  const theme = useTheme();
  const isLessThanSmScreen = useMaterialMediaQuery(
    theme.breakpoints.down("sm")
  );

  return {
    isLessThanSmScreen,
  };
};
