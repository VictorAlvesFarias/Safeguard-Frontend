import { toast } from "react-toastify";

export function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}
