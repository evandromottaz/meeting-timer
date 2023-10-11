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
			className="input__element bg-transparent border-0 ps-3 text-light mt-3"
			{...register(name)}
			{...props}
		/>
	);
};

const InputPlaceholder = ({ placeholder = "" }) => {
	return <span className="input__placeholder position-absolute ms-3 z-1 text-light">{placeholder}</span>;
};

const Input = ({ placeholder, className, ...props }: InputProps) => {
	return (
		<article className={`input d-grid align-items-center overflow-hidden position-relative w-100 ${className}`}>
			<InputElement {...props} />
			<InputPlaceholder placeholder={placeholder} />
		</article>
	);
};

export const InputTimer = ({ timerName, ...props }: InputTimerProps) => {
	const { watch } = useFormContext();
	const watchTime = watch(timerName);

	return (
		<section className="d-flex align-items-center position-relative w-100">
			<Input {...props} />
			<TimerLabel label={watchTime} />
		</section>
	);
};

export default Input;
