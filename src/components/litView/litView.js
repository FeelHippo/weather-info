import { LitElement, html } from 'lit-element';

class LitView extends LitElement {
    static get properties() {
        return {
            data: { type: Array },
            unit: { type: String }
        }
    }

    constructor() {
        super();
        console.log('Hello from the LitElement!', this.data, this.unit);
        
    }


    render() {
        return html`
            <div>Ciao from LitElement</div>
        `
    }
}

customElements.define('lit-view', LitView);