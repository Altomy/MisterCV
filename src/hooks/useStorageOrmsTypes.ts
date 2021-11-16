type OrmModel = {
  ID: string;
  CreatedAt: Date;
};

type WhereModelType = {
  key: string;
  value: string | number;
};

type ToUpdateValue = {
  key: string;
  value: string | number;
};

// createModel -> Create the model with key in the storage
export type createModelType = (
  modelName: string
) => Promise<"success" | "error" | "hasModel">;

export type removeModelType = (
  modelName: string
) => Promise<"success" | "error">;

export type getAllModelsType = () => Promise<string[] | "error">;

export type createValueType = <T>(
  value: T,
  modelName: string
) => Promise<(T & OrmModel) | undefined>;

export type getAllValuesType = <T>(
  modelName: string
) => Promise<(T & OrmModel)[] | undefined>;

export type whereAllValuesType = <T>(
  modelName: string,
  where: WhereModelType
) => Promise<(T & OrmModel)[] | undefined>;

export type findValueType = <T>(
  modelName: string,
  where: WhereModelType
) => Promise<(T & OrmModel) | undefined>;

export type updateValueType = <T>(
  modelName: string,
  where: WhereModelType,
  toUpdate: ToUpdateValue[]
) => Promise<(T & OrmModel) | undefined>;

export type removeValueType = <T>(
  modelName: string,
  where: WhereModelType
) => Promise<(T & OrmModel)[] | undefined>;

export type updateType = <T>(
  modelName: string,
  where: WhereModelType,
  newValue: T,
  createOnFail?: boolean
) => Promise<T | undefined>;

// useStorageOrmType ..
export type useStorageOrmType = () => {
  createModel: createModelType;
  removeModel: removeModelType;
  getAllModels: getAllModelsType;
  createValue: createValueType;
  getAllValues: getAllValuesType;
  whereAllValues: whereAllValuesType;
  findValue: findValueType;
  updateValues: updateValueType;
  removeValue: removeValueType;
  update: updateType;
};
