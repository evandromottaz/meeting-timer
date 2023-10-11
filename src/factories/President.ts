import AbstractMeeting from './AbstractMeeting';

export default class President extends AbstractMeeting {
    getData(): string {
        const { pdfText, name } = this.data.president
        return `${pdfText}: ${name}`
    }
}
