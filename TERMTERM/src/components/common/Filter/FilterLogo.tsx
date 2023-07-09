import React from "react";
import { SvgXml } from "react-native-svg";

interface LogoProps {
  color?: string;
}

const FilterLogo: React.FC<LogoProps> = ({ color = "#1B1B1C" }) => {
  const logo = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="12" viewBox="0 0 17 12" fill="none">
  <path d="M9.75 10C10.1642 10 10.5 10.3358 10.5 10.75C10.5 11.1642 10.1642 11.5 9.75 11.5H6.75C6.3358 11.5 6 11.1642 6 10.75C6 10.3358 6.3358 10 6.75 10H9.75ZM12.75 5C13.1642 5 13.5 5.3358 13.5 5.75C13.5 6.1642 13.1642 6.5 12.75 6.5H3.75C3.33579 6.5 3 6.1642 3 5.75C3 5.3358 3.33579 5 3.75 5H12.75ZM15.75 0C16.1642 0 16.5 0.33579 16.5 0.75C16.5 1.16421 16.1642 1.5 15.75 1.5H0.75C0.33579 1.5 0 1.16421 0 0.75C0 0.33579 0.33579 0 0.75 0H15.75Z" fill="${color}"/>
  </svg>`;
  return <SvgXml xml={logo} />;
};

export default FilterLogo;
