import Form from "../components/form/Form";
import Fieldset from "../components/fieldset/Fieldset";
import Input from "../components/input/Input";
import HeadingTimer from "../components/heading/Heading";
import Treasures from "../templates/Treasures";
import Button from "../components/button/Button";
import { FileText } from "@phosphor-icons/react";
import { meetingSchedule } from "../constants/schedule";
import { QUERY } from "../constants/query";
import MinistryField from "../templates/MinistryField";
import ChristianLife from "../templates/ChristianLife";

export const Home = () => {
	return (
		<Form>
			<Fieldset>
				<Input
					name={QUERY.PRESIDENT}
					placeholder={meetingSchedule.president.placeholder}
				/>
				<Input
					name={QUERY.MEETING.START}
					placeholder={meetingSchedule.meeting.start.placeholder}
				/>
				<HeadingTimer name={QUERY.COMMENTS.INITIAL}>
					{meetingSchedule.comments.initial.placeholder}
				</HeadingTimer>
			</Fieldset>

			<Treasures />

			<MinistryField />

			<ChristianLife />

			<HeadingTimer name={QUERY.COMMENTS.END}>
				{meetingSchedule.comments.end.placeholder}
			</HeadingTimer>

			<Input
				name={QUERY.MEETING.END}
				placeholder={meetingSchedule.meeting.end.placeholder}
			/>

			<Button type="submit">
				<span>Gerar PDF</span>
				<FileText size={40} />
			</Button>
		</Form>
	);
};
