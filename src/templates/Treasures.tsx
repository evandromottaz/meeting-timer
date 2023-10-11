import { InputTimer } from "../components/input/Input";
import Fieldset from "../components/fieldset/Fieldset";
import Timer from "../components/timer/Timer";
import { QUERY } from "../constants/query";

const Treasures = () => {
	return (
		<Fieldset title="Tesouros da Palavra de Deus">
			<section className="d-flex">
				<InputTimer
					name={QUERY.TREASURES.TREASURE.NAME}
					timerName={QUERY.TREASURES.TREASURE.TIME}
					placeholder="Orador"
				/>
				<Timer name={QUERY.TREASURES.TREASURE.TIME} />
			</section>

			<section className="d-flex">
				<InputTimer
					name={QUERY.TREASURES.FIND_TREASURES.NAME}
					timerName={QUERY.TREASURES.FIND_TREASURES.TIME}
					placeholder="Dirigente"
				/>
				<Timer name={QUERY.TREASURES.FIND_TREASURES.TIME} />
			</section>
		</Fieldset>
	);
};

export default Treasures;
