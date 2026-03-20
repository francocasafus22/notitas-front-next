import ErrorMessage from "../error-message";

export default function InputForm({
    label,
    name,
    type,
    required,
    placeholder,
    register,
    error,
    className,
} : {label?: string, name: string, type?: string, required?: boolean, placeholder?: string, register: any, error?: string, className?: string}) {
    return (
        <label className="flex flex-col gap-1 flex-1">
        <span className="text-sm font-medium">{label}</span>
        <input
            name={name}
            type={type || "text"}
            required={required}
            placeholder={placeholder}
            {...register(name, { required })}
            className={`text-md border border-border rounded-md py-1 px-3 focus:shadow-xl placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-ring shadow-xs  ${className}`}
        />
        {error && <ErrorMessage message={error} />}
        </label>
    );
}

export function TextAreaInput({
    label,
    name,
    type,
    required,
    placeholder,
    register,
    error,
} : {label: string, name: string, type?: string, required?: boolean, placeholder?: string, register: any, error?: string}) {
    return (
        <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">{label}</span>
        <textarea
            name={name}
            type={type || "text"}
            required={required}
            placeholder={placeholder}
            {...register(name, { required })}
            className={`text-md border border-border rounded-md py-1 px-3 focus:shadow-xl placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-ring shadow-xs`}
        />
        {error && <ErrorMessage message={error} />}
        </label>
    );
}

/*
export function TagsInput({
    label,
    name,
    required,
    placeholder,
    register,
    setValue,
    error,
} : {label: string, name: string, required?: boolean, placeholder?: string, register: any, setValue: any, error?: string}) {
    const [tags, setTags] = useState([]);
    const [input, setInput] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
        e.preventDefault();

        const newTag = input.trim();
        if (newTag && !tags.includes(newTag)) {
            const updated = [...tags, newTag];
            setTags(updated);
            setValue(name, updated);
        }

        setInput("");
        }
    };

    const removeTag = (tag : string) => {
        const updated = tags.filter((t) => t !== tag);
        setTags(updated);
        setValue(name, updated);
    };

    return (
        <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">{label}</span>

        <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || "Presiona Enter para agregar"}
            className={`text-md border border-border rounded-md py-1 px-3
                focus:shadow-xl placeholder:text-placeholder
                focus:outline-none focus:ring-2 focus:ring-ring shadow-xs`}
        />
        {error && <ErrorMessage message={error} />}


        <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, i) => (
            <span
                key={i}
                className="px-3 py-1 bg-secondary text-secondary-foreground
                    rounded-full text-sm flex items-center gap-2"
            >
                {tag}
                <button
                type="button"
                className="text-xs hover:text-destructive cursor-pointer"
                onClick={() => removeTag(tag)}
                >
                ✕
                </button>
            </span>
            ))}
        </div>


        <input type="hidden" {...register(name, { required })} />
        </label>
    );


}
*/