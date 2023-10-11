import AbstractMeeting from './AbstractMeeting';

export default class FirstComments extends AbstractMeeting {
    getData(): string {
        const { time, pdfText } = this.data.comments.initial
        return `${pdfText}: ${time}`
    }
}
