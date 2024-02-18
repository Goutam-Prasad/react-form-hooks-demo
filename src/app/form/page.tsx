"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, Controller,FormProvider } from "react-hook-form";
import { z } from 'zod';
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import DraggerWithPreSignedURLWrapper from "../components/DraggerWithPreSignedUrl";
export const signUpSchema = z
    .object({
        email: z.string().email(),
        uploadFile:z.object({})
    });

type TSignUpSchema = z.infer<typeof signUpSchema>;
export default function FormWithReactHookFormAndZod() {
    const methods = useForm();
    const {
        register,
        handleSubmit,
        control,
        getValues,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TSignUpSchema>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data: TSignUpSchema) => {
        console.log({ getValues:getValues('email') })
        // TODO: submit to server
        // ...
        await new Promise((resolve) => setTimeout(resolve, 1000));

        reset();
    };

    return (
        <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
            <div className="my-2">
            <Controller
                name="email"
                control={control}
                render={({ field }) => <TextInput
                    {...field}
                    label="Email"
                    placeholder="Email"
                    className="px-4 py-2 rounded"
                />}
            />
            {errors?.email?.message??''}
            </div>

            <div className="my-2">
            <Controller
                name="uploadFile"
                control={control}
                render={({ field }) => <DraggerWithPreSignedURLWrapper
                    {...field}
                    label="Upload File"
                    placeholder="uploadFile"
                    className="px-4 py-2 rounded"
                />}
            />
            {errors?.email?.message??''}
            </div>
            <Button
                label="Submit"
                disabled={isSubmitting}
                htmlType="submit"
                className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
            />
        </form>
        </FormProvider>
    );
}