import React, { ReactNode } from "react";
import "./heading.css";
import Timer, { TimerLabel } from "../timer/Timer";
import { WatchObserver, useFormContext } from "react-hook-form";
import { FormValues } from "../../types/meetingSchedule";

type Props = { children?: ReactNode; name: string; timeName: string };

const Heading = ({ children }: { children?: ReactNode }) => {
	return <h2 className="heading">{children}</h2>;
};

const HeadingTimer = ({ children, name, timeName }: Props) => {
	return (
		<section className="row">
			<div className="heading-row">
				<Heading>{children}</Heading>
				<TimerLabel label={timeName} />
			</div>
			<Timer name={name} />
		</section>
	);
};

export default HeadingTimer;
