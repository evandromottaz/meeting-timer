import { FC, ReactNode } from "react";
import "./fieldset.css";

type Props = { title?: string; children?: ReactNode };

const Fieldset: FC<Props> = ({ title = "", children }) => {
	return (
		<fieldset className="row-cols-1 border-0 d-flex flex-column 2 my-3" style={{ gap: "1rem" }}>
			{title && <legend className="fieldset__title w-100 p-3 text-light m-0">{title}</legend>}
			{children}
		</fieldset>
	);
};

export default Fieldset;
