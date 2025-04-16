import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
import { View } from "react-native"

const FilterIcon = (props: SvgProps) => {
  return (
    <Svg
      width={props.width || 50}
      height={props.height || 50}
      fill="none"
      viewBox="0 0 100 100"
      {...props}
    >
      <Path
        fill={props.color || "#D0B7FF"}
        d="M40 40h10v40H40zM30 30h10v10H30zM50 30h10v10H50zM20 20h15v10H20zM55 20h15v10H55zM10 10h15v10H10zM65 10h15v10H65z"
      />
      <Path fill={props.color || "#D0B7FF"} d="M35 37h20v10H35z" />
    </Svg>
  );
}

const NewIcon = (props: SvgProps) => {
  return (
    <Svg
      width={props.width || 50}
      height={props.height || 50}
      fill="none"
      viewBox="0 0 100 100"
      {...props}
    >
      <Path fill={props.color || "#D0B7FF"} d="M40 10h10v70H40z" />
      <Path fill={props.color || "#D0B7FF"} d="M10 40h70v10H10z" />
    </Svg>
  );
}

const HomeIcon = (props: SvgProps) => {
  const { width = 40, height = 40, color = "#D0B7FF", style, ...otherProps } = props;
  return (
    <View style={{ width: Number(width), height: Number(height) }}>
      <Svg
        width="100%"
        height="100%"
        fill="none"
        viewBox="0 0 100 100"
        {...otherProps}
      >
        <Path
          fill={color}
          d="M20 30h10v10H20zM30 20h15v10H30zM40 10h10v10H40zM50 10h10v10H50zM55 20h15v10H55zM70 30h10v10H70zM60 30h10v10H60zM30 30h10v10H30zM80 40h10v15H80zM10 40h10v15H10zM20 40h10v10H20zM70 40h10v10H70zM70 50h10v10H70zM20 50h10v10H20zM20 60h10v10H20zM70 60h10v10H70zM20 70h10v10H20zM20 80h10v10H20zM70 70h10v10H70zM70 80h10v10H70zM30 80h10v10H30zM40 80h10v10H40zM50 80h10v10H50zM60 80h10v10H60z"
        />
      </Svg>
    </View>
  )
};

const SearchIcon = (props: SvgProps) => {
  const { width = 40, height = 40, color = "#D0B7FF", style, ...otherProps } = props;
  return (
    <View style={{ width: Number(width), height: Number(height) }}>
      <Svg
        width="100%"
        height="100%"
        fill="none"
        viewBox="0 0 100 100"
        {...otherProps}
      >
        <Path
          fill={color}
          d="M20 10h10v10H20zM30 10h10v10H30zM40 10h10v10H40zM50 20h10v10H50zM10 20h10v10H10zM10 30h10v10H10zM50 30h10v10H50zM10 40h10v10H10zM20 50h10v10H20zM50 40h10v10H50zM30 50h10v10H30zM40 50h10v10H40zM50 50h10v10H50z"
        />
        <Path fill={color} d="M45 45h10v10H45zM55 55h10v10H55z" />
        <Path fill={color} d="M63 62h10v10H63z" />
        <Path fill={color} d="M68 67h10v10H68z" />
        <Path
          fill={color}
          d="M75 75h10v10H75zM45 15h10v10H45zM15 15h10v10H15zM15 45h10v10H15z"
        />
      </Svg>
    </View>
  )
}

const AddIcon = (props: SvgProps) => {
  const { width = 40, height = 40, color = "#D0B7FF", style, ...otherProps } = props;
  return (
    <View>
      <Svg
        width="100%"
        height="100%"
        fill="none"
        viewBox="0 0 100 100"
        {...otherProps}
      >
        <Path fill={color} d="M10 42h80v15H10z" />
        <Path fill={color} d="M42 10h15v80H42z" />
        <Path
          fill={color}
          d="M35 35h10v10H35zM55 35h10v10H55zM35 55h10v10H35zM55 55h10v10H55z"
        />
      </Svg>
    </View>
  )
}

export { FilterIcon, HomeIcon, SearchIcon, AddIcon, NewIcon };