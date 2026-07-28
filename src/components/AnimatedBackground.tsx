"use client";

import {
  Children,
  cloneElement,
  useEffect,
  useState,
  useId,
  type ReactElement,
} from "react";
import { AnimatePresence, motion, type Transition } from "motion/react";

const cn = (...c: (string | undefined | false)[]) =>
  c.filter(Boolean).join(" ");

type AnimatedBackgroundProps = {
  children: ReactElement[] | ReactElement;
  defaultValue?: string;
  onValueChange?: (newActiveId: string | null) => void;
  className?: string;
  transition?: Transition;
  enableHover?: boolean;
};

/**
 * A shared highlight that slides behind whichever child is hovered/active
 * (layoutId-based). Ported from the motion-primitives AnimatedBackground.
 * Each child must carry a `data-id`.
 */
export default function AnimatedBackground({
  children,
  defaultValue,
  onValueChange,
  className,
  transition,
  enableHover = false,
}: AnimatedBackgroundProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const uniqueId = useId();

  const handleSetActiveId = (id: string | null) => {
    setActiveId(id);
    onValueChange?.(id);
  };

  useEffect(() => {
    if (defaultValue !== undefined) setActiveId(defaultValue);
  }, [defaultValue]);

  return Children.map(children, (child, index) => {
    const item = child as ReactElement<Record<string, unknown>>;
    const id = item.props["data-id"] as string;

    const interactionProps = enableHover
      ? {
          onMouseEnter: () => handleSetActiveId(id),
          onMouseLeave: () => handleSetActiveId(null),
        }
      : { onClick: () => handleSetActiveId(id) };

    return cloneElement(
      item,
      {
        key: index,
        className: cn(
          "relative inline-flex",
          item.props["className"] as string | undefined
        ),
        "data-checked": activeId === id ? "true" : "false",
        ...interactionProps,
      },
      <>
        <AnimatePresence initial={false}>
          {activeId === id && (
            <motion.div
              layoutId={`background-${uniqueId}`}
              className={cn("absolute inset-0 -z-10", className)}
              transition={transition}
              initial={{ opacity: defaultValue ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
        {item.props["children"] as React.ReactNode}
      </>
    );
  });
}
