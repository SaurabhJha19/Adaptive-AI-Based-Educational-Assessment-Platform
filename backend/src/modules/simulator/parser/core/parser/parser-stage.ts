export interface ParserStage<TInput, TOutput> {

    run(
        input: TInput
    ): Promise<TOutput>;

}