import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useAppearance } from "@/hooks/use-appearance"

export function ModeToggle() {
  const { resolvedAppearance, updateAppearance } = useAppearance()
  const isDark = resolvedAppearance === "dark"
  const nextMode = isDark ? "light" : "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      aria-label="Toggle appearance"
      onClick={() => updateAppearance(nextMode)}
    >
      {isDark ? <Moon className="size-5" /> : <Sun className="size-5" />}
    </Button>
  )
}
