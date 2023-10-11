import AbstractMeeting from './AbstractMeeting';

export default class MinistryFields extends AbstractMeeting {
    getData(): string | string[] {
        return this.data.ministryField.fields.map(({
            name, time, advice = '', pdfText = ''
        }) => {
            return `${pdfText}: ${name ? `${name} - ` : ''}Tempo: ${time}${advice ? ` - Conselho: ${advice}` : ''}  `
        })
    }

    getTitle(): string {
        return "Faça seu melhor no ministério"
    }
}
