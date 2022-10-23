enum InputImageType {
    None, // Nothing yet
    SVG_FILE,// Loaded from a svg file
    KROKI_DIAGRAM // Diagram source for kroki
}

export class InputImageData {
    private id: number;
    private svg: string;
    private diagram_source: string;
    private type: InputImageType;

    constructor() {
        this.id = Math.floor(Math.random() * 0xFFFFFFFFFFFFF);
        this.svg = "";
        this.diagram_source = "";
        this.type = InputImageType.None;
    }

    get_id(): number {
       return this.id;
    }
}
