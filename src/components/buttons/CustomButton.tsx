import { CustomButtonType } from "@/utils/types";

export default function CustomButton({ text, action, styles }: CustomButtonType) {
  return (
    <button onClick={action} className={styles || 'p-3 bg-blue-600 text-sm text-white rounded-md'}>
        <span className="">{text}</span>
    </button>
  )
}