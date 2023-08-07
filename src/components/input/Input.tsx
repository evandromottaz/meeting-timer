import { InputHTMLAttributes } from "react";
import { TimerLabel } from "../timer/Timer";
import "./input.css";
import { useFormContext } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

interface InputTimerProps extends InputProps {
	timerName: string;
}

export const InputElement = ({
	name = "",
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

const InputPlaceholder = ({ placeholder = "" }) => {
	return <span className="input__placeholder">{placeholder}</span>;
};

const Input = ({ placeholder, ...props }: InputProps) => {
	return (
		<article className="input">
			<InputElement {...props} />
			<InputPlaceholder placeholder={placeholder} />
		</article>
	);
};

export const InputTimer = ({ timerName, ...props }: InputTimerProps) => {
	const { watch } = useFormContext();
	const watchTime = watch(timerName);

	return (
		<section className="input-row">
			<Input {...props} />
			<TimerLabel label={watchTime} />
		</section>
	);
};

export default Input;
