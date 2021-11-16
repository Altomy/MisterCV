/** MainHeader.tsx */

// ========== Imports ========== //
import React, { useEffect } from "react";
import { KeyboardTypeOptions, Platform } from "react-native";
import { IStackProps } from "native-base/lib/typescript/components/primitives";
import {
  Box,
  FormControl,
  HStack,
  IFormControlLabelProps,
  Input,
  Stack,
  IInputProps,
  Select,
  TextArea,
} from "native-base";
import { SpaceType } from "native-base/lib/typescript/components/types";
import { ResponsiveValue } from "styled-system";
import { IBoxProps, Pressable } from "native-base";
import useLanguagesToggle from "hooks/useLanguagesToggle";
import { useTranslation } from "react-i18next";

// ========== propsTypes ========== //

type formValueType = {
  name: string;
  label: string;
  value: string;
  require?: boolean;
  showError?: boolean;
  keyboardType?: KeyboardTypeOptions;
  errorText?: string;
  placeHolder?: string;
  secureType?: boolean;
  ref?: React.RefObject<any>;
  type?: "default" | "select" | "textarea";
  options?: { label: string; value: string }[];
  autoCorrect?: boolean;
};

export type propsTypes = {
  spacing?: ResponsiveValue<
    "gutter" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | SpaceType
  >;
  containerStyles?: IBoxProps;
  stackStyles?: IStackProps;
  inputContainerStyles?: IBoxProps;
  inputStyles?: IInputProps;
  labelStyles?: IFormControlLabelProps;
  inputs: formValueType[][];
  onComplete: (values: any) => void;
  onError: () => void;
  hideAccessory?: boolean;
};

/** MainFunction */
let FormBuilder: React.FC<propsTypes> = (props) => {
  /** @kind: Props */

  let { toggleDir } = useLanguagesToggle();
  let { t } = useTranslation();

  let [forms, setForms] = React.useState<formValueType[][]>(
    props.inputs.map((_input) => {
      return _input.map((__input) => {
        return {
          ...__input,
          ref: React.useRef<any>(),
        };
      });
    })
  );

  let onBlur = () => {
    // Save To Parent Values
    let values: { [key: string]: string } = {};
    let errorsBag: string[] = [];
    let _newForms = forms;
    _newForms.forEach((form) => {
      form.forEach((input) => {
        if (input.require && input.value === "") {
          errorsBag.push(input.name);
        }
        values = { ...values, [input.name]: input.value };
      });
    });

    if (errorsBag.length > 0) {
      props.onError();
      return;
    }

    props.onComplete(values);
  };

  useEffect(() => {}, [props.inputs]);

  /** @kind: Methods */

  /** @kind: Views */

  // ==== RETURN METHOD ==== //
  return (
    <>
      <Box {...props.containerStyles}>
        {forms.map((form, index) => (
          <HStack
            key={index}
            space={props.spacing ? props.spacing : 0}
            {...props.stackStyles}
          >
            {form.map((formValue, inx) => {
              return (
                <Box key={inx} flex={1} {...props.inputContainerStyles}>
                  <FormControl isRequired={formValue.require ? true : false}>
                    <Stack>
                      <FormControl.Label {...props.labelStyles}>
                        {formValue.label}
                      </FormControl.Label>
                      {(formValue.type == undefined ||
                        formValue.type == "default") && (
                        <Input
                          defaultValue={formValue.value}
                          onChangeText={(value) => {
                            let newValues = [...forms];
                            newValues[index][inx].value = value;
                            setForms(newValues);
                          }}
                          placeholder={
                            formValue.placeHolder
                              ? formValue.placeHolder
                              : formValue.label
                          }
                          secureTextEntry={formValue.secureType ? true : false}
                          keyboardType={
                            formValue.keyboardType
                              ? formValue.keyboardType
                              : "default"
                          }
                          onBlur={() => {
                            if (
                              forms[index][inx].value === "" &&
                              forms[index][inx].require
                            ) {
                              let newValues = [...forms];
                              newValues[index][inx].showError = true;
                              setForms(newValues);
                              return;
                            }

                            // Save To Parent Values
                            onBlur();
                          }}
                          ref={forms[index][inx].ref}
                          inputAccessoryViewID={`ID-${index}-${inx}`}
                          autoCorrect={
                            formValue.autoCorrect ? formValue.autoCorrect : true
                          }
                          textAlign={toggleDir("right", "left")}
                          {...props.inputStyles}
                        />
                      )}
                      {formValue.type === "textarea" && (
                        <TextArea
                          h={20}
                          defaultValue={formValue.value}
                          onChangeText={(value) => {
                            let newValues = [...forms];
                            newValues[index][inx].value = value;
                            setForms(newValues);
                          }}
                          placeholder={
                            formValue.placeHolder
                              ? formValue.placeHolder
                              : formValue.label
                          }
                          secureTextEntry={formValue.secureType ? true : false}
                          keyboardType={
                            formValue.keyboardType
                              ? formValue.keyboardType
                              : "default"
                          }
                          onBlur={() => {
                            if (
                              forms[index][inx].value === "" &&
                              forms[index][inx].require
                            ) {
                              let newValues = [...forms];
                              newValues[index][inx].showError = true;
                              setForms(newValues);
                              return;
                            }

                            // Save To Parent Values
                            onBlur();
                          }}
                          ref={forms[index][inx].ref}
                          inputAccessoryViewID={`ID-${index}-${inx}`}
                          autoCorrect={true}
                          textAlign={toggleDir("right", "left")}
                          {...props.inputStyles}
                        />
                      )}
                      {formValue.type == "select" && (
                        <Select
                          selectedValue={formValue.value}
                          ref={forms[index][inx].ref}
                          variant="filled"
                          textAlign={toggleDir("right", "left")}
                          defaultValue={formValue.value}
                          onValueChange={(value) => {
                            let newValues = [...forms];
                            newValues[index][inx].value = value;
                            setForms(newValues);

                            setTimeout(() => {
                              onBlur();
                            }, 300);
                          }}
                        >
                          {formValue.options &&
                            formValue.options.map((option, optionIndex) => (
                              <Select.Item
                                label={option.label}
                                key={optionIndex}
                                value={option.value}
                              />
                            ))}
                        </Select>
                      )}
                      {formValue.showError && (
                        <FormControl.HelperText
                          color={"red.600"}
                          _text={{ color: "red.600" }}
                        >
                          {formValue.errorText
                            ? formValue.errorText
                            : t`formBuilder.require`}
                        </FormControl.HelperText>
                      )}
                    </Stack>
                  </FormControl>
                </Box>
              );
            })}
          </HStack>
        ))}
      </Box>
      <Pressable
        onPress={() => {
          let values: { [key: string]: string } = {};
          let errorsBag: string[] = [];
          let _newForms = forms;
          _newForms.forEach((form) => {
            form.forEach((input) => {
              if (input.require && input.value === "") {
                errorsBag.push(input.name);
              }
              values = { ...values, [input.name]: input.value };
            });
          });

          if (errorsBag.length > 0) {
            props.onError();
          }

          props.onComplete(values);
        }}
      >
        {props.children}
      </Pressable>
    </>
  );
};

export default FormBuilder;
