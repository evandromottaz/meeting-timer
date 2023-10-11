import { XCircle } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import { useRef } from "react";
import { meetingSchedule } from "../../constants/schedule";
import "./modal-template.css";

interface ModalTemplateProps {
	chooseTemplate: (selectIndex: number) => void;
}

const ModalTemplate = ({ chooseTemplate }: ModalTemplateProps) => {
	const { bibleStudy, firstMeeting, secondMeeting, video } =
		meetingSchedule.ministryField.templates;
	const selectRef = useRef<HTMLSelectElement>(null)

	return (
		<Dialog.Root>
			<Dialog.Trigger className="btn btn-success button" style={{ fontWeight: "bold" }}>
				Adicionar parte
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

					<select ref={selectRef} className="form-select ">
						<option defaultValue={0}>{video.pdfText}</option>

						<option>{firstMeeting.pdfText}</option>

						<option>{secondMeeting.pdfText}</option>

						<option>{bibleStudy.pdfText}</option>
					</select>

					<Dialog.Close className="btn btn-success my-3  button" onClick={() => {
						selectRef.current && chooseTemplate(selectRef.current.selectedIndex)
					}}>
						Adicionar
					</Dialog.Close>

					<Dialog.Close className="btn position-absolute right-0 top-0 p-0">
						<XCircle size={32} color="#ffffff" />
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default ModalTemplate;
