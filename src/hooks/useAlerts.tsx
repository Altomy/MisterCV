import { useToast } from "native-base";
import React, { useState, useEffect } from "react";

type showSuccessTypes = (title: string, description?: string) => void;
type showErrorTypes = (title: string, description?: string) => void;

type useAlertsTypes = () => {
  showSuccess: showSuccessTypes;
  showError: showErrorTypes;
};

let useAlerts: useAlertsTypes = () => {
  let toast = useToast();

  let showSuccess: showSuccessTypes = (title, description) => {
    toast.show({
      title,
      description,
      status: "success",
    });
  };

  let showError: showErrorTypes = (title, description) => {
    toast.show({
      title,
      description,
      status: "error",
    });
  };

  return {
    showSuccess,
    showError,
  };
};

export default useAlerts;
