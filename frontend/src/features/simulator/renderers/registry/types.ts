import { ComponentType } from "react";

export interface RendererProps {

    block: any;

}

export type RendererComponent =
    ComponentType<RendererProps>;