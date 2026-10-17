import { neverTrack } from "mutraction-dom";
import type { TestScenario, TestScenarioFactory } from "../types.js";

function create(): TestScenario {
    const root = neverTrack(
        <div>
            <div id="t0" data-char="A" data-type="alpha">A</div>
            <div id="t1" data-char="2" data-type="numeric">2</div>
        </div> as HTMLDivElement);

    const steps = [
        {
            action() {  },
            assertions: [
                {
                    condition: () => root.querySelector('[data-char="A"]')?.innerHTML === "A",
                    message: '[data-char="A"] query should find A',
                },
                {
                    condition: () => (root.querySelector("#t1") as HTMLElement)?.dataset.type === "numeric",
                    message: "#t1 should have a dataset.type set to numeric",
                },
            ],
        },
    ];

    return { root, steps };
}

const scenario: TestScenarioFactory = {
    name: "Dataset Attributes",
    create,
}

export default scenario;
