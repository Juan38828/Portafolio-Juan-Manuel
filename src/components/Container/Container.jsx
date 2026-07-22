/**
 * Container
 * Centra el contenido y controla el padding horizontal en cada breakpoint,
 * evitando espacios muertos o contenido pegado a los bordes.
 */
const Container = ({ children, className = "", as: Tag = "div", ...rest }) => {
  return (
    <Tag
      className={`w-full mx-auto px-5 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 max-w-[1400px] ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Container;
