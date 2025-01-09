'use client'
import { Input } from "@/components/ui/input"
import { useActionState, useState } from "react"
import { Textarea } from "./ui/textarea"
import MDEditor from "@uiw/react-md-editor"
import { Button } from "./ui/button"
import { Send } from "lucide-react"
import { formSchema } from "@/lib/validation"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { createPitch } from "@/lib/actions"
import { useRouter } from "next/navigation"

 function StartupForm() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [pitch, setPitch] = useState("")
  const {toast} = useToast()
  const router =  useRouter()

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      }
      await formSchema.parseAsync(formValues)

      const result = await createPitch(prevState,formData,pitch)
       console.log(result)
      if(result.status==="SUCCESS"){
        toast({
          title:"Success",
          description:"Your Startup Pitch Has Been Created Sucessfully!!"
        });
        console.log(result.status)
        router.push(`/startup/${result._id}`)
      }
      return result;
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.flatten().fieldErrors;
        setErrors(fieldError as unknown as Record<string, string>);
        toast({
          title: "Error",
          description: "Please check the form for errors",
          variant: "destructive"
        });
        return { ...prevState, error: "Validation Failed", status: "ERROR" }
      }
      toast({
        title: "Error",
        description: "Please check the form for errors",
        variant: "destructive"
      });
      return{
        ...prevState,
        error:"An Unexpected Error Has Occurred",
        status:"ERROR"
      }
    }
  }

  const [state, formAction, isPending] = useActionState(handleFormSubmit, { error: "", status: "" })

  return (
    <form className='startup-form' action={formAction}>
      <div>
        <label htmlFor="title" className='startup-form_label'>Title</label>
        <Input
          id="title"
          className="startup-form_input"
          required
          name="title"
          placeholder="Startup Title"
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className='startup-form_label'>Description</label>
        <Textarea
          id="description"
          className="startup-form_textarea"
          required
          name="description"
          placeholder="Startup Description"
        />
        {errors.description && <p className="startup-form_error">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="category" className='startup-form_label'>Category</label>
        <Input
          id="category"
          className="startup-form_input"
          required
          name="category"
          placeholder="Startup Category ( Tech , Health , Education , AI...)"
        />
        {errors.category && <p className="startup-form_error">{errors.category}</p>}
      </div>

      <div>
        <label htmlFor="link" className='startup-form_label'>Image Url</label>
        <Input
          id="link"
          className="startup-form_input"
          required
          name="link"
          placeholder="Startup Image URL"
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>
      <div data-color-mode="light">
        <label htmlFor="link" className='startup-form_label'>Pitch </label>
        <MDEditor
          id="pitch"
          preview="edit"
          value={pitch}
          onChange={(value) => setPitch(value || '')}
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder: "Breifly Describe About The Your Idea And What Problem It Solves!!"
          }}
          previewOptions={{
            disallowedElements: ["style"]
          }}

        />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <Button type="submit" className="startup-form_btn text-white"
        disabled={isPending}
      > {isPending ? "submitting..." : "Submit Your Pitch"}
        <Send className="!size-6 ml-2" />
      </Button>
    </form>
  )
}

export default StartupForm
