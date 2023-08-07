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
} & HeadingProps;

const Heading = ({ children, type }: HeadingProps) => {
	return (
		<h2 className={`heading${type ? ` heading--${type}` : ""}`}>
			{children}
		</h2>
	);
};

const HeadingTimer = ({ children, name, type }: Props) => {
	const { watch } = useFormContext();
	const watchTime = watch(name);
	const [isStart, setIsStart] = useState(false);

	return (
		<section className="row">
			<div className="heading-row">
				{type ? (
					<div
						className={`heading__chat ${
							isStart ? "" : "heading__chat--paused"
						}`}
					>
						<Heading type={type}>{children}</Heading>
						<ChatCircle
							size={32}
							color="#ffffff"
							weight="fill"
							style={{
								position: "absolute",
								top: "-20px",
								right: "-40px",
							}}
						/>
					</div>
				) : (
					<Heading>{children}</Heading>
				)}
				<TimerLabel label={watchTime} />
			</div>
			<Timer name={name} setIsStart={setIsStart} />
		</section>
	);
};

export default HeadingTimer;
