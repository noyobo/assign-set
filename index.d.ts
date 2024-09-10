type Many<T> = T | ReadonlyArray<T>;
type PropertyName = string | number | symbol;
type PropertyPath = Many<PropertyName>;

declare function set<T extends object>(object: T, path: PropertyPath, value: any): T;

export default set;
