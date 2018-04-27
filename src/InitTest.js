import { Page } from "./Page";
import { questions } from "./InitQuestions";

export class InitTest extends Page {
	addQuestion(q) {
		const body = `
			<div class="columns">
				<div class="column">
					<h3>${q.q}</h3>
					<div class="field answers"></div>
				</div>
			</div>
			`;
		let e = document.createElement("div");
		e.className = "box";
		e.innerHTML = body;
		this.body.querySelector(".questions").appendChild(e);

		let qContainer = e.querySelector(".answers");
		let frag = window.document.createDocumentFragment();

		for (let a of q.a) {
			const aBod = `
				<label class="radio">
					<input type="radio" name="${q.q.slice(15)}">
					${a.a}
				</label>
			`;

			const el = document.createElement("div");
			el.className = "control";
			el.innerHTML = aBod;

			frag.appendChild(el);
		}

		qContainer.appendChild(frag);
	}

	setup(body) {
		this.body = body;
		for (let q of questions) {
			this.addQuestion(q);
		}

		this.body.querySelector(".submitBtn").onclick = (e) => {
			e.preventDefault();

			this.gp("action_contract");
		}
	}
}