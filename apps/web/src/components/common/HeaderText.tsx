"use client";

interface HeaderTextProps {
  textalign?: string;
  heading: string;
  textcolor?: string;
  className?: string;
}

const HeaderText = ({
  textalign = "text-center",
  heading,
  textcolor,
  className = "",
}: HeaderTextProps) => {
  return (
    <h2
      className={`
      text-xl md:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6
      ${textalign} 
      ${className}
    `}
    >
      {heading}
    </h2>
  );
};

export default HeaderText;
