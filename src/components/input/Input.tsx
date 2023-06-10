import { InputHTMLAttributes } from "react";
import { TimerLabel } from "../timer/Timer";
import "./input.css";
import { useFormContext } from "react-hook-form";

type Placeholder = { placeholder: string };

interface IInput {
	name: string;
	placeholder: string;
}

interface IInputTimer {
	name: string;
	timeName: string;
	placeholder: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
}

export const InputElement = ({
	name,
	required = true,
	...props
}: InputProps) => {
	const { register } = useFormContext();

	return (
		<input
			required={required}
			className="input__element"
			{...register(name)}
			{...props}
		/>
	);
};

const InputPlaceholder = ({ placeholder }: Placeholder) => {
	return <span className="input__placeholder">{placeholder}</span>;
};

const Input = ({ placeholder, name, ...props }: IInput) => {
	return (
		<article className="input">
			<InputElement name={name} {...props} />
			<InputPlaceholder placeholder={placeholder} />
		</article>
	);
};

export const InputTimer = ({
	placeholder,
	name,
	timeName,
	...props
}: IInputTimer) => {
	return (
		<section className="input-row">
			<Input placeholder={placeholder} name={name} {...props} />
			<TimerLabel label={timeName} />
		</section>
	);
};

export default Input;
