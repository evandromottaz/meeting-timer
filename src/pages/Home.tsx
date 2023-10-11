import Form from "../components/form/Form";
import Fieldset from "../components/fieldset/Fieldset";
import Input from "../components/input/Input";
import HeadingTimer from "../components/heading/Heading";
import Treasures from "../templates/Treasures";
import Button from "../components/button/Button";
import { FileText } from "@phosphor-icons/react";
import { QUERY } from "../constants/query";
import MinistryField from "../templates/MinistryField";
import ChristianLife from "../templates/ChristianLife";

export const Home = () => {
	return (
		<Form>
			<Fieldset>
				<Input
					name={QUERY.PRESIDENT}
					placeholder="Presidente"
				/>
				<Input
					name={QUERY.MEETING.START}
					placeholder="Horário que a reunião começou"
				/>
				<HeadingTimer name={QUERY.COMMENTS.INITIAL}>
					Comentários Iniciais
				</HeadingTimer>
			</Fieldset>

			<Treasures />

			<MinistryField />

			<ChristianLife />

			<HeadingTimer name={QUERY.COMMENTS.END}>
				Comentários Finais
			</HeadingTimer>

			<Input className="mt-3"
				name={QUERY.MEETING.END}
				placeholder="Horário que a reunião acabou"
			/>

			<Button type="submit" className="text-light">
				<span>Gerar PDF</span>
				<FileText size={40} />
			</Button>
		</Form>
	);
};
