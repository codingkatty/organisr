import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

const FilterIcon = (props: SvgProps) => {  
  return (
    <Svg
      width="auto"
      height={50}
      fill="none"
      viewBox="0 0 100 100"
      {...props}
    >
      <Path
        fill="#D0B7FF"
        d="M20 20h10v10H20zM30 20h10v10H30zM40 20h10v10H40zM50 20h10v10H50zM60 20h10v10H60zM70 20h10v10H70zM20 40h10v10H20zM30 40h10v10H30zM40 40h10v10H40zM50 40h10v10H50zM60 40h10v10H60zM70 40h10v10H70zM20 70h10v10H20zM30 70h10v10H30zM40 70h10v10H40zM50 70h10v10H50zM60 70h10v10H60zM70 70h10v10H70z"
      />
    </Svg>
  );
}

export default FilterIcon;