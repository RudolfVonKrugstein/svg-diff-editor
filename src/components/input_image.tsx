
import {Component, JSX, Show} from "solid-js";
import {createSortable, useDragDropContext} from "@thisbeyond/solid-dnd";
import {InputImageData} from "../data/input_image";
import EventHandlerUnion = JSX.EventHandlerUnion;

declare module "solid-js" {
    namespace JSX {
        interface Directives {  // use:model
            sortable: any;
        }
    }
}

type FileInput: EventHandler= {
    target: {files: File[]}
}

const InputImage: Component<{image: InputImageData}> = (props) => {
    const sortable = createSortable(props.image.get_id());
    const [state] = useDragDropContext();

    const readFile = (file: File) => {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onerror = (d) => {
            alert(`error while reading file: ${d.target.error}`);
        }
        reader.onload = (d) => {
            alert(`${d.target.result}`);
        }

    }

    return (
        <div
            use:sortable
            class="sortable"
            classList={{
                "opacity-25": sortable.isActiveDraggable,
                "transition-transform": !!state.active.draggable,
            }}>
            <div>
                <Show when={props.image.unset()}>
                    <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                           id="svg_input"
                           type="file"
                           accept="image/svg+xml"
                           onchange={(e: Event) => {
                               const target =e.target as HTMLInputElement;
                               const files = target.files;
                               readFile(files[0])
                           }}
                    >
                    </input>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Input diagram
                    </button>
                </Show>
            </div>
    </div>
    )
}

export default InputImage;
