import { FC, HTMLProps, ReactNode } from "react";
import "./button.css";

type Props = {
	children: ReactNode;
	type?: "button" | "submit" | "reset";
} & HTMLProps<HTMLButtonElement>;

const Button: FC<Props> = ({
	children,
	type = "button",
	className,
	...props
}) => {
	return (
		<button type={type} className={"button " + className} {...props}>
			{children}
		</button>
	);
};

export default Button;
