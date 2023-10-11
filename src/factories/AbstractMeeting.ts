import { FormValuesProps } from "../types/meetingSchedule";

export default abstract class AbstractMeeting {
    data: FormValuesProps;

    constructor(data: FormValuesProps, y: number = 10) {
        this.data = data
    }

    abstract getData(): string | string[]

    getTitle() {
        return ''
    }
}
