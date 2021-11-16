import React, { useState, useEffect } from "react";
import {
  getAllValuesType,
  removeModelType,
  useStorageOrmType,
} from "./useStorageOrmsTypes";
import { createModelType, getAllModelsType } from "./useStorageOrmsTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeValueType } from "./useStorageOrmsTypes";
import { updateType } from "hooks/useStorageOrmsTypes";
import { findValueType, updateValueType } from ".//useStorageOrmsTypes";
import { createValueType, whereAllValuesType } from "./useStorageOrmsTypes";
import { v4 as uuidv4 } from "uuid";

let createModel: createModelType = async (modelName) => {
  try {
    let model = await AsyncStorage.getItem(modelName);
    if (model) {
      return "hasModel";
    }

    await AsyncStorage.setItem(modelName, "[]");
    return "success";
  } catch (error) {
    return "error";
  }
};

let removeModel: removeModelType = async (modelName) => {
  try {
    let model = await AsyncStorage.getItem(modelName);
    if (!model) {
      return "success";
    }

    await AsyncStorage.removeItem(modelName);
    return "success";
  } catch (error) {
    return "error";
  }
};

let getAllModels: getAllModelsType = async () => {
  try {
    let allKeys = await AsyncStorage.getAllKeys();

    return allKeys;
  } catch (error) {
    return "error";
  }
};

let createValue: createValueType = async (value, modelName) => {
  try {
    // Check model Values
    let modelValues = await AsyncStorage.getItem(modelName);
    if (!modelValues) {
      // if has error and not found model
      return undefined;
    }

    // get Values with type of value array
    let values: typeof value[] = JSON.parse(modelValues);

    // getID To next prop
    let ID: string = uuidv4();

    // setUp the ID To Value
    let newValue = { ...value, ID: ID, CreatedAt: new Date() };

    // pushValues
    values.push(newValue);

    await AsyncStorage.setItem(modelName, JSON.stringify(values));

    return newValue;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

let getAllValues: getAllValuesType = async (modelName) => {
  try {
    let modelValues = await AsyncStorage.getItem(modelName);
    if (!modelValues) {
      return undefined;
    }

    let values = JSON.parse(modelValues);

    return values;
  } catch (error) {
    return undefined;
  }
};

let whereAllValues: whereAllValuesType = async (modelName, where) => {
  try {
    let modelValues = await AsyncStorage.getItem(modelName);
    if (!modelValues) {
      return undefined;
    }

    let values: any[] = JSON.parse(modelValues);

    let correctValues = values.filter(
      (_value) => _value[where.key] == where.value
    );

    return correctValues;
  } catch (error) {
    return undefined;
  }
};

let findValue: findValueType = async (modelName, where) => {
  try {
    let modelValues = await AsyncStorage.getItem(modelName);
    if (!modelValues) {
      return undefined;
    }

    let values: any[] = JSON.parse(modelValues);

    let value = values.find((_value) => _value[where.key] == where.value);

    return value;
  } catch (error) {
    return undefined;
  }
};

let updateValues: updateValueType = async (modelName, where, toUpdate) => {
  try {
    let modelValues = await AsyncStorage.getItem(modelName);
    if (!modelValues) {
      return undefined;
    }

    let values: any[] = JSON.parse(modelValues);

    let value = values.find((_value) => _value[where.key] == where.value);

    toUpdate.forEach((_toUpdate) => {
      value[_toUpdate.key] = _toUpdate.value;
    });

    let valueIndex = values.findIndex(
      (_value) => _value[where.key] == where.value
    );
    values[valueIndex] = value;

    await AsyncStorage.setItem(modelName, JSON.stringify(values));

    return value;
  } catch (error) {
    return undefined;
  }
};

let removeValue: removeValueType = async (modelName, where) => {
  try {
    let modelValues = await AsyncStorage.getItem(modelName);
    if (!modelValues) {
      return undefined;
    }

    let values: any[] = JSON.parse(modelValues);

    let valueIndex = values.findIndex(
      (_value) => _value[where.key] == where.value
    );

    values.splice(valueIndex, 1);
    await AsyncStorage.setItem(modelName, JSON.stringify(values));

    return values;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

let update: updateType = async (
  modelName,
  where,
  newValue,
  createOnFail = true
) => {
  try {
    let modelValues = await AsyncStorage.getItem(modelName);
    if (!modelValues) {
      return undefined;
    }

    let values: any[] = JSON.parse(modelValues);

    let valueIndex = values.findIndex(
      (_value) => _value[where.key] == where.value
    );

    if (valueIndex == -1) {
      if (createOnFail) {
        newValue = { ...newValue, ID: uuidv4() };
        values.push(newValue);
      }
    } else {
      values[valueIndex] = newValue;
    }

    await AsyncStorage.setItem(modelName, JSON.stringify(values));

    return { ...newValue };
  } catch (error) {
    return undefined;
  }
};

let useStorageOrms: useStorageOrmType = () => {
  return {
    createModel,
    removeModel,
    getAllModels,
    createValue,
    getAllValues,
    whereAllValues,
    findValue,
    updateValues,
    removeValue,
    update,
  };
};

export default useStorageOrms;
