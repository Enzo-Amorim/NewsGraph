export default function CapitalizeFirstLetter(word) {
    const capitalized = word.charAt(0).toUpperCase() + word.substr(1)
    return capitalized
}