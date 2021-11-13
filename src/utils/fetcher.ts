import axios, { AxiosError } from "axios";
import env from "utils/env";

async function get<Type>(
  endpoint: string
): Promise<{ data: Type; error: AxiosError | undefined }> {
  let _data: Type | undefined = undefined;
  let error: AxiosError | undefined = undefined;

  try {
    let res = await axios.get<Type>(env.server + endpoint);
    _data = res.data;
  } catch (err) {
    error = err as AxiosError;
  }

  let data: Type = _data as Type;

  return {
    data,
    error,
  };
}

async function post<Type>(
  endpoint: string,
  postData: any
): Promise<{ data: Type; error: AxiosError | undefined }> {
  let _data: Type | undefined = undefined;
  let error: AxiosError | undefined = undefined;

  try {
    let res = await axios.get<Type>(env.server + endpoint, postData);
    _data = res.data;
  } catch (err) {
    error = err as AxiosError;
  }

  let data: Type = _data as Type;

  return {
    data,
    error,
  };
}

let fetcher = {
  get,
  post,
};

export default fetcher;
