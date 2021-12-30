import { ComponentClass } from "react";
import NextLink, { LinkProps } from "next/link";

interface headingProps {
  level: number;
  className?: ComponentClass;
}

export function Heading(props: React.PropsWithChildren<headingProps>) {
  switch (props.level) {
    case 1:
      return (
        <h1 className="font-sans text-4xl font-bold my-1 leading-10 tracking-tight">
          {props.children}
        </h1>
      );

    case 2:
      return (
        <h2 className="font-sans text-3xl leading-10 my-1 font-bold tracking-tight">
          {props.children}
        </h2>
      );

    case 3:
      return (
        <h3 className="font-sans text-2xl leading-10 my-1">{props.children}</h3>
      );

    default:
      return <h6 className="font-sans font-bold">{props.children}</h6>;
  }
}

interface linkProps extends LinkProps {
  className?: string;
}

export function Link(props: React.PropsWithChildren<linkProps>) {
  return (
    <NextLink prefetch={false} href={props.href}>
      <a className="text-blue-700 hover:underline">{props.children}</a>
    </NextLink>
  );
}
