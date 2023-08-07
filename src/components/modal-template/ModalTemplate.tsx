import { XCircle } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "../button/Button";
import { ChangeEventHandler } from "react";
import { meetingSchedule } from "../../constants/schedule";
import "./modal-template.css";

interface ModalTemplateProps {
	onChange: ChangeEventHandler<HTMLSelectElement>;
}

const ModalTemplate = ({ onChange }: ModalTemplateProps) => {
	const { bibleStudy, firstMeeting, secondMeeting, video } =
		meetingSchedule.ministryFields.templates;
	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<Button>Escolher qual tipo de parte</Button>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className="dialog__overlay" />

				<Dialog.Content className="dialog__content">
					<Dialog.Title
						className="heading"
						style={{ marginBottom: "1rem" }}
					>
						Escolha qual parte adicionar
					</Dialog.Title>

					<select onChange={onChange}>
						<option label={video.pdfText}></option>

						<option label={firstMeeting.pdfText}></option>

						<option label={secondMeeting.pdfText}></option>

						<option label={bibleStudy.pdfText}></option>
					</select>

					<Dialog.Close asChild>
						<Button>Adicionar</Button>
					</Dialog.Close>

					<Dialog.Close asChild>
						<XCircle size={32} color="#ffffff" />
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default ModalTemplate;
