import { FormProvider, useForm } from "react-hook-form";
import { meetingSchedule } from "../../constants/schedule";
import Treasures from "../../templates/Treasures";
import ChristianLife from "../../templates/ChristianLife";
import MinistryField from "../../templates/MinistryField";
import Input from "../input/Input";
import Fieldset from "../fieldset/Fieldset";
import Heading from "../heading/Heading";
import Button from "../button/Button";
import { FileText } from "@phosphor-icons/react";

const Form = () => {
	const methods = useForm({ defaultValues: meetingSchedule });
	const { handleSubmit, watch } = methods;
	const initialWatched = watch("initialComments");
	const finalWatched = watch("finalComments");

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit((data) => console.log(data))}>
				<Fieldset>
					<Input name="president" placeholder="Presidente" />
					<Heading timeName={initialWatched} name="initialComments">
						Comentários Iniciais
					</Heading>
				</Fieldset>

				<Treasures />

				<MinistryField />

				<ChristianLife />

				<Heading timeName={finalWatched} name="finalComments">
					Comentários Finais
				</Heading>

				<Button type="submit">
					<span>Gerar PDF</span>
					<FileText size={40} />
				</Button>
			</form>
		</FormProvider>
	);
};

export default Form;
