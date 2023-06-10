import React, { ReactNode, useEffect, useState } from "react";
import "./heading.css";
import Timer, { TimerLabel } from "../timer/Timer";
import { WatchObserver, useFormContext } from "react-hook-form";
import { FormValues } from "../../types/meetingSchedule";
import { ChatCircle } from "@phosphor-icons/react";

type HeadingProps = {
	type?: "advice";
	children?: ReactNode;
};

type Props = {
	name: string;
	timeName: string;
} & HeadingProps;

const Heading = ({ children, type }: HeadingProps) => {
	return (
		<h2 className={`heading${type ? ` heading--${type}` : ""}`}>
			{children}
		</h2>
	);
};

const HeadingTimer = ({ children, name, timeName, type }: Props) => {
	const [isStart, setIsStart] = useState(false);
	useEffect(() => {}, []);

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
				<TimerLabel label={timeName} />
			</div>
			<Timer name={name} setIsStart={setIsStart} />
		</section>
	);
};

export default HeadingTimer;
