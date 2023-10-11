import "./timer.css";
import { IconContext, Pause, Play } from "@phosphor-icons/react";
import useTimer from "../../hooks/useTimer";
import { InputElement } from "../input/Input";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

interface TimerProps {
	style?: object;
	name: string;
	setIsStart?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Timer = ({ style, name, setIsStart, ...inputProps }: TimerProps) => {
	const { label, start, setStart } = useTimer();
	const { setValue } = useFormContext();

	function handleTime() {
		setStart(!start);
		if (setIsStart) setIsStart(!start);
	}

	useEffect(() => {
		setValue(name, label);
	}, [label]);

	return (
		<article className="timer" style={{ ...style }}>
			<InputElement
				name={name}
				{...inputProps}
				value={label}
				required={false}
				hidden
			/>
			<IconContext.Provider
				value={{
					color: "var(--jw-color)",
					size: 50,
					weight: "duotone",
					onClick: handleTime,
				}}
			>
				{start ? <Pause /> : <Play />}
			</IconContext.Provider>
		</article>
	);
};

export const TimerLabel = ({
	label,
	style,
	...props
}: {
	label: string;
	style?: object;
}) => {
	return (
		<label className="timer__label text-light position-absolute " style={{ ...style }} {...props}>
			{label}
		</label>
	);
};

export default Timer;
