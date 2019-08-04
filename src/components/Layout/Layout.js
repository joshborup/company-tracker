import React from "react";

export function Layout({
  children,
  display,
  maxWidth,
  justifyContent,
  alignItems,
  flexDirection,
  margin,
  padding,
  className
}) {
  const style = {
    display: display || "flex",
    maxWidth: maxWidth || "1100px",
    justifyContent: justifyContent || "center",
    alignItems: alignItems || "center",
    flexDirection: flexDirection || "row",
    margin: margin || "0px auto 0",
    padding: padding || "20px 10px",
    minHeight: "100vh"
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
