import { cn } from "@/lib/utils"
import { Skeleton } from "./ui/skeleton"

const StorySkeleton = () => {
  return (
    <div>
      {
        [0, 1, 2, 3, 4].map((index: number) => (
          <li key={cn("skeleton", index)}>
            <Skeleton className="story-card_skeleton" />
          </li>
        ))
      }
    </div>
  )
}

export default StorySkeleton
