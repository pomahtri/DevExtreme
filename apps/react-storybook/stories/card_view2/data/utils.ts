const imageCount = 51;
const getImageUrl = (n: number) => {
  const name = n < 10 ? `0${n}` : n;
  return `https://js.devexpress.com/jQuery/Demos/WidgetsGallery/JSDemos/images/employees/${name}.png`
}

export function addImageToData(data: Record<string, unknown>[]): Record<string, unknown>[] {
  return data.map((item) => ({
    ...item,
    image: getImageUrl((item.OrderNumber as number % 51) + 1)
  }))
}
