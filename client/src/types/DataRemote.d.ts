export type DataRemote<D, E> =
  | { status: "not-asked" }
  | { status: "loading" }
  | { status: "success"; data: D }
  | { status: "failure"; error: E };
