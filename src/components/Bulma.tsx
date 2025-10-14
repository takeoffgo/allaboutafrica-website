import { css } from "../lib/util";

type ContainerProps = {
  children?: React.ReactNode;
  className?: string;
};

type ColumnsProps = ContainerProps & {
  centred?: boolean;
  vcentred?: boolean;
  multiline?: boolean;
  gapless?: boolean;
};

export const Columns: React.FC<ColumnsProps> = ({
  children,
  centred,
  vcentred,
  multiline,
  gapless,
}) => (
  <div
    className={css({
      columns: true,
      "is-centered": centred,
      "is-vcentered": vcentred,
      "is-gapless": gapless,
      "is-multiline": multiline,
    })}
  >
    {children}
  </div>
);

type ColumnProps = ContainerProps & {
  width?: number;
  narrow?: boolean;
};

export const Column: React.FC<ColumnProps> = ({
  children,
  width,
  narrow,
  className,
}) => (
  <div
    className={css({
      column: true,
      [`is-${width}`]: width,
      "is-narrow": narrow,
      [`${className}`]: className,
    })}
  >
    {children}
  </div>
);

export const Content: React.FC<ContainerProps> = ({ children }) => (
  <div className="content">{children}</div>
);

export const BrandLine: React.FC = () => <hr className="brand" />;

type SectionProps = ContainerProps & {
  container?: boolean;
};

export const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className={css({ container: true })}>{children}</div>
);

export const Section: React.FC<SectionProps> = ({
  children,
  container,
  className,
}) => (
  <section
    className={css({
      section: true,
      container,
      ...(className ? { [className]: true } : {}),
    })}
  >
    {children}
  </section>
);

export const Buttons: React.FC<ContainerProps> = ({ children }) => (
  <div className="buttons">{children}</div>
);

type ButtonProps = ContainerProps & {
  href: string;
  dark?: boolean;
  text?: boolean;
  large?: boolean;
  iconRight?: string;
  iconLeft?: string;
  rounded?: boolean;
};

export const LinkButton: React.FC<ButtonProps> = ({
  dark,
  text,
  large,
  iconRight,
  iconLeft,
  href,
  rounded,
  children,
  className,
}) => (
  <a
    className={css({
      button: true,
      "is-dark": dark,
      "is-text": text,
      "is-large": large,
      "is-rounded": rounded,
      [className!]: className,
    })}
    href={href}
  >
    {iconLeft ? (
      <span className="icon">
        <i className={`fas fa-${iconLeft}`} />
      </span>
    ) : null}
    {children ? <span>{children}</span> : null}
    {iconRight ? (
      <span className="icon">
        <i className={`fas fa-${iconRight}`} />
      </span>
    ) : null}
  </a>
);

export const Box: React.FC<ContainerProps> = ({ children }) => (
  <div className="box">{children}</div>
);

export const Message: React.FC<ContainerProps> = ({ children, className }) => (
  <div className={css({ message: true, [className as string]: className })}>
    {children}
  </div>
);

export const MessageHeader: React.FC<ContainerProps> = ({ children }) => (
  <div className="message-header">{children}</div>
);

export const MessageBody: React.FC<ContainerProps> = ({ children }) => (
  <div className="message-body">{children}</div>
);
