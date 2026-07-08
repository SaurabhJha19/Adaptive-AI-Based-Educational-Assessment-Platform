export interface RepairIssue {

    path: string;

    message: string;

}

export interface RepairRequest {

    exam: any;

    issues: RepairIssue[];

}