import type { Component } from 'solid-js';
import {closestCenter, DragDropProvider, DragDropSensors, DragOverlay, SortableProvider} from "@thisbeyond/solid-dnd";
import { createSignal, For } from "solid-js";
import InputImage from "./input_image";
import {InputImageData} from "../data/input_image";

export const InputImages: Component = () => {
    const [items, setItems] = createSignal([new InputImageData(), new InputImageData()]);
    const [activeItem, setActiveItem] = createSignal(null);
    const ids = () => items().map((item) => item.get_id());

    const onDragStart = ({ draggable }) => setActiveItem(draggable.get_id);

    const onDragEnd = ({draggable, droppable}) => {
        if (draggable && droppable) {
            const currentItems = ids();
            const fromIndex = currentItems.indexOf(draggable.id);
            const toIndex = currentItems.indexOf(droppable.id);
            if (fromIndex != toIndex) {
                setItems((currentItems) => {
                  const newItems = currentItems.slice();
                  [newItems[fromIndex], newItems[toIndex]] = [newItems[toIndex], newItems[fromIndex]]
                  return newItems;
                });
            }
        }
    }

    return <DragDropProvider
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        collisionDetector={closestCenter}
        >
        <DragDropSensors/>
        <div class="column self-stretch">
            <SortableProvider ids={ids()}>
                <For each={items()}>{(item) =>
                    <InputImage image={item}></InputImage>}
                </For>
            </SortableProvider>
        </div>
        <DragOverlay>
            <div class="sortable">{activeItem()}</div>
        </DragOverlay>
    </DragDropProvider>
};

export default InputImages;
