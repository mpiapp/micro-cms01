export type TStatuses = {
  name: string;
  next:
    | {
        name: string;
      }[]
    | [];
};
