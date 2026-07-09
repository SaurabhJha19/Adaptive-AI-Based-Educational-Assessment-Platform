export interface RenderNode {

    id: string;

    type: string;

    data?: Record<string, any>;

    style?: Record<string, any>;

    children?: RenderNode[];

}