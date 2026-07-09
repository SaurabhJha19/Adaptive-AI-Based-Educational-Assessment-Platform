"use client";

import {

    createContext,

    useContext,

} from "react";

const RendererContext =

    createContext({});

export function RendererProvider({

    children,

}: {

    children: React.ReactNode;

}) {

    return (

        <RendererContext.Provider

            value={{}}

        >

            {children}

        </RendererContext.Provider>

    );

}

export function useRenderer() {

    return useContext(

        RendererContext

    );

}