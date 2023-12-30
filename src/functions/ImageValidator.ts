export const imageValidator = (image: File):string | true => {
    const imageExtension: string = image.name.split('.').pop()!;
    if(imageExtension !== "png" && imageExtension !== "jpeg" && imageExtension !== "bmp" && imageExtension !== "webp" && imageExtension !== "jpg")
        return "Неверный формат изображения";
    if(image.size / 1024 / 1024 > 2) {
        return "Размер загружаемого изображения не должен превышать 2MB";
    }
    return true;
}