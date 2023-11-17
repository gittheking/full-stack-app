export type Column<T> = {
  key: string;
  title: string;
  alignment: "left" | "right" | "center";
  getData: (item: T) => string;
};
