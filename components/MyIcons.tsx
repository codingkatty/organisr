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
    <View style={{ width: Number(width), height: Number(height) }}>
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

const ThemeIcon = (props: SvgProps) => {
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
          d="M30 10h10v10H30zM20 20h10v10H20zM10 30h10v10H10zM10 40h10v10H10zM10 50h10v10H10zM20 60h10v10H20zM40 60h10v10H40zM40 70h10v10H40zM50 80h10v10H50zM60 80h10v10H60zM70 80h10v10H70zM80 70h10v10H80zM80 60h10v10H80zM80 50h10v10H80zM40 10h10v10H40zM50 10h10v10H50zM60 10h10v10H60zM70 20h10v10H70zM80 30h10v10H80zM80 40h10v10H80zM50 30h10v10H50zM50 40h10v10H50zM60 40h10v10H60zM60 50h10v10H60zM50 50h10v10H50zM40 30h10v10H40z"
        />
        <Path
          fill={color}
          d="M75 75h10v10H75zM25 15h10v10H25zM25 55h20v10H25zM65 15h10v10H65zM75 25h10v10H75z"
        />
      </Svg>
    </View>
  )
}

const EditIcon = (props: SvgProps) => {
  const { width = 40, height = 40, color = "#D087FF", style, ...otherProps } = props;
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
          d="M60 10h10v10H60zM40 60h10v10H40zM35 70h35v10H35zM60 60h10v10H60zM45 30h10v20H45zM50 10h10v20H50zM70 10h10v30H70zM40 50h10v10H40zM20 10h20v10H20zM65 40h10v20H65z"
        />
        <Path
          fill={color}
          d="M30 75h20v10H30zM90 10h10v90H90zM20 90h70v10H20zM10 10h10v90H10z"
        />
      </Svg>
    </View>
  )
}

const DeleteIcon = (props: SvgProps) => {
  const { width = 40, height = 40, color = "#D087FF", style, ...otherProps } = props;
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
          d="M30 20h10v10H30zM35 45h5v20h-5zM70 45h5v20h-5zM40 60h5v30h-5zM65 60h5v30h-5zM90 35h10v35H90zM15 65h10v10H15z"
        />
        <Path fill={color} d="M85 65h10v10H85z" />
        <Path
          fill={color}
          d="M80 70h10v20H80zM20 90h70v10H20zM20 70h10v20H20zM10 35h10v35H10zM70 20h10v10H70zM30 10h50v10H30z"
        />
        <Path fill={color} d="M10 25h90v15H10z" />
      </Svg>
    </View>
  )
}

const CloseIcon = (props: SvgProps) => {
  const { width = 40, height = 40, color = "#D087FF", style, ...otherProps } = props;
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
          d="M40 40h10v10H40zM30 30h10v10H30zM50 30h10v10H50zM30 50h10v10H30zM50 50h10v10H50zM60 20h10v10H60zM20 20h10v10H20zM20 60h10v10H20zM60 60h10v10H60zM70 10h10v10H70zM10 10h10v10H10zM10 70h10v10H10zM70 70h10v10H70z"
        />
      </Svg>
    </View>
  )
}

const CollapseIcon = (props: SvgProps & { rotate?: string }) => {
  const { width = 40, height = 40, color = "#AAA", style, rotate = "0deg", ...otherProps } = props;
  return (
    <View style={{ width: Number(width), height: Number(height), transform: [{ rotate: rotate }] }}>
      <Svg
        width="100%"
        height="100%"
        fill="none"
        viewBox="0 0 100 100"
        {...otherProps}
      >
        <Path
          fill={color}
          d="M10 30h10v15H10zM40 60h20v10H40zM80 30h10v15H80zM20 40h10v10H20zM70 40h10v10H70zM60 50h15v10H60zM25 50h15v10H25z"
        />
      </Svg>
    </View>
  )
}

export { FilterIcon, HomeIcon, SearchIcon, AddIcon, NewIcon, ThemeIcon, EditIcon, DeleteIcon, CloseIcon, CollapseIcon };