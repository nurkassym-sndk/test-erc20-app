export interface IMintDto {
  amount: number;
}

export interface ITransferDto extends IMintDto {
  to: string;
}

export interface ITransferFromDto extends ITransferDto {
  from: string;
}

export interface IApproveDto extends IMintDto {
  spender: string;
}

export interface IBurnDto extends IMintDto {
  from: string;
}