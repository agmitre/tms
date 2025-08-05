import React, { useId, useMemo, useRef, useState } from "react";

/** A single option in the menu */
export type ListMenuItem = {
    id: string;
    label: string;
    disabled?: boolean;
    onClick?: () => void; // each item can have its own click handler
    // You can extend this with icon, counter, etc.
};

/** Color classes for Tailwind (pass full classes to avoid JIT purge issues) */
export type ListMenuColor = {
    /** Background when selected (the "hero" fill) */
    selectedBg?: string;     // e.g. "bg-yellow-300"
    /** Text when selected */
    selectedText?: string;   // e.g. "text-black"
    /** Background on hover when not selected */
    hoverBg?: string;        // e.g. "hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60"
    /** Text when unselected */
    unselectedText?: string; // e.g. "text-zinc-700 dark:text-zinc-200"
    /** Ring color when focused via keyboard */
    ring?: string;           // e.g. "focus:ring-yellow-400"
};

export type ListMenuProps = {
    items: ListMenuItem[];
    /** Controlled selected id (optional). If omitted, the component manages its own selection state. */
    selectedId?: string;
    /** Called whenever selection changes */
    onSelect?: (item: ListMenuItem) => void;
    /** Accent/hero color classes */
    color?: ListMenuColor;
    /** Optional className to style the container */
    className?: string;
    /** Optional aria-label for accessibility (since we’re omitting a visible title) */
    ariaLabel?: string;
};

/**
 * ListMenu
 * - Keyboard accessible (ArrowUp/ArrowDown, Enter/Space)
 * - Per-item onClick supported (runs in addition to onSelect)
 * - Disabled items are skipped for selection and cannot be clicked
 */
export const ListMenu: React.FC<ListMenuProps> = ({
    items,
    selectedId: controlledSelectedId,
    onSelect,
    color,
    className,
    ariaLabel = "Options list",
}) => {
    // Default accent/hero palette resembling the screenshot
    const palette = useMemo<ListMenuColor>(
        () => ({
            selectedBg: "bg-yellow-300 dark:bg-yellow-400",
            selectedText: "text-black",
            hoverBg: "hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70",
            unselectedText: "text-zinc-800 dark:text-zinc-100",
            ring: "focus:ring-yellow-400",
            ...color,
        }),
        [color]
    );

    // Uncontrolled fallback state
    const [uncontrolledId, setUncontrolledId] = useState<string | undefined>(
        controlledSelectedId ?? items.find((i) => !i.disabled)?.id
    );

    // If parent passes selectedId, we use that; otherwise use our own state.
    const selectedId = controlledSelectedId ?? uncontrolledId;

    const listId = useId();
    const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);

    const focusItem = (idx: number) => {
        const el = buttonsRef.current[idx];
        if (el) el.focus();
    };

    const moveFocus = (dir: -1 | 1) => {
        // Keyboard navigation: skip disabled items
        if (!buttonsRef.current.length) return;
        const currentIndex = buttonsRef.current.findIndex((el) => el === document.activeElement);
        let idx = currentIndex === -1 ? 0 : currentIndex + dir;

        // Clamp with wrap-around
        for (let tries = 0; tries < items.length; tries++) {
            if (idx < 0) idx = items.length - 1;
            if (idx >= items.length) idx = 0;
            if (!items[idx]?.disabled) break;
            idx += dir;
        }
        focusItem(idx);
    };

    const selectByIndex = (idx: number) => {
        const item = items[idx];
        if (!item || item.disabled) return;

        // Update internal state for uncontrolled usage
        if (controlledSelectedId === undefined) {
            setUncontrolledId(item.id);
        }
        // Notify parent (and let them persist selection if controlled)
        onSelect?.(item);
        // Run the item's own click handler if provided
        item.onClick?.();
    };

    return (
        <div
            role="listbox" // ARIA role to indicate a selectable list
            aria-label={ariaLabel}
            aria-activedescendant={selectedId ? `${listId}-${selectedId}` : undefined}
            className={["inline-flex w-full max-w-xs flex-col gap-1", className].filter(Boolean).join(" ")}
            onKeyDown={(e) => {
                // Keyboard support for accessibility
                if (e.key === "ArrowDown") {
                    e.preventDefault();
                    moveFocus(1);
                } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    moveFocus(-1);
                } else if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    const idx = buttonsRef.current.findIndex((el) => el === document.activeElement);
                    if (idx >= 0) selectByIndex(idx);
                }
            }}
        >
            {items.map((item, idx) => {
                const selected = item.id === selectedId;
                const base =
                    "w-full text-left px-3 py-2 rounded-md transition outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-zinc-900";
                const interactive = item.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : `cursor-pointer ${palette.hoverBg}`;
                const selectedClasses = selected
                    ? `${palette.selectedBg} ${palette.selectedText}`
                    : `${palette.unselectedText} bg-transparent`;

                return (
                    <button
                        key={item.id}
                        id={`${listId}-${item.id}`}
                        //ref={(el: HTMLButtonElement | null) => (buttonsRef.current[idx] = el)}
                        role="option"
                        aria-selected={selected}
                        disabled={item.disabled}
                        className={`${base} ${interactive} ${selectedClasses} ${palette.ring}`}
                        onClick={() => selectByIndex(idx)} // centralizes selection + per-item click
                    >
                        {/* Label only, but you can add icons/badges here */}
                        {item.label}
                    </button>
                );
            })}
        </div>
    );
};
