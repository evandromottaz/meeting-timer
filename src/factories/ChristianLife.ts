import AbstractMeeting from './AbstractMeeting';

export default class ChristianLife extends AbstractMeeting {

    getData(): string | string[] {
        console.log(this.data.christianLife.fields)
        return this.data.christianLife.fields.map(({
            name, time, pdfText = ''
        }) => {
            return `${pdfText}: ${name} - Tempo: ${time}`
        })
    }

    getTitle(): string {
        return "Nossa Vida Cristã"
    }
}
