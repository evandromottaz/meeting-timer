import React, { FC, ReactNode } from "react";
import "./fieldset.css";

type Props = { title?: string; children?: ReactNode };

const Fieldset: FC<Props> = ({ title = "", children }) => {
	return (
		<fieldset className="fieldset">
			{title && <legend className="fieldset__title">{title}</legend>}
			{children}
		</fieldset>
	);
};

export default Fieldset;
