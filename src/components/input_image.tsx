
import {Component} from "solid-js";
import {createSortable, useDragDropContext} from "@thisbeyond/solid-dnd";
import {InputImageData} from "../data/input_image";

declare module "solid-js" {
    namespace JSX {
        interface Directives {  // use:model
            sortable: any;
        }
    }
}

const InputImage: Component<{image: InputImageData}> = (props) => {
    const sortable = createSortable(props.image.get_id());
    const [state] = useDragDropContext();
    return (
        <div
            use:sortable
            class="sortable"
            classList={{
                "opacity-25": sortable.isActiveDraggable,
                "transition-transform": !!state.active.draggable,
            }}>
            {props.image.get_id()}
    </div>
    )
}

export default InputImage;
