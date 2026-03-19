export function formatDateTimeBR(dateString: string): string {
  const parsedDate = parseToISODate(dateString)

  if (Number.isNaN(parsedDate.getTime())) {
    return "Data inválida"
  }

  return parsedDate.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function parseToISODate(dateString: string): Date {
  const isoFormatted = dateString.replace(" ", "T")
  return new Date(isoFormatted)
}

export function formatName(name: string) {
  const formatedName = name ?? ""
  return formatedName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
}
