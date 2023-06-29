import { FormProvider, useForm } from "react-hook-form";
import { meetingSchedule } from "../../constants/schedule";
import usePDF from "../../hooks/usePDF";
import { ReactNode, useRef } from "react";

export const Form = ({ children }: { children: ReactNode }) => {
	const methods = useForm({ defaultValues: meetingSchedule });
	const { handleSubmit } = methods;
	const screenRef = useRef(null);
	const renderPDF = usePDF();

	return (
		<FormProvider {...methods}>
			<form ref={screenRef} onSubmit={handleSubmit(renderPDF)}>
				{children}
			</form>
		</FormProvider>
	);
};

export default Form;
