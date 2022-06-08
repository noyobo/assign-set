type Many<T> = T | ReadonlyArray<T>;
type PropertyName = string | number | symbol;
type PropertyPath = Many<PropertyName>;

function set<T extends object>(object: T, path: PropertyPath, value: any): T;

export = set;
