import { XCircle } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import "./modal-template.css";
import { useState } from 'react'
import { limitTimeType, pdfTextType } from "../../types/meetingSchedule";

type optionsType = limitTimeType & pdfTextType
interface ModalChristianLifeProps {
	chooseTemplate: (options: optionsType) => void;
}

const ModalChristianLife = ({ chooseTemplate }: ModalChristianLifeProps) => {
	const [inputs, setInputs] = useState<optionsType>({})
	const [isBibleStudy, setIsBibleStudy] = useState(true)
	const isInputsValid = (Boolean(inputs.limitTime) === false || Boolean(inputs.pdfText) === false)

	const isDisabledButton = !isBibleStudy && isInputsValid

	return (
		<Dialog.Root>
			<Dialog.Trigger onClick={() => setIsBibleStudy(true)} className="btn btn-success button" style={{ fontWeight: "bold" }}>
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

					<select  className="form-select" onChange={(e) => setIsBibleStudy(e.target.selectedIndex === 0)}>
						<option defaultValue={0}>
                            Estudo Bíblico
                        </option>

                        <option>
                            Outra parte
                        </option>
					</select>

                    {!isBibleStudy && 
						<div>
							<input onChange={e => setInputs(prevState => ({...prevState, pdfText:e.target.value}))} className="form-control text-dark  border-0 ps-3 mt-3 fs-5" placeholder="Nome da parte" />

							<input onChange={e => setInputs(prevState => ({...prevState, limitTime:e.target.value}))} className="form-control border-0 ps-3 mt-3 text-dark fs-5 " type="number" placeholder="Tempo da parte" />
						</div>
					}

					<Dialog.Close disabled={isDisabledButton} style={{ fontWeight:'bold' }} className="btn btn-success my-3 button" onClick={() => {
						chooseTemplate(inputs)
						setInputs({})
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

export default ModalChristianLife;
