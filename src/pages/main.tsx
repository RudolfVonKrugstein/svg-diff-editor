import type { Component } from 'solid-js';
import { InputImages } from "../components/input_images";

const MainPage: Component = () => {
    return (
        <div class="container mx-auto">
            <div class="grid grid-cols-[200px_1fr_200px]">
                <div>
                    <InputImages/>
                </div>
                <div>
                    Middle
                </div>
                <div>
                    Right
                </div>
            </div>
            <p class="text-4xl text-green-700 text-center py-20">Hello tailwind!</p>
        </div>
    );
};

export default MainPage;
