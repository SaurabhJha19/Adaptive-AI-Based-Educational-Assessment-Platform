export class ValidationError
extends Error {

    constructor(

        message: string,

        public readonly path: string

    ) {

        super(message);

    }

}