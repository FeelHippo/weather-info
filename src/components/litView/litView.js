import { LitElement, html } from 'lit-element';

class LitView extends LitElement {


    render() {
        return html`
            <div>Ciao from LitElement</div>
        `
    }
}

customElements.define('lit-view', LitView);