export default function hasRequiredFields
(
objRes: Record<string, any>,
requiredFields: string[]
): boolean {
    return requiredFields.every((field) => {
        return Object.hasOwn(objRes, field)
    })
}