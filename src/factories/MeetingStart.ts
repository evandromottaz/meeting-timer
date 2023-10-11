import AbstractMeeting from './AbstractMeeting';

export default class MeetingStart extends AbstractMeeting {
    getData(): string {
        const { start } = this.data.meeting
        return `${start.pdfText}: ${start.time}`
    }

    getTitle(): string {
        return ' '
    }
}
