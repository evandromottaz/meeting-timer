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
	defaultTime?: string;
	recordZero?: boolean;
}

const Timer = ({
	style,
	name,
	setIsStart,
	defaultTime,
	recordZero = true,
	...inputProps
}: TimerProps) => {
	const { label, start, setStart } = useTimer({ defaultTime });
	const { setValue } = useFormContext();
	const shouldRecord = recordZero || label !== "00:00";

	function handleTime() {
		setStart(!start);
		if (setIsStart) setIsStart(!start);
	}

	useEffect(() => {
		if (shouldRecord) setValue(name, label);
	}, [label, shouldRecord]);

	return (
		<article className="timer" style={{ ...style }}>
			{shouldRecord && (
				<InputElement
					name={name}
					{...inputProps}
					value={label}
					required={false}
					hidden
				/>
			)}
			<IconContext.Provider
				value={{
					color: "var(--timer-icon)",
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
		<label
			className="timer__label text-body position-absolute "
			style={{ ...style }}
			{...props}
		>
			{label}
		</label>
	);
};

export default Timer;
