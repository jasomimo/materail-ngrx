export class DynamicFlatNode {
  constructor(
    public id: number,
    public login: string,
    public level: number = 1,
    public expandable: boolean = false,
    public isLoading: boolean = false,
    public repositories?: string,
  ) {}
}
