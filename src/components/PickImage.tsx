/** MainHeader.tsx */

// ========== Imports ========== //
import React, { useState, useEffect } from "react";
import {
  View,
  useWindowDimensions,
  Platform,
  ImageSourcePropType,
} from "react-native";
import {
  Box,
  Text,
  IBoxProps,
  Image,
  IImageProps,
  ITextProps,
  Pressable,
  Actionsheet,
  useDisclose,
  Icon,
  useToast,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

// ========== propsTypes ========== //

export type propsTypes = {
  holderType?: "default" | "avatar" | "custom";
  containerStyles?: IBoxProps;
  boxStyles?: IBoxProps;
  imageBoxStyles?: IBoxProps;
  imageProps?: IImageProps;
  textType?: "internal" | "external";
  title?: string;
  subTitle?: string;
  textBoxStyles?: IBoxProps;
  titleStyles?: ITextProps;
  subTitleStyles?: ITextProps;
  onFinish?: (image: ImagePicker.ImagePickerResult) => void;
  image?: string;
  customImage?: ImageSourcePropType;
};

/** MainFunction */
let PickImage: React.FC<propsTypes> = (props) => {
  /** @kind: Props */

  let { width } = useWindowDimensions();
  let { isOpen, onOpen, onClose } = useDisclose();
  let toast = useToast();

  let [image, setImage] = React.useState<string | null>(
    props.image ? props.image : null
  );

  let requestPermission: (
    type: "camera" | "gallery"
  ) => Promise<"success" | "error"> = async (type) => {
    if (type == "gallery") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        return "error";
      }
    } else {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        return "error";
      }
    }
    return "success";
  };

  let openGallery = async () => {
    onClose();
    let status = await requestPermission("gallery");
    if (status == "error") {
      toast.show({
        title: "App don't have permission",
        description: "please allow permission to the app to get image",
        status: "error",
      });
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(null);
      setImage(result.uri);

      if (props.onFinish) {
        props.onFinish(result);
      }
    }
  };

  let openCamera = async () => {
    onClose();
    let status = await requestPermission("camera");
    if (status === "error") {
      toast.show({
        title: "App don't have permission",
        description: "please allow permission to the app to get image",
        status: "error",
      });
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(null);
      setImage(result.uri);

      if (props.onFinish) {
        props.onFinish(result);
      }
    }
  };

  /** @kind: Hooks */

  /** @kind: Methods */

  /** @kind: Views */

  // ==== RETURN METHOD ==== //
  return (
    <Box {...props.containerStyles}>
      {props.holderType === "default" ||
        (!props.holderType && (
          <Pressable onPress={onOpen}>
            <Box
              borderColor={"muted.500"}
              borderWidth={0.5}
              {...props.boxStyles}
            >
              <Box
                alignItems={"center"}
                justifyContent={"center"}
                height={width / 3}
                bgColor={"muted.200"}
                position={"relative"}
                {...props.imageBoxStyles}
              >
                {image && (
                  <Image
                    alt="placeHolder"
                    source={{ uri: image }}
                    width="100%"
                    height="100%"
                    resizeMode="contain"
                    {...props.imageProps}
                  />
                )}
                {!image && (
                  <Image
                    alt="placeHolder"
                    source={
                      props.customImage
                        ? props.customImage
                        : require("./defaultPlaceHolder.png")
                    }
                    width="100%"
                    height="100%"
                    resizeMode="contain"
                    {...props.imageProps}
                  />
                )}

                {props.textType === "internal" && (
                  <Box
                    position={"absolute"}
                    left={0}
                    bottom={0}
                    width={"100%"}
                    py={0.5}
                    bgColor={"muted.300"}
                    {...props.textBoxStyles}
                  >
                    <Text
                      textAlign={"center"}
                      fontSize="md"
                      {...props.titleStyles}
                    >
                      {props.title}
                    </Text>
                  </Box>
                )}
              </Box>
              {props.textType === "external" && (
                <Box width={"100%"} py={1} bgColor={"muted.300"}>
                  <Text
                    textAlign={"center"}
                    fontSize="md"
                    bold
                    {...props.titleStyles}
                  >
                    {props.title}
                  </Text>
                  {props.subTitle && (
                    <Text
                      textAlign={"center"}
                      fontSize="xs"
                      bold
                      {...props.subTitleStyles}
                    >
                      {props.subTitle}
                    </Text>
                  )}
                </Box>
              )}
            </Box>
          </Pressable>
        ))}
      {props.holderType === "avatar" && (
        <Pressable onPress={onOpen}>
          <Box
            alignItems={"center"}
            justifyContent={"center"}
            {...props.boxStyles}
          >
            <Box
              alignItems={"center"}
              justifyContent={"center"}
              height={width / 3}
              width={width / 3}
              bgColor={"muted.200"}
              borderRadius={width / 3 / 2}
              position={"relative"}
              borderColor={"muted.300"}
              borderWidth={1}
              {...props.imageBoxStyles}
            >
              {image && (
                <Image
                  alt="placeHolder"
                  source={{ uri: image }}
                  width="100%"
                  height="100%"
                  resizeMode="contain"
                  {...props.imageProps}
                />
              )}
              {!image && (
                <Image
                  alt="placeHolder"
                  source={
                    props.customImage
                      ? props.customImage
                      : require("./defaultPlaceHolder.png")
                  }
                  width="100%"
                  height="100%"
                  resizeMode="contain"
                  {...props.imageProps}
                />
              )}

              {props.textType === "internal" && (
                <Box
                  position={"absolute"}
                  left={0}
                  bottom={0}
                  width={"100%"}
                  py={0.5}
                  bgColor={"muted.300"}
                  overflow={"hidden"}
                  {...props.textBoxStyles}
                >
                  <Text
                    textAlign={"center"}
                    fontSize="xs"
                    {...props.titleStyles}
                  >
                    {props.title}
                  </Text>
                </Box>
              )}
            </Box>
            {props.textType === "external" && (
              <Box
                width={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Text
                  textAlign={"center"}
                  fontSize="md"
                  bold
                  {...props.titleStyles}
                >
                  {props.title}
                </Text>
                {props.subTitle && (
                  <Text
                    textAlign={"center"}
                    fontSize="xs"
                    bold
                    {...props.subTitleStyles}
                  >
                    {props.subTitle}
                  </Text>
                )}
              </Box>
            )}
          </Box>
        </Pressable>
      )}
      {props.holderType === "avatar" && (
        <Pressable onPress={onOpen}>{props.children}</Pressable>
      )}
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text fontSize="16" color="muted.500">
              Select Image
            </Text>
          </Box>
          <Actionsheet.Item
            onPress={openCamera}
            leftIcon={<Icon as={<Ionicons name="camera-outline" />} />}
          >
            Camera
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={openGallery}
            leftIcon={<Icon as={<Ionicons name="albums-outline" />} />}
          >
            {Platform.select({ ios: "Image roll", android: "Gallery" })}
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};

export default PickImage;
