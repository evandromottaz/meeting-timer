import { ReactNode, useState } from "react";
import "./heading.css";
import Timer, { TimerLabel } from "../timer/Timer";
import { useFormContext } from "react-hook-form";
import { ChatCircle } from "@phosphor-icons/react";

type HeadingProps = {
	type?: "advice";
	children?: ReactNode;
};

type Props = {
	name: string;
	recordZero?: boolean;
} & HeadingProps;

const Heading = ({ children, type }: HeadingProps) => {
	return (
		<h2 className={`m-0 heading${type ? ` heading--${type}` : " ps-3"}`}>
			{children}
		</h2>
	);
};

const HeadingTimer = ({ children, name, type, recordZero }: Props) => {
	const { watch } = useFormContext();
	const watchTime = watch(name);
	const [isStart, setIsStart] = useState(false);

	return (
		<section className="d-flex align-items-center">
			<div className="d-flex position-relative align-items-center w-100">
				{type ? (
					<div className="heading__advice">
						<Heading type={type}>{children}</Heading>
						<span
							className={`heading__chat${isStart ? "" : " heading__chat--paused"}`}
							aria-hidden="true"
						>
							<ChatCircle size={32} weight="fill" />
						</span>
					</div>
				) : (
					<Heading>{children}</Heading>
				)}
				<TimerLabel label={watchTime || "00:00"} style={{ paddingRight: "1rem" }} />
			</div>
			<Timer name={name} setIsStart={setIsStart} defaultTime={watchTime} recordZero={recordZero} />
		</section>
	);
};

export default HeadingTimer;
