import AbstractMeeting from './AbstractMeeting';

export default class MeetingEnd extends AbstractMeeting {
    getData(): string {
        const { end } = this.data.meeting
        return `${end.pdfText}: ${end.time}`
    }
}
