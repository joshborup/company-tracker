import React from "react";

export default function Layout({
  children,
  display,
  maxWidth,
  justifyContent,
  alignItems,
  flexDirection,
  margin,
  padding,
  className,
  minHeight
}) {
  const style = {
    display: display || "flex",
    maxWidth: maxWidth || "1400px",
    width: "100%",
    justifyContent: justifyContent || "center",
    alignItems: alignItems || "center",
    flexDirection: flexDirection || "row",
    margin: margin || "0px auto 0",
    padding: padding || "20px 10px",
    minHeight: minHeight || "100vh"
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
