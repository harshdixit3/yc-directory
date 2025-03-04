"use client";
import {Input} from "@/components/ui/input";
import React, {useActionState, useState} from 'react'
import {Textarea} from "@/components/ui/textarea";
import MDEditor from '@uiw/react-md-editor';
import {Button} from "@/components/ui/button";
import {Send} from "lucide-react";
import {formSchema} from "@/lib/validation";
import { z } from "zod";


const StartupForm = () => {

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState('');
   

    const handelFormSubmit = async (prevState : any , formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            };

            await formSchema.parseAsync(formValues);

            console.log(formValues);

            // const result = await creatIdea( pitch , prevState , formData );
            // console.log(result);

        } catch (error) {
            if (error instanceof z.ZodError){
                const fieldError = error.flatten().fieldErrors;

                setErrors(fieldError as unknown as Record<string, string>);
                return { ...prevState, errors: "Validation failed" , status: 'error' };
            }

            return { ...prevState , error: "An Unexpected error has occurred" , status: 'error' };

        }
    };


    const [state , formAction , isPending] = useActionState(
        handelFormSubmit,{
            error: " " ,
            status:"Initial",
    });


    return (
        <form  action={() => {}} className="startup-form">
            <div>
                <label htmlFor="title" className="startup-form_label">
                    Title
                </label>
               <Input
                   id="title"
                   name="title"
                   className="startup-form_input"
                   required
                   placeholder="Starup Title"
               />
                {errors.title && <p className="startup-form_error">{errors.title}</p>}
            </div>

            <div>
                <label htmlFor="description" className="startup-form_label">
                    description
                </label>
               <Textarea
                   id="description"
                   name="description"
                   className="startup-form_textarea"
                   required
                   placeholder="Starup description"
               />
                {errors.description && <p className="startup-form_error">{errors.description}</p>}
            </div>

            <div>
                <label htmlFor="category" className="startup-form_label">
                    category
                </label>
               <Input
                   id="category"
                   name="category"
                   className="startup-form_input"
                   required
                   placeholder="Starup category (Tech , Health ,Education ..."
               />
                {errors.category && <p className="startup-form_error">{errors.category}</p>}
            </div>

            <div>
                <label htmlFor="link" className="startup-form_label">
                    Image Url
                </label>
               <Input
                   id="link"
                   name="link"
                   className="startup-form_input"
                   required
                   placeholder="Starup Image Url"
               />
                {errors.link && <p className="startup-form_error">{errors.link}</p>}
            </div>

            <div data-color-mode="light" >
                <label htmlFor="pitch" className="startup-form_label">
                    Pitch
                </label>

                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    id="pitch"
                    preview="edit"
                    height={300}
                    style={{ borderRadius: 20, overflow: "hidden" }}
                    textareaProps={{
                        placeholder:
                            "Briefly describe your idea and what problem it solves",
                    }}
                    previewOptions={{
                        disallowedElements: ["style"],
                    }}
                />

                {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
            </div>
            <Button type="submit" className="startup-form_btn text-white" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit Your Pitch"}
                <Send className="size-6 ml-2" />
            </Button>
        </form>
    )
}
export default StartupForm
