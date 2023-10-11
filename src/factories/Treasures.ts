import AbstractMeeting from './AbstractMeeting';

export default class Treasures extends AbstractMeeting {
    getData(): string | string[] {
        const [pdfText, ...values] = Object.values(this.data.treasures)
        return values.map(({ pdfText = '', name = '', time = '' }) => {
            return `${pdfText}: ${name ? `${name} - ` : ''}Tempo: ${time}`
        })
    }

    getTitle(): string {
        return "Tesouros da Palavra de Deus"
    }
}
