export function highlightHashtags(text: string) {
  return text.replace(
    /#(\w+)/g,
    `<span class="text-blue-400 hover:underline cursor-pointer">#$1</span>`,
  )
}
