import { LayoutColumn } from "./layout-column";

export interface LayoutPage {

    pageNumber: number;

    width: number;

    height: number;

    columns: LayoutColumn[];

}