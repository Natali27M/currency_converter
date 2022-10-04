export interface IRespoceDbUah {
  base: string;
  date: string;
  motd : {
    msg: string;
    url: string;
  };
  rates: {UAH: number};
  success: boolean;
}
